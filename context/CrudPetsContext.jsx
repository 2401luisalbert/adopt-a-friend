import { createContext, useContext, useState, useEffect } from "react";
import { MyToast } from "../utils/Toast";
import { firestore, storage } from "../database/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { petValidate } from "../utils/validations";
import { useAuth } from "./AuthContext";
import * as ImageManipulator from 'expo-image-manipulator';

import uuid from 'react-native-uuid';

export const CrudPetsContext = createContext();

export const useCrudPets = () => {
  const context = useContext(CrudPetsContext);
  if (!context) {
    throw new Error("No se está usando CrudPetsProvider");
  }
  return context;
};

export const CrudPetsProvider = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [userPets, setUserPets] = useState([]); // Nuevo estado para almacenar los pets del usuario
  const [contextErrors, setContextErrors] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    if (user != null) {
      fetchUserPets(); // Llamamos a la función para obtener los pets del usuario
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContextErrors([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [contextErrors]);

  const handleError = (error) => {
    if (Array.isArray(error)) {
      setContextErrors(error);
    } else if (error && typeof error === "object") {
      setContextErrors(error);
    } else {
      // En caso contrario, mostramos un mensaje genérico de error de servidor
      setContextErrors(["Ocurrió un error en el servidor"]);
    }

    setLoad(false);
  };

  const uploadImage = async (imageFile, folderName) => {
    try {

      const imageExtension = imageFile.uri.split(".").pop(); // Extraer la extensión de la URI
      const imageName = uuid.v4() + "." + imageExtension; // Concatenar el punto antes de la extensión
  
      // Redimensionar la imagen antes de subirla
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageFile.uri,
        [{ resize: { width: 800, height: 600 } }],
        { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
      );

      const storageRef = ref(storage, `pets/${folderName}/${imageName}`);
      await uploadBytes(storageRef, resizedImage.uri, { contentType: `image/jpeg` });
      
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };
  
  
  const fetchUserPets = async () => {
    setLoad(true);
    try {
      const q = query(
        collection(firestore, "pets"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const userPetsData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setUserPets(userPetsData); // Guardamos los pets del usuario en el estado
    } catch (error) {
      MyToast({
        typeToast: "error",
        message: "Intente mas tarde.",
      });
      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  const getPetImages = async (petId) => {
    try {
      const q = query(collection(firestore, "images"), where("petId", "==", petId));
      const querySnapshot = await getDocs(q);

      const petImages = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return petImages;
    } catch (error) {
      console.error("Error fetching pet images:", error);
      return [];
    }
  };

  const createImageDocument = async (petId, imageUrl) => {
    try {
      const imageRef = collection(firestore, "images");
      const imageId = await addDoc(imageRef, {
        petId,
        url: imageUrl,
      });
      return imageId.id;
    } catch (error) {
      console.error("Error al crear el documento de imagen:", error);
      throw error;
    }
  };

  const getPetCollectionRef = () => {
    return collection(firestore, "pets");
  };

  const createPet = async (petData, userId, selectedImages) => {
    console.log("selectedImages", selectedImages)
    setLoad(true);
    try {
      const resultValidate = petValidate(petData, selectedImages);

      if (Object.keys(resultValidate).length > 0) {
        setContextErrors(resultValidate);
        return { success: false, error: resultValidate };
      }

      petData.userId = userId;

      const petsCollectionRef = getPetCollectionRef();
      const newPetDocRef = await addDoc(petsCollectionRef, petData);

      const folderName = newPetDocRef.id;

      const uploadPromises = selectedImages.map(async (imageFile) => {
        const imageUrl = await uploadImage(imageFile, folderName);
        return imageUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);

      const imageIds = await Promise.all(
        imageUrls.map(async (url) => {
          const imageId = await createImageDocument(newPetDocRef.id, url);
          return imageId;
        })
      );
   
      await updateDoc(newPetDocRef, {
        images: imageIds,
        createdAt: serverTimestamp(),
      });

      MyToast({
        typeToast: "success",
        message: "Mascota registrada exitosamente.",
      });

      return {
        success: true,
      };
    } catch (error) {
      handleError(error);
      MyToast({
        typeToast: "error",
        message: "Error al registrar la mascota.",
      });

      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  const updatePet = async (petData) => {
    try {
      setLoad(true);
      const { id, ...updatedData } = petData;

      updatedData.updatedAt = serverTimestamp();

      const petRef = doc(firestore, "pets", id);
      await updateDoc(petRef, updatedData);

      MyToast({
        typeToast: "success",
        message: "Mascota actualizada exitosamente.",
      });

      setUserPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === id ? { ...pet, ...updatedData } : pet
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      MyToast({
        typeToast: "error",
        message: "Error al actualizar la mascota.",
      });

      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  const deletePet = async (petId) => {
    try {
      setLoad(true);
      const petRef = doc(firestore, "pets", petId);
      await deleteDoc(petRef);

      MyToast({
        typeToast: "success",
        message: "Mascota eliminada exitosamente.",
      });

      return {
        success: true,
      };
    } catch (error) {
      MyToast({
        typeToast: "error",
        message: "Error al eliminar la mascota.",
      });
      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  return (
    <CrudPetsContext.Provider
      value={{
        createPet,
        load,
        fetchUserPets,
        userPets,
        updatePet,
        deletePet,
        contextErrors,
        getPetImages,
      }}
    >
      {children}
    </CrudPetsContext.Provider>
  );
};

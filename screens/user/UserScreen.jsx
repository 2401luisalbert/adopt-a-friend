import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Icon } from "@rneui/themed";
import { useCrudPets } from "../../context/CrudPetsContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import PetListComponent from "../../components/user/PetListComponent";
import PetConfirmationModal from "./../../components/user/ConfirmationModalComponent";
import PetModalComponent from "./../../components/user/PetModalComponents";
import { MyToast } from "../../utils/Toast";
import { useForm } from "react-hook-form";

const UserScreen = () => {
  const { logOut, user } = useAuth();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petToDelete, setPetToDelete] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(
    false
    );
    const {
    createPet,
    load,
    userPets,
    fetchUserPets,
    updatePet,
    deletePet,
    contextErrors,
    getPetImages,
  } = useCrudPets();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: selectedPet ? selectedPet : {},
  });

  const setFormDefaultValues = (pet) => {
    setValue("name", pet.name || "");
    setValue("breed", pet.breed || "");
    setValue("age", pet.age.toString());
    setValue("size", pet.size || "");
    setValue("color", pet.color || "");
    setValue("adoptionStatus", pet.adoptionStatus || "");
    setValue("description", pet.description || "");
  };

  useEffect(() => {
    if (selectedPet) {
      setFormDefaultValues(selectedPet);
    }
  }, [selectedPet]);
  
  const fetchPetImages = async (petId) => {
    try {
      const images = await getPetImages(petId);
      return images;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleEditButtonPress = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };
  
  const handleAddPet = async (data, user) => {
    const trimmedData = Object.keys(data).reduce((acc, key) => {
      acc[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
      return acc;
    }, {});
    
    try {
      const responseResult = await createPet(trimmedData, user, selectedImages);
      if (!responseResult.success) {
        MyToast({
          typeToast: "error",
          message: responseResult.message,
        });
        return;
      }
      MyToast({
        typeToast: "success",
        message: "Mascota agregada correctamente",
      });
      setSelectedImages([]);
      reset();
      setModalVisible(false);
      fetchUserPets();
    } catch (error) {
      MyToast({
        typeToast: "error",
        message: "Intente mas tarde.",
      });
    }
  };

  const handleUpdatePet = async (data) => {
    const updatedPet = { ...selectedPet, ...data }; // Combinar los datos del formulario con los datos actuales de la mascota

    try {
      const responseResult = await updatePet(updatedPet); // Llamar a la función updatePet del contexto para actualizar la mascota en el servidor
      if (responseResult.success) {
        MyToast({
          typeToast: "success",
          message: "Mascota actualizada exitosamente",
        });
        setModalVisible(false);
        setSelectedPet(null);
        fetchUserPets();
      } else {
        MyToast({
          typeToast: "error",
          message: "Error al actualizar la mascota",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteButtonPress = (pet) => {
    setPetToDelete(pet);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const responseResult = await deletePet(petToDelete.id);
      if (responseResult.success) {
        MyToast({
          typeToast: "success",
          message: "Mascota eliminada exitosamente",
        });
        fetchUserPets(); // Actualizamos la lista de mascotas del usuario
      } else {
        MyToast({
          typeToast: "error",
          message: "Error al eliminar la mascota.",
        });
      }
    } catch (error) {
      MyToast({
        typeToast: "error",
        message: "Intente mas tarde.",
      });
    } finally {
      setDeleteConfirmationVisible(false);
      setPetToDelete(null);
    }
  };

  const handleLogOut = async () => {
    logOut();
    navigation.navigate("DrawerNavigate");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tablero de Adopción</Text>
        <TouchableOpacity onPress={handleLogOut}>
          <View style={styles.iconExit}>
            <Icon type="material" name="logout" color="#00aced" />
            <Text variant="titleMedium">Salir</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Agregar Mascota</Text>
      </TouchableOpacity>
      {userPets.length > 0 ? (
        <PetListComponent
          pets={userPets}
          fetchPetImages={fetchPetImages}
          onPressEdit={handleEditButtonPress}
          onPressDelete={handleDeleteButtonPress}
        />
      ) : (
        <Text style={styles.emptyText}>
          No hay mascotas disponibles para adoptar
        </Text>
      )}
      <PetConfirmationModal
        load={load}
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        onConfirm={handleConfirmDelete}
      />
      <PetModalComponent
        visible={modalVisible}
        selectedPet={selectedPet}
        load={load}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        reset={reset}
        contextErrors={contextErrors}
        setSelectedImages={setSelectedImages}
        selectedImages={selectedImages}
        onCancel={() => {
          setModalVisible(false);
          setSelectedPet(null);
          setSelectedImages([]);
        }}
        onSubmit={async (data) => {
          if (selectedPet) {
            handleUpdatePet(data);
          } else {
            await handleAddPet(data, user.uid);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  iconExit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    color: "#1e90ff",
  },
});

export default UserScreen;

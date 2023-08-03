import { createContext, useContext, useEffect, useState } from "react";
import { MyToast } from "../utils/Toast";
import { auth, firestore } from "../database/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  registerValidate,
  loginValidate,
} from "../utils/validations";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No se está usando AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(false);
  const [contextErrors, setContextErrors] = useState([]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContextErrors([]);
    }, 10000);

    return () => clearTimeout(timer);
  }, [contextErrors]);

  const handleError = (error) => {

    if (Array.isArray(error)) {
      setContextErrors(error);
    } else if (error && typeof error === "object") {
      
      let errorMessage = "Ocurrió un error en el servidor";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = {"email": "El correo electrónico ya está en uso. Intente con otro."};
      } else if (error.code === "auth/invalid-email") {
        errorMessage = {"email":"El correo electrónico no es válido"};
      } else if (error.code === "auth/user-not-found") {
        errorMessage = {"email":"Usuario no encontrado, verifique el correo electrónico"};
      } else if (error.code === "auth/wrong-password") {
        errorMessage = {"password":"Contraseña incorrecta, vuelva a intentarlo"};
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
        {"error":"Demasiados intentos fallidos. Por favor, intente nuevamente más tarde"};
      }
      
      console.log("errorMessage", errorMessage)
      setContextErrors(errorMessage);
    } else {
      // En caso contrario, mostramos un mensaje genérico de error de servidor
      setContextErrors(["Ocurrió un error en el servidor"]);
    }

    setLoad(false);
  };

  const signUp = async (user) => {
    setLoad(true);
    const { name, firstName, lastName, email, password } = user;
    try {
      const resultValidate = registerValidate(user);

      if (Object.keys(resultValidate).length > 0) {
        setContextErrors(resultValidate);
        return { success: false, error: resultValidate };
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      const userRef = doc(firestore, `users/${uid}`);

      await updateProfile(userCredential.user, {
        displayName: name + firstName,
      });

      await setDoc(userRef, {
        name,
        firstName,
        lastName,
        email,
      });

      return { success: true };
    } catch (error) {
      handleError(error);
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoad(false);
    }
  };

  const signIn = async (user) => {
    const { email, password } = user;
    try {
      setLoad(true);

      const resultValidate = loginValidate(user);

      if (Object.keys(resultValidate).length > 0) {
        setContextErrors(resultValidate);
        return { success: false, error: resultValidate };
      }

      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };

    } catch (error) {
      handleError(error);
      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  const logOut = async () => {
    try {
      setLoad(true);
      await signOut(auth);
      MyToast({
        typeToast: "success",
        message: "Sesión cerrada con éxito",
      });
    } catch (error) {
      handleError(error);
      return {
        success: false,
        error,
      };
    } finally {
      setLoad(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logOut,
        load,
        user,
        contextErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

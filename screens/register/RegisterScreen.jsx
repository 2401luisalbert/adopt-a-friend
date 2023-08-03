import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import { MyToast } from "../../utils/Toast";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import RegisterComponent from "../../components/register/RegisterComponent";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { signUp, load, contextErrors } = useAuth();

  const handleLoginPress = () => {
    navigation.navigate("DrawerNavigate");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {

    const trimmedData = Object.keys(data).reduce((acc, key) => {
      acc[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
      return acc;
    }, {});

    try {
      const signUpResult = await signUp(trimmedData);
      if (!signUpResult.success) {
        MyToast({
          typeToast: "error",
          message: signUpResult.message,
        });
        return;
      }
      MyToast({
        typeToast: "success",
        message: "Usuario registrado exitosamente",
      });
      navigation.navigate("UserScreen");
      reset();
    } catch (error) {
      return;
    }
  };

  return (
    <ScrollView>
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/img/logo-register.png")}
          resizeMode="contain"
        />
        <Text style={[styles.textTitle, styles.fontPacifico]}>Crea una cuenta</Text>
        <RegisterComponent
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          load={load}
          handleLoginPress={handleLoginPress}
          reset={reset}
          contextErrors={contextErrors} // Pasamos los errores del contexto al componente
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },
  textTitle: {
    fontSize: 28,
    color: "#1e90ff",
  },
  fontPacifico: {
    fontFamily: "Pacifico-Regular",
  },
});

export default RegisterScreen;

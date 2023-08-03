import React from "react";
import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import LoginComponent from "../../components/login/LoginComponent";
import { MyToast } from "../../utils/Toast";
import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  // const { signIn, load, contextErrors } = useAuth();
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const contextErrors = {"error":null}



  const handleRegisterPress = () => {
    navigation.navigate("Register");
    reset();
  };

  const onSubmit = async (data) => {
      console.log("data", data)
      // try {
      //   const signInResult = await signIn(data);
      //   if (!signInResult.success) {
      //     MyToast({
      //       typeToast: "error",
      //       message: signInResult.message,
      //     });
      //     return;
      //   }
      //   MyToast({
      //     typeToast: "success",
      //     message: "Login exitoso",
      //   });
      //   navigation.navigate("UserScreen");
      //   reset();
      // } catch (error) {
      //   return;
      // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/img/login.png")}
        resizeMode="contain"
      />
      <Text style={[styles.textTitle, styles.fontPacifico]}>Iniciar sesión</Text>
      <View style={styles.loginContainer}>
        <LoginComponent
          control={control}
          errors={errors}
          onLogin={handleSubmit(onSubmit)}
          onRegisterPress={handleRegisterPress}
          // load={load}
          contextErrors={contextErrors}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  logo: {
    width: "70%",
    height: 200,
  },
  textTitle: {
    fontSize: 28,
    color: "#1e90ff",
    marginBottom: 10,
  },
  fontPacifico: {
    fontFamily: "Pacifico-Regular",
  },
  loginContainer: {
    width: "80%",
    marginBottom: 20,
  },
});

export default LoginScreen;

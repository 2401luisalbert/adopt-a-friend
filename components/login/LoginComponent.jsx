import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { Controller } from "react-hook-form";
import Loader from "../Loader";
import CustomButton from "../CustomButton";

const LoginComponent = ({
  control,
  errors,
  onLogin,
  onRegisterPress,
  load,
  contextErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={styles.container}>
      {contextErrors.error && (
        <Text style={styles.errorTextTry}>{contextErrors.error}</Text>
      )}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.inputText}
              mode="outlined"
              label="Correo"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.email}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              right={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
            />
            {contextErrors.email && (
              <Text style={styles.errorText}>{contextErrors.email}</Text>
            )}
            {errors.email && (
              <Text style={styles.errorText}>Ingresa tu correo</Text>
            )}
          </View>
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.inputText}
              mode="outlined"
              label="Contraseña"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.password}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={handleTogglePasswordVisibility}
                />
              }
            />
            {contextErrors.password && (
              <Text style={styles.errorText}>{contextErrors.password}</Text>
            )}
            {errors.password && (
              <Text style={styles.errorText}>Ingresa tu contraseña</Text>
            )}
          </View>
        )}
        name="password"
        defaultValue=""
      />

      {load ? (
        <Loader />
      ) : (
        <>
          <CustomButton
            buttonStyles={styles.btn}
            label="Ingresar"
            onPress={onLogin}
          />
          <TouchableOpacity style={styles.touchable} onPress={onRegisterPress}>
            <Text style={styles.touchableText}>Crear una cuenta</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputText: {
    width: 300,
    marginVertical: 5,
  },
  btn: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    marginLeft: 15,
  },
  errorTextTry: { color: "red", marginBottom: 8, },
  touchable: {
    marginTop: 20,
  },
  touchableText: {
    fontSize: 18,
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
});

export default LoginComponent;

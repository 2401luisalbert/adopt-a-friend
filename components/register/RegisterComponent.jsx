import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller } from "react-hook-form";
import Loader from "../Loader";
import CustomButton from "../CustomButton";

const RegisterComponent = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  load,
  handleLoginPress,
  contextErrors,
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  return (
    <>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.inputText}
              mode="outlined"
              label="Nombre"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.name}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              right={<TextInput.Icon icon="account" />}
            />
            {contextErrors.name && (
              <Text style={styles.errorText}>{contextErrors.name}</Text>
            )}
            {errors.name && (
              <Text style={styles.errorText}>Ingresa tu nombre</Text>
            )}
          </View>
        )}
        name="name"
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
              label="Apellido Paterno"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.firstName}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              right={<TextInput.Icon icon="account" />}
            />
            {contextErrors.firstName && (
              <Text style={styles.errorText}>{contextErrors.firstName}</Text>
            )}
            {errors.firstName && (
              <Text style={styles.errorText}>Ingresa tu apellido paterno</Text>
            )}
          </View>
        )}
        name="firstName"
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
              label="Apellido Materno"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.lastName}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              right={<TextInput.Icon icon="account" />}
            />
            {contextErrors.lastName && (
              <Text style={styles.errorText}>{contextErrors.lastName}</Text>
            )}
            {errors.lastName && (
              <Text style={styles.errorText}>Ingresa tu apellido materno</Text>
            )}
          </View>
        )}
        name="lastName"
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

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <View>
            <TextInput
              style={styles.inputText}
              mode="outlined"
              label="Repetir contraseña"
              value={field.value}
              onChangeText={field.onChange}
              error={errors.repeatPassword}
              theme={{
                colors: {
                  primary: "#1e90ff",
                },
                roundness: 30,
              }}
              secureTextEntry={!showRepeatPassword}
              right={
                <TextInput.Icon
                  icon={showRepeatPassword ? "eye" : "eye-off"}
                  onPress={handleToggleRepeatPasswordVisibility}
                />
              }
            />
            {contextErrors.repeatPassword && (
              <Text style={styles.errorText}>{contextErrors.repeatPassword}</Text>
            )}
            {errors.repeatPassword && (
              <Text style={styles.errorText}>
                Ingresa la contraseña nuevamente
              </Text>
            )}
          </View>
        )}
        name="repeatPassword"
        defaultValue=""
      />
      {load ? (
        <Loader />
      ) : (
        <>
          <CustomButton
            buttonStyles={[styles.btn, { backgroundColor: "#9370db" }]}
            label={"Registrar"}
            onPress={handleSubmit(onSubmit)}
          />
          <TouchableOpacity style={styles.touchable} onPress={handleLoginPress}>
            <Text style={styles.touchableText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    width: 300,
    marginVertical: 5,
  },
  btn: {
    marginTop: 20,
  },
  errorText: {
    width:270,
    color: "red",
    marginBottom: 8,
    marginLeft: 20,
  },
  touchable: {
    marginTop: 20,
  },
  touchableText: {
    fontSize: 18,
    color: "#1e90ff",
    textDecorationLine: "underline",
    paddingBottom: 20,
  },
});

export default RegisterComponent;

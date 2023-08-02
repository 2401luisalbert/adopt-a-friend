import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import TermsAndConditionsSheet from "../components/init/TermsAndConditionsSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitScreen = () => {
  const [isTermsVisible, setTermsVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleOpenTerms = () => {
    setTermsVisible(true);
  };

  const handleCloseTerms = () => {
    setTermsVisible(false);
  };

  const description =
    "Adopt-A-Friend es una aplicación diseñada para simplificar el proceso de adopción de mascotas, conectar a los usuarios con mascotas necesitadas de hogar y proporcionar recursos valiosos para el cuidado y bienestar de las mascotas adoptadas.";

  const handleAccept = async () => {
    if (!checked) {
      setError("Debes aceptar los términos y condiciones.");
      setShowError(true);
      return;
    }

    try {
      await AsyncStorage.setItem('acceptedTerms', 'true');
      // navigation.navigate("DrawerNavigate");
      setChecked(true);
    } catch (error) {
      setError("Ha ocurrido un error al guardar los términos y condiciones. Por favor, inténtalo de nuevo.");
      setShowError(true);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Image
        source={require("../assets/img/presentation.png")}
        resizeMode="contain"
        style={styles.imagePet}
      />
      <Text style={[styles.textTitle, { fontFamily: "Pacifico-Regular" }]}>
        Adopt-A-Friend
      </Text>
      <Text style={styles.textDescription}>{description}</Text>
      <View style={styles.checkContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          color="#1e90ff"
        />
        <TouchableOpacity onPress={handleOpenTerms}>
          <Text style={styles.termsText}>Abrir Términos y Condiciones</Text>
        </TouchableOpacity>
      </View>
      {showError ? <Text style={styles.error}>{error}</Text> : null}

      <CustomButton
        label="Ingresar"
        onPress={handleAccept}
        buttonStyle={styles.button}
      />

      {/* Render the TermsAndConditionsSheet */}
      {isTermsVisible && (
        <TermsAndConditionsSheet isVisible={isTermsVisible} onClose={handleCloseTerms} />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  textTitle: {
    fontSize: 35,
    color: "#daa520",
    marginVertical: 20,
    textAlign: "center",
  },
  imagePet: {
    width: "100%",
    height: 300,
  },
  textDescription: {
    textAlign: "center",
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  termsText: {
    textDecorationLine: "underline",
    color: "#1e90ff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
  },
  error: {
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});

export default InitScreen;

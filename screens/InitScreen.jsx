import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import TermsAndConditionsSheet from "../components/init/TermsAndConditionsSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const InitScreen = ({setCheckedBtn}) => {
  const [isTermsVisible, setTermsVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation()

  const handleOpenTerms = () => {
    setTermsVisible(true);
  };

  const handleCloseTerms = () => {
    setTermsVisible(false);
  };

  const description =
    "Adopt-A-Friend es una aplicación diseñada para simplificar el proceso de adopción de mascotas, conectar a los usuarios con mascotas necesitadas de hogar y proporcionar recursos valiosos para el cuidado y bienestar de las mascotas adoptadas.";

    const handleAccept = () => {
      if (!checked) {
        setError("Debes aceptar los términos y condiciones.");
        return;
      }
  
      navigation.navigate("DrawerNavigate");
      setCheckedBtn(true);
    };
  

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <View style={styles.container}>
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
      {setError ? <Text style={styles.error}>{error}</Text> : null}

      <CustomButton
        label="Ingresar"
        onPress={handleAccept}
        buttonStyle={styles.button}
      />

      {/* Render the TermsAndConditionsSheet */}
      {isTermsVisible && (
        <TermsAndConditionsSheet isVisible={isTermsVisible} onClose={handleCloseTerms} />
      )}
    </View>
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
    marginBottom:10
  },
});

export default InitScreen;

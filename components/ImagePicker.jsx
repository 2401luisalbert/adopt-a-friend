import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed"; // Importa el componente Icon de react-native-elements
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({selectedImages,setSelectedImages}) => {


  const pickImageAsync = async () => {
    // Solicitar permisos para acceder a la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requiere permiso para acceder a la galería de medios.");
      return;
    }

    const maxImages = 5 - selectedImages.length;
    if (maxImages <= 0) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Permite seleccionar solo imágenes
      allowsMultipleSelection: true, // Permite seleccionar múltiples archivos
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAssets = result.assets.slice(0, maxImages);
      setSelectedImages((prevImages) => [...prevImages, ...selectedAssets]);
    } else {
      alert("No has seleccionado ninguna imagen.");
    }
  };

  const handleImagePress = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={pickImageAsync} // Asigna la función pickImageAsync al evento onPress del TouchableOpacity
          disabled={selectedImages.length >= 5}
        >
          <Icon
            name="camera"
            type="font-awesome"
            size={30}
            color="#1e90ff"
          />
          <Text style={styles.text}>
            {selectedImages.length >= 5
              ? "Máximo 5 imágenes"
              : "Seleccionar Imágenes"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageGrid}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
          >
            <Image source={{ uri: image.uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.deleteIconContainer}
              onPress={() => handleImagePress(index)}
            >
              <Icon name="delete" size={15} color="#ffffff" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width:"100%",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1e90ff",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "grey",
    borderRadius: 50,
    padding: 5,
  },
});

export default ImagePickerComponent;

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon } from "@rneui/themed";

const PetListComponent = ({ pets, onPressEdit, onPressDelete, fetchPetImages }) => {
  const [petImages, setPetImages] = useState({});

  useEffect(() => {
    const fetchImagesForPets = async () => {
      const imagesByPet = {};
      for (const pet of pets) {
        const images = await fetchPetImages(pet.id);
        imagesByPet[pet.id] = images;
      }
      setPetImages(imagesByPet);
    };

    fetchImagesForPets();
  }, [pets, fetchPetImages]);

  const getFirstImageURL = (petId) => {
    const images = petImages[petId] || [];
    const firstImage = images[0] || null;
    return firstImage ? firstImage.url : null;
  };

  const renderItem = ({ item }) => {
    const firstImage = getFirstImageURL(item.id);
    return (
      <View style={styles.petItem}>
        {firstImage && (
          <Image
            source={{ uri: firstImage }} // Pasar directamente firstImage como fuente de la imagen
            style={styles.petImage}
          />
        )}
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petDetail}>Raza: {item.breed}</Text>
          <Text style={styles.petDetail}>Edad: {item.age} años</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={() => onPressEdit(item)}>
          <Icon name="pencil" type="font-awesome" color="#1e90ff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => onPressDelete(item)}>
          <Icon name="trash" type="font-awesome" color="#ff4500" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.petListContainer}>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  petListContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 16,
  },
  petItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  petDetail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  iconContainer: {
    marginLeft: 16,
  },
});

export default PetListComponent;

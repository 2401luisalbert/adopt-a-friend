import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Icon } from "@rneui/themed";

const PetItemComponent = ({ item, onPressInterested, onPressEdit, onPressDelete }) => {
  return (
    <TouchableOpacity
      style={[styles.petItemContainer, { backgroundColor }]}
      onPress={() => onPressInterested(item)}
    >
      <View style={styles.petItem}>
        {/* Pequeña imagen de la mascota */}
        <Image
          source={{ uri: item.image }} // Utiliza la URL de la imagen de la mascota
          style={styles.petImage}
        />

        <View style={styles.petInfoContainer}>
          <Text style={[styles.petName, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.petInfo, { color: textColor }]}>
            Raza: {item.breed}
          </Text>
          <Text style={[styles.petInfo, { color: textColor }]}>
            Edad: {item.age} años
          </Text>
        </View>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onPressEdit(item)}
        >
          <Icon name="edit" type="font-awesome" color={textColor} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => onPressDelete(item)}
        >
          <Icon name="trash" type="font-awesome" color={textColor} size={30} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  petItemContainer: {
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
  },
  petItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  petInfoContainer: {
    flex: 1,
    marginRight: 16,
    padding: 16,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },
  petInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333333",
  },
  iconContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default PetItemComponent;

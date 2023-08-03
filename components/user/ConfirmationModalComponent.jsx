import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Loader from "../Loader";

const PetConfirmationModal = ({ visible, onCancel, onConfirm, load }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirmación</Text>
          <Text style={styles.modalText}>
            ¿Estás seguro de eliminar esta mascota?
          </Text>
          {load ? (
            <Loader />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#1e90ff",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
    color: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#ff4500",
    borderRadius: 8,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PetConfirmationModal;

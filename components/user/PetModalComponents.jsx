import React from "react";
import { View, Text, StyleSheet, Modal, ScrollView } from "react-native";
import { Controller } from "react-hook-form";
import {
  TextInput as PaperTextInput,
  HelperText,
  DefaultTheme,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Loader from "./../Loader";
import ImagePicker from "../ImagePicker";
import CustomButton from "../CustomButton";

const PetModalComponent = ({
  visible,
  selectedPet,
  onCancel,
  onSubmit,
  handleSubmit,
  control,
  errors,
  load,
  reset,
  contextErrors,
  setSelectedImages,
  selectedImages
}) => {

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>
              {selectedPet ? "Editar Mascota" : "Agregar Mascota"}
            </Text>

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <View style={styles.inputContainer}>
                  <PaperTextInput
                    style={styles.inputText}
                    mode="outlined"
                    label="Nombre"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.name}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 30,
                    }}
                    right={<PaperTextInput.Icon icon="dog" />}
                  />
                  {contextErrors.name && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.name}</HelperText>
                  )}
                  {errors.name && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa el nombre de la mascota
                    </HelperText>
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
                  <PaperTextInput
                    style={styles.inputText}
                    mode="outlined"
                    label="Raza"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.breed}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 30,
                    }}
                    right={<PaperTextInput.Icon icon="paw" />}
                  />
                  {contextErrors.breed && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.breed}</HelperText>
                  )}
                  {errors.breed && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa la raza de la mascota
                    </HelperText>
                  )}
                </View>
              )}
              name="breed"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <View>
                  <PaperTextInput
                    style={styles.inputText}
                    mode="outlined"
                    label="Edad"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.age}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 30,
                    }}
                    keyboardType="numeric"
                    right={<PaperTextInput.Icon icon="calendar" />}
                  />
                  {contextErrors.age && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.age}</HelperText>
                  )}
                  {errors.age && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa la edad de la mascota
                    </HelperText>
                  )}
                </View>
              )}
              name="age"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <View>
                  <PaperTextInput
                    style={styles.inputText}
                    mode="outlined"
                    label="Tamaño"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.size}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 30,
                    }}
                    right={<PaperTextInput.Icon icon="ruler" />}
                  />
                  {contextErrors.size && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.size}</HelperText>
                  )}
                  {errors.size && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa el tamaño de la mascota
                    </HelperText>
                  )}
                </View>
              )}
              name="size"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <View >
                  <PaperTextInput
                    style={styles.inputText}
                    mode="outlined"
                    label="Color"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.color}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 30,
                    }}
                    right={<PaperTextInput.Icon icon="palette" />}
                  />
                  {contextErrors.color && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.color}</HelperText>
                  )}
                  {errors.color && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa el color de la mascota
                    </HelperText>
                  )}
                </View>
              )}
              name="color"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <View
                  style={[
                    styles.pickerContainer,
                    errors.adoptionStatus && styles.errorContainer, // Aplicar el estilo de error cuando hay un error de validación
                  ]}
                >
                  <Picker
                    selectedValue={field.value}
                    onValueChange={(itemValue) => field.onChange(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Seleccione el estatus" value="" />
                    <Picker.Item label="Disponible" value="Disponible" />
                    <Picker.Item
                      label="En proceso de adopción"
                      value="En proceso de adopción"
                    />
                    <Picker.Item label="Adoptado" value="Adoptado" />
                  </Picker>
                </View>
              )}
              name="adoptionStatus"
              defaultValue=""
            />
            {errors.adoptionStatus && (
              <HelperText type="error" style={styles.helperText}>
                Selecciona un estatus de adopción
              </HelperText>
            )}


            <Controller
              control={control}
              rules={{ required: true, maxLength: 255, minLength: 25 }}
              render={({ field }) => (
                <View>
                  <PaperTextInput
                    style={[styles.inputText, styles.textarea]}
                    mode="outlined"
                    label="Descripción"
                    value={field.value}
                    onChangeText={field.onChange}
                    multiline
                    error={errors.description}
                    theme={{
                      ...DefaultTheme,
                      colors: {
                        ...DefaultTheme.colors,
                        primary: "#1e90ff",
                      },
                      roundness: 20,
                    }}
                  />
                  {errors.description && (
                    <HelperText type="error" style={styles.helperText}>
                      Ingresa una descripción válida (mínimo 25 caracteres,
                      máximo 255 caracteres)
                    </HelperText>
                  )}
                </View>
              )}
              name="description"
              defaultValue=""
            />

            <ImagePicker setSelectedImages={setSelectedImages} selectedImages={selectedImages} />
            {contextErrors.image && (
                    <HelperText type="error" style={styles.helperText}>{contextErrors.image}</HelperText>
                  )}

            <View>
              {load ? (
                <Loader />
              ) : (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    label={selectedPet ? "Actualizar" : "Agregar"}
                    onPress={() => handleSubmit(onSubmit)()}
                  />

                  <CustomButton
                    label="Cerrar"
                    color="red"
                    onPress={() => {
                      onCancel();
                      reset();
                    }}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 30,
    width: "80%",
    borderWidth: 1,
    borderColor: "#888888",
    zIndex: -1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#1e90ff",
  },

  inputText: {
    marginBottom: 12,
    width: 250,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
  },
  errorContainer: {
    borderColor: "#a30000",
    borderWidth: 2,
  },
  helperText: {
    marginTop: -15, // Ajusta este valor para controlar el espacio entre el PaperTextInput y el HelperText
  },
});

export default PetModalComponent;

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Modal, Button } from "react-native-paper";

const TermsAndConditionsSheet = ({ isVisible, onClose }) => {
  const termsAndConditionsContent = `
    Términos y Condiciones de Uso
    
    Bienvenido/a a nuestra aplicación de adopción de mascotas. Antes de utilizar nuestra aplicación, te pedimos que leas detenidamente los siguientes términos y condiciones de uso. Al acceder y utilizar nuestra aplicación, aceptas estar legalmente vinculado/a por estos términos y condiciones. Si no estás de acuerdo con alguno de los términos establecidos, por favor, abstente de utilizar nuestra aplicación.
    
    1. Uso de la Aplicación:
       a. Nuestra aplicación de adopción de mascotas tiene como objetivo facilitar el proceso de adopción de animales domésticos. Puedes navegar por los perfiles de las mascotas disponibles y comunicarte con los propietarios o responsables de adopción.
       b. Al utilizar nuestra aplicación, te comprometes a proporcionar información precisa y actualizada. No debes utilizar información falsa o engañosa.
    
    2. Responsabilidad del Usuario:
       a. Eres responsable de mantener la confidencialidad de tu información de inicio de sesión y no debes compartir tus credenciales de acceso con terceros.
       b. Al utilizar nuestra aplicación, te comprometes a tratar a los demás usuarios y propietarios de mascotas con respeto y cortesía. No se tolerarán mensajes ofensivos, discriminación, acoso o comportamiento inapropiado.
       c. Al comunicarte con los propietarios o responsables de adopción, entiendes que cualquier acuerdo o transacción realizada es responsabilidad exclusiva de las partes involucradas. No nos hacemos responsables de ningún acuerdo o conflicto surgido entre los usuarios.
    
    3. Derechos de Propiedad:
       a. Todos los derechos de propiedad intelectual relacionados con nuestra aplicación (incluyendo, pero no limitado a, el diseño, logotipos, textos y gráficos) son propiedad exclusiva nuestra. No se permite la reproducción, distribución o modificación de ninguno de estos elementos sin nuestro consentimiento previo por escrito.
    
    4. Privacidad:
       a. Respetamos tu privacidad y tratamos tus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar nuestra aplicación, aceptas nuestro uso de tus datos personales según lo establecido en dicha política.
    
    5. Limitación de Responsabilidad:
       a. Nuestra aplicación se proporciona "tal cual", sin garantías de ningún tipo. No nos hacemos responsables de cualquier daño o perjuicio derivado del uso de nuestra aplicación o de cualquier transacción realizada a través de la misma.
    
    6. Modificaciones:
       a. Nos reservamos el derecho de modificar o actualizar estos términos y condiciones en cualquier momento. Te recomendamos revisar periódicamente esta sección para estar al tanto de los cambios realizados.
    
    7. Ley Aplicable:
       a. Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes vigentes en [país] sin tener en cuenta sus disposiciones sobre conflictos de leyes.
    
    Si tienes alguna pregunta o duda acerca de nuestros términos y condiciones, no dudes en contactarnos a través de los canales de soporte proporcionados en la aplicación.
    
    Al utilizar nuestra aplicación, confirmas que has leído, comprendido y aceptado estos términos y condiciones en su totalidad.
    
    Fecha de entrada en vigor: 03/06/2023
    
    ¡Gracias por utilizar nuestra aplicación de adopción de mascotas!
    `;

  
    return (
        <Modal
          visible={isVisible}
          onDismiss={onClose}
          contentContainerStyle={styles.modalContent}
          style={styles.modal}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Términos y Condiciones</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.textContent}>{termsAndConditionsContent}</Text>
          </ScrollView>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Cerrar
          </Button>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      modal: {
        backgroundColor: "#fff", // Cambia el fondo transparente a blanco
      },
      modalContent: {
        marginVertical: 50,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
      },
      modalHeader: {
        alignItems: "center",
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1e90ff",
      },
      scrollView: {
        marginBottom: 10,
      },
      textContent: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "justify",
      },
      closeButton: {
        marginTop: 20,
        backgroundColor: "#1e90ff",
      },
    });
    
    export default TermsAndConditionsSheet;``
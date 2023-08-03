import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import DrawerNavigate from "./DrawerNavigate";
import InitScreen from "../../screens/InitScreen";

const Stack = createStackNavigator();

const StackNavigate = () => {
  const [checkedBtn, setCheckedBtn] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTitleAlign: "center",
        headerTintColor: "#1e90ff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Pantalla de presentación */}
      {!checkedBtn ? (
        <Stack.Screen name="InitScreen" options={{ headerShown: false }}>
          {(props) => <InitScreen {...props} setCheckedBtn={setCheckedBtn} />}
        </Stack.Screen>
      ) : null}

      {/* Pantalla del Drawer */}
      <Stack.Screen
        name="DrawerNavigate"
        component={DrawerNavigate}
        options={{ headerShown: false }}
      />

      {/* Pantalla de registro */}
      {/* <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registrarse" }}
      /> */}

      {/* Pantalla de detalles de mascota */}
      {/* <Stack.Screen
        name="DetailsPet"
        component={DetailsPetScreen}
        options={{ title: "Información de la mascota" }}
      /> */}

      {/* <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Perfil" }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigate;

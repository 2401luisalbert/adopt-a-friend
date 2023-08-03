import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../../screens/home/HomeScreen";
// import LoginScreen from './../../screens/login/LoginScreen';
import { Icon } from "@rneui/themed";

const Drawer = createDrawerNavigator();

const DrawerNavigate = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: "#1e90ff",
        inactiveTintColor: "#777777",
        headerStyle: styles.header,
        headerTintColor: "#1e90ff",
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          drawerLabel: "Inicio",
          drawerIcon: ({ color }) => (
            <Icon name="paw" type="font-awesome" size={40} color={color} />
          ),
        }}
      />
      {/* {!user && (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Iniciar sesión",
            drawerIcon: ({ color, size }) => (
              <Icon name="user" type="font-awesome" size={40} color={color} />
            ),
          }}
        />
      )} */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#dcdcdc",
    borderBottomWidth:1,
    paddingVertical:20
  },
  perfil: {
    marginTop:15,
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  drawer: {
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1e90ff",
  },
});

export default DrawerNavigate;

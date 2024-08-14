// Importa el manejador de gestos para React Native
import "react-native-gesture-handler";

// Importa los componentes necesarios de React y React Native
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
// Importa el componente GestureHandlerRootView de react-native-gesture-handler
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
// Importa los componentes de las pantallas de la aplicación
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PatientScreen from "./src/screens/PatientsScreen";
import AgendaScreen from "./src/screens/AgendaScreen";
import AddCita from "./src/screens/AddScreens/AddCita";
import AddPaciente from "./src/screens/AddScreens/AddPaciente";
import { AuthProvider } from "./src/context/AuthContext";

// Crea un componente DrawerNavigator que contiene las pantallas de la aplicación
const Stack = createStackNavigator();
// Crea un componente DrawerNavigator que contiene las pantallas de la aplicación
const Drawer = createDrawerNavigator();

// Crea un componente CustomDrawerContent que renderiza el contenido personalizado del Drawer
const CustomDrawerContent = (props) => (
  // Utiliza el componente DrawerContentScrollView para renderizar el contenido del Drawer
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

// Crea un componente DrawerNavigator que contiene las pantallas de la aplicación
const DrawerNavigator = ({ navigation }) => (
  // Utiliza el componente Drawer.Navigator para crear un Drawer con las pantallas de la aplicación
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      // Ajusta el ancho del cajón al 50% de la pantalla
      width: "50%",
    }}
  >
    {/* Define las pantallas del DrawerNavigator */}
    <Drawer.Screen
      name="Inicio"
      component={HomeScreen}
      options={{
        drawerIcon: () => <Icon name="home-outline" size={25} />,
        headerStyle: {
          backgroundColor: "#B8B6F2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Icon.Button
            name="log-out-outline"
            size={25}
            backgroundColor="#B8B6F2"
            onPress={() => navigation.navigate("Login")}
          />
        ),
      }}
    />
    {/* Pantalla que se muestra cuando se selecciona "Pacientes" en el cajón */}
    <Drawer.Screen
      name="Pacientes"
      component={PatientScreen}
      options={{
        drawerIcon: () => <Icon name="people-outline" size={25} />,
        headerStyle: {
          backgroundColor: "#B8B6F2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Icon.Button
            name="log-out-outline"
            size={25}
            backgroundColor="#B8B6F2"
            onPress={() => navigation.navigate("Login")}
          />
        ),
      }}
    />
    {/* Pantalla que se muestra cuando se selecciona "Agenda" en el cajón */}
    <Drawer.Screen
      name="Agenda"
      component={AgendaScreen}
      options={{
        drawerIcon: () => <Icon name="calendar-outline" size={25} />,
        headerStyle: {
          backgroundColor: "#B8B6F2",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Icon.Button
            name="log-out-outline"
            size={25}
            backgroundColor="#B8B6F2"
            onPress={() => navigation.navigate("Login")}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);

// Crea un componente App que contiene la navegación de la aplicación
const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddCita"
              component={AddCita}
              options={{
                headerStyle: {
                  backgroundColor: "#B8B6F2",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="AddPaciente"
              component={AddPaciente}
              options={{
                headerStyle: {
                  backgroundColor: "#B8B6F2",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;

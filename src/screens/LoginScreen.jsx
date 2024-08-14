import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert
} from "react-native";
import { AuthContext } from "../context/AuthContext";

// Importa las imágenes que se usarán en la pantalla de inicio de sesión
import logo from "../../assets/logo.png"; // Logo de la aplicación
import fond from "../../assets/fond.png"; // Imagen de fondo

// Componente de la pantalla de inicio de sesión
const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { login } = useContext (AuthContext); // Obtén la función de login del contexto

  const handleLogin = async () => {
    if (!usuario || !contrasena) {
      Alert.alert("Error", "Por favor ingresa el usuario y la contraseña.");
      return;
    }
  
    try {
      await login(usuario, contrasena); // Llama a la función de login del contexto
      navigation.replace("Home"); // Redirige al usuario a la pantalla de inicio
    } catch (error) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };
  
  return (
    <ImageBackground source={fond} style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Ingresa tus datos</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      {/* Botón para entrada directa */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Entrada directa</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Estilos para la pantalla de inicio de sesión
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imgContainer: {
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#D2CFF4",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D2CFF4",
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9D90E7",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen; // Exporta el componente de la pantalla de inicio de sesión

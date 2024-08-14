import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Componente Layout que envuelve a los hijos en un contenedor con estilo
const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Contenedor principal que utiliza estilos del objeto styles */}
      <View style={styles.content}>
        {/* Aquí se renderizan los elementos hijos que se pasan como props */}
        {children}
      </View>
    </View>
  );
};

// Define los estilos utilizados en el componente Layout
const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    backgroundColor: "#ffffff", // Establece el color de fondo del contenedor a blanco
    width: "100%", // Asegura que el contenedor tenga el ancho completo de la pantalla
  },
  content: {
    flex: 1, // Hace que el contenido ocupe todo el espacio disponible dentro del contenedor
    paddingVertical: 20, // Añade 20 unidades de espacio vertical (arriba y abajo)
    paddingHorizontal: 20, // Añade 20 unidades de espacio horizontal (izquierda y derecha)
    alignItems: "stretch", // Permite que los elementos hijos se estiren para ocupar todo el ancho disponible
  },
});

export default Layout; // Exporta el componente Layout para que pueda ser utilizado en otras partes de la aplicación

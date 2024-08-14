import React from "react";
import Layout from "../componets/Layout"; // Importa el componente de diseño general
import { Text, StyleSheet, TouchableOpacity } from "react-native"; // Importa los componentes de React Native
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import CitasTabla from "../componets/Tables/CitasTabla"; // Importa el componente para mostrar la tabla de citas

// Componente principal de la pantalla de inicio
const HomeScreen = () => {
  // Hook para obtener la función de navegación
  const navigation = useNavigation();

  return (
    <Layout>
      <Text style={styles.Titulo}>Citas Del Dia</Text>
      {/* Muestra la tabla de citas */}
      <CitasTabla />
      <TouchableOpacity
        style={styles.fab} // Estilo para el botón flotante
        onPress={() => {
          // Navega a la pantalla para agregar citas al presionar el botón
          navigation.navigate("AddCita");
        }}
      >
        {/* Icono del botón flotante */}
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

// Estilos para la pantalla de inicio
const styles = StyleSheet.create({
  Titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#B8B6F2",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: "white",
  },
});

export default HomeScreen; // Exporta el componente principal de la pantalla de inicio

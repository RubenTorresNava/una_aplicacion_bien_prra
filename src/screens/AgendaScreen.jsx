import React from "react";
import Layout from "../componets/Layout";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CalendarComponent from "../componets/CalendarioComponente";
const AgendaScreen = () => {
  // Hook para acceder a las funciones de navegación.

  const navigation = useNavigation();
  // Ejemplo de citas, reemplaza con datos reales o estado.
  const citas = [
    {
      id_cita: 1,
      paciente: "John Doe",
      fecha_cita: "2024-08-10",
      hora: "10:00 AM",
      estado: "Pendiente",
    },
    {
      id_cita: 2,
      paciente: "Jane Doe",
      fecha_cita: "2024-08-10",
      hora: "11:00 AM",
      estado: "Confirmada",
    },
    {
      id_cita: 3,
      paciente: "Alice Smith",
      fecha_cita: "2024-08-11",
      hora: "09:00 AM",
      estado: "Cancelada",
    },
  ];

  return (
    <Layout>
      {/* Encabezado de la pantalla */}
      <Text style={styles.Titulo}>Calendario de Citas</Text>

      {/* Componente del calendario que recibe las citas como prop */}
      <CalendarComponent citas={citas} />

      {/* Botón flotante para agregar una nueva cita */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // Navega a la pantalla "AddCita" al presionar el botón.
          navigation.navigate("AddCita");
        }}
      >
        {/* Icono del botón flotante */}
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

// Estilos para la pantalla
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

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
export default AgendaScreen;

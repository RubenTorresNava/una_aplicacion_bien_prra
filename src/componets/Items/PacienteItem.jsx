import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook para la navegación

// Componente para mostrar un ítem de paciente
const PacienteItem = ({ paciente }) => {
  // Hook para obtener el objeto de navegación
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("Edit patient", paciente.id_paciente);
        navigation.navigate("AddPaciente", {
          // Navegación a la pantalla de edición
          pacienteId: paciente.id_paciente,
        });
      }}
    >
      <View style={styles.textContainer}>
        {/* Etiqueta estática */}
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>
          {paciente.nombre} {paciente.apellido}
          {/* Nombre y apellido del paciente */}
        </Text>
        <Text style={styles.value}>{paciente.fecha_registro}</Text>
        {/* Fecha de ingreso */}
        <Text style={styles.value}>{paciente.telefono}</Text>
        {/* Teléfono del paciente */}
        <Text style={styles.valuePrice}>${paciente.tarifa}</Text>
        {/* Tarifa del paciente */}
      </View>
    </TouchableOpacity>
  );
};

// Estilos para el componente PacienteItem
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B8B6F2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontStyle: "italic",
    fontWeight: "400",
    color: "#333",
  },
  value: {
    fontWeight: "600",
    color: "#333",
  },
  valuePrice: {
    fontWeight: "600",
    color: "#333",
    fontSize: 20,
  },
});

// Exporta el componente PacienteItem
export default PacienteItem;

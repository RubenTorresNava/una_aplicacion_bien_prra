import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Componente para mostrar un ítem de cita
const CitaItem = ({ cita }) => {
  // Hook para obtener el objeto de navegación
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log("Edit appointment", cita.id_cita);
        navigation.navigate("AddCita", { citaId: cita.id_cita });
      }}
    >
      <View style={styles.textContainer}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.value}>{cita.nombre_paciente}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{cita.hora_cita}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{cita.estado}</Text>
      </View>
    </TouchableOpacity>
  );
};
// Estilos para el componente
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
});

export default CitaItem;

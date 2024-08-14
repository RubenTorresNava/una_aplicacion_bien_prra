import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios"; // Asegúrate de instalar axios si no lo has hecho
import { AuthContext } from "../../context/AuthContext";

// Componente para agregar o editar citas
const AddCita = ({ navigation, route }) => {
  // Estado para manejar la información de la cita
  const [cita, setCita] = useState({
    nombre_paciente: "",
    apellido_paciente: "",
    tarifa: "",
    nombre_psicologo: "",
    apellido_psicologo: "",
    fecha_cita: "",
    hora_cita: "",
    estado: "Confirmada",
  });
  
  // Estado para determinar si estamos en modo edición
  const [editing, setEditing] = useState(false);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (name, value) => {
    setCita({ ...cita, [name]: value });
  };

  // Función para obtener los datos de la cita
  const fetchCita = async (citaId) => {
    try {
      const response = await axios.get(`http://192.168.1.5/api/citas/${citaId}`);
      setCita(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al cargar los datos de la cita.");
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Verifica que el formulario sea válido
    if (!isFormValid()) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      // Lógica para guardar o actualizar la cita
      if (!editing) {
        // Aquí se llamaría a la función para guardar la cita (comentada por ahora)
        // await saveCita(cita);
      } else {
        // Aquí se llamaría a la función para actualizar la cita existente (comentada por ahora)
        // await updateCita(route.params.citaId, cita);
      }
      // Navega a la pantalla de citas después de guardar o actualizar
      navigation.navigate("Citas");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al guardar la cita.");
    }
  };

  // Verifica si el formulario es válido
  const isFormValid = () => {
    return (
      cita.nombre_paciente &&
      cita.tarifa &&
      cita.nombre_psicologo &&
      cita.fecha_cita &&
      cita.hora_cita
    );
  };

  // Efecto para cargar los datos de la cita si estamos en modo edición
  useEffect(() => {
    if (route.params && route.params.citaId) {
      setEditing(true);
      fetchCita(route.params.citaId);
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Título del formulario */}
      <Text style={styles.title}>{editing ? "Editar Cita" : "Nueva Cita"}</Text>

      {/* Nombre del paciente */}
      <Text style={styles.label}>Nombre del Paciente:</Text>
      <TextInput
        style={styles.input}
        value={cita.nombre_paciente}
        onChangeText={(value) => handleChange("nombre_paciente", value)}
      />

      {/* Apellido del paciente */}
      <Text style={styles.label}>Apellido del Paciente:</Text>
      <TextInput
        style={styles.input}
        value={cita.apellido_paciente}
        onChangeText={(value) => handleChange("apellido_paciente", value)}
      />

      {/* Tarifa */}
      <Text style={styles.label}>Tarifa:</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={cita.tarifa}
        onChangeText={(value) => handleChange("tarifa", value)}
      />

      {/* Nombre del psicólogo */}
      <Text style={styles.label}>Nombre del Psicólogo:</Text>
      <TextInput
        style={styles.input}
        value={cita.nombre_psicologo}
        onChangeText={(value) => handleChange("nombre_psicologo", value)}
      />

      {/* Apellido del psicólogo */}
      <Text style={styles.label}>Apellido del Psicólogo:</Text>
      <TextInput
        style={styles.input}
        value={cita.apellido_psicologo}
        onChangeText={(value) => handleChange("apellido_psicologo", value)}
      />

      {/* Fecha de la cita */}
      <Text style={styles.label}>Fecha de la Cita:</Text>
      <TextInput
        style={styles.input}
        value={cita.fecha_cita}
        onChangeText={(value) => handleChange("fecha_cita", value)}
        placeholder="dd/mm/yyyy"
      />

      {/* Hora de la cita */}
      <Text style={styles.label}>Hora de la Cita:</Text>
      <TextInput
        style={styles.input}
        value={cita.hora_cita}
        onChangeText={(value) => handleChange("hora_cita", value)}
        placeholder="hh:mm"
      />

      {/* Selección del estado de la cita */}
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        style={styles.input}
        value={cita.estado}
        onChangeText={(value) => handleChange("estado", value)}
      />

      {/* Botón para guardar o actualizar la cita */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={!isFormValid()}
      >
        <Text style={styles.submitButtonText}>
          {editing ? "Actualizar Cita" : "Guardar Cita"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos para el componente AddCita
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8F8FF",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#B8B6F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCita;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importa el componente Picker para selección de opciones
import DateTimePicker from "@react-native-community/datetimepicker"; // Importa el componente DateTimePicker para selección de fechas

// Componente para agregar o editar la información de un paciente
const AddPaciente = ({ navigation, route }) => {
  // Estado para manejar la información del paciente
  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: new Date(),
    correo_electronico: "",
    telefono: "",
    direccion: "",
    usuario: "",
    contraseña: "",
    tarifa: "",
    nombre_emergencia: "",
    contacto_emergencia: "",
    estado_civil: "Soltero/a",
    genero: "",
    ocupacion: "",
    fecha_ingreso: new Date(),
  });

  // Estado para determinar si estamos en modo edición
  const [editing, setEditing] = useState(false);

  // Estados para controlar la visibilidad de los selectores de fecha
  const [showDatePickerNacimiento, setShowDatePickerNacimiento] =
    useState(false);
  const [showDatePickerIngreso, setShowDatePickerIngreso] = useState(false);

  // Maneja los cambios en los campos del formulario
  const handleChange = (name, value) => {
    setPaciente({ ...paciente, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Error", "Por favor, rellene todos los campos obligatorios.");
      return;
    }

    try {
      if (!editing) {
        // Código para guardar un nuevo paciente
        // await savePaciente(paciente);
      } else {
        // Código para actualizar un paciente existente
        // await updatePaciente(route.params.pacienteId, paciente);
      }
      navigation.navigate("Pacientes"); // Navega a la pantalla de pacientes
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al guardar el paciente.");
    }
  };

  // Verifica si el formulario es válido
  const isFormValid = () => {
    return (
      paciente.nombre &&
      paciente.apellido &&
      paciente.correo_electronico &&
      paciente.telefono &&
      paciente.direccion &&
      paciente.tarifa &&
      paciente.nombre_emergencia &&
      paciente.contacto_emergencia
    );
  };

  // Efecto para cargar los datos del paciente si estamos en modo edición
  useEffect(() => {
    if (route.params && route.params.pacienteId) {
      setEditing(true);
      (async () => {
        // Código para obtener los datos del paciente
        // const paciente = await getPaciente(route.params.pacienteId);
        // setPaciente(paciente);
      })();
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>
        {editing ? "Editar Paciente" : "Nuevo Paciente"}
      </Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={paciente.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={paciente.apellido}
        onChangeText={(value) => handleChange("apellido", value)}
      />

      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePickerNacimiento(true)}
      >
        <Text style={styles.dateButtonText}>
          {paciente.fecha_nacimiento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePickerNacimiento && (
        <DateTimePicker
          value={paciente.fecha_nacimiento}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || paciente.fecha_nacimiento;
            setShowDatePickerNacimiento(false);
            handleChange("fecha_nacimiento", currentDate);
          }}
        />
      )}

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={paciente.correo_electronico}
        keyboardType="email-address"
        onChangeText={(value) => handleChange("correo_electronico", value)}
      />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={paciente.telefono}
        keyboardType="phone-pad"
        onChangeText={(value) => handleChange("telefono", value)}
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={paciente.direccion}
        onChangeText={(value) => handleChange("direccion", value)}
      />

      <Text style={styles.label}>Usuario:</Text>
      <TextInput
        style={styles.input}
        value={paciente.usuario}
        onChangeText={(value) => handleChange("usuario", value)}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={paciente.contraseña}
        secureTextEntry
        onChangeText={(value) => handleChange("contraseña", value)}
      />

      <Text style={styles.label}>Tarifa:</Text>
      <TextInput
        style={styles.input}
        value={paciente.tarifa}
        keyboardType="numeric"
        onChangeText={(value) => handleChange("tarifa", value)}
      />

      <Text style={styles.label}>Nombre de Emergencia:</Text>
      <TextInput
        style={styles.input}
        value={paciente.nombre_emergencia}
        onChangeText={(value) => handleChange("nombre_emergencia", value)}
      />

      <Text style={styles.label}>Contacto de Emergencia:</Text>
      <TextInput
        style={styles.input}
        value={paciente.contacto_emergencia}
        keyboardType="phone-pad"
        onChangeText={(value) => handleChange("contacto_emergencia", value)}
      />

      <Text style={styles.label}>Estado Civil:</Text>
      <Picker
        selectedValue={paciente.estado_civil}
        onValueChange={(value) => handleChange("estado_civil", value)}
        style={styles.picker}
      >
        <Picker.Item label="Soltero/a" value="Soltero/a" />
        <Picker.Item label="Casado/a" value="Casado/a" />
        <Picker.Item label="Divorciado/a" value="Divorciado/a" />
        <Picker.Item label="Viudo/a" value="Viudo/a" />
      </Picker>

      <Text style={styles.label}>Género:</Text>
      <Picker
        selectedValue={paciente.genero}
        onValueChange={(value) => handleChange("genero", value)}
        style={styles.picker}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <Text style={styles.label}>Ocupación:</Text>
      <TextInput
        style={styles.input}
        value={paciente.ocupacion}
        onChangeText={(value) => handleChange("ocupacion", value)}
      />

      <Text style={styles.label}>Fecha de Ingreso:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePickerIngreso(true)}
      >
        <Text style={styles.dateButtonText}>
          {paciente.fecha_ingreso.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePickerIngreso && (
        <DateTimePicker
          value={paciente.fecha_ingreso}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || paciente.fecha_ingreso;
            setShowDatePickerIngreso(false);
            handleChange("fecha_ingreso", currentDate);
          }}
        />
      )}
      {/* Boton que cambia el titulo del mismo dependiendo si se esta editando o no */}
      <Button
        title={editing ? "Actualizar Paciente" : "Guardar Paciente"}
        onPress={handleSubmit}
        color="#B8B6F2"
        disabled={!isFormValid()}
      />
    </ScrollView>
  );
};

// Estilos para el componente AddPaciente
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    color: "#4a4a4a",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B8B6F2",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  dateButton: {
    backgroundColor: "#E0E0FF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#4a4a4a",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#B8B6F2",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
});

export default AddPaciente; // Exporta el componente principal AddPaciente

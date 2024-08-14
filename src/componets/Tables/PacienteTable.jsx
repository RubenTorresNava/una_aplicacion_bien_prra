import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import PacienteItem from "../Items/PacienteItem"; // Importa el componente para cada ítem de paciente
import { useIsFocused } from "@react-navigation/native"; // Hook para verificar si la pantalla está enfocada
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// Componente para mostrar la lista de pacientes
const PacienteTable = ({ navigation }) => {
  const [pacientes, setPacientes] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const isFocused = useIsFocused(); 
  const API_URL = "http://192.168.1.5:3000/api/pacientes";
  const { userToken } = useContext(AuthContext);


  // Función para cargar los pacientes desde la API o datos locales
  const loadPacientes = async () => {
    // Activa el indicador de carga
    setLoading(true);
    try {
      // Aquí se llamaría a la API para obtener los pacientes
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
     });
      setPacientes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      // Desactiva el indicador de carga
      setLoading(false);
    }
  };

  // Efecto para cargar los pacientes cuando el componente está montado o cuando la pantalla está enfocada
  useEffect(() => {
    loadPacientes();
  }, [isFocused]);

  // Función para manejar la eliminación de un paciente
  const handleDelete = async (id) => {
    // Aquí se llamaría a la API para eliminar el paciente
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    await loadPacientes();
  };

  // Función para renderizar cada ítem en la lista
  const renderItem = ({ item }) => (
    <PacienteItem paciente={item} onDelete={handleDelete} />
  );

  // Función para refrescar la lista
  const onRefresh = async () => {
    // Activa el indicador de refresco
    setRefreshing(true);
    await loadPacientes();
    // Desactiva el indicador de refresco
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        // Muestra un indicador de carga mientras se obtienen los datos
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Muestra la lista de pacientes con la funcionalidad de refresco
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id_paciente.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

// Estilos para el componente PacienteTable
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  flatListContent: {
    paddingVertical: 8,
  },
});

export default PacienteTable; // Exporta el componente PacienteTable

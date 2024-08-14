import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import CitaItem from "../Items/CitaItem"; // Importa el componente para cada ítem de cita
import { useIsFocused } from "@react-navigation/native"; // Hook para verificar si la pantalla está enfocada
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

// Componente para mostrar la lista de citas
const CitasTabla = ({ navigation }) => {
  const { userToken } = useContext(AuthContext); // Obtén el token desde el contexto
  const API_URL = "http://192.168.1.5:3000/api/citas"; 
  const [citas, setCitas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const loadCitas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cita/hoy`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Incluye el token en la cabecera de la solicitud
        },
      });
      setCitas(response.data);
    } catch (error) {
      console.log(error); // Manejo de errores
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCitas();
  }, [isFocused]);

  //función de eliminación de cita
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    await loadCitas();
  };

  const renderItem = ({ item }) => (
    <CitaItem cita={item} onDelete={handleDelete} />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCitas();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id_cita.toString()}
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

// Estilos para el componente CitasTabla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default CitasTabla; // Exporta el componente CitasTabla

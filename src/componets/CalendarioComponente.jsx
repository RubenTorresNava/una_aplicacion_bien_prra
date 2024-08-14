import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de ajustar la ruta

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userToken } = useContext(AuthContext);

  // Función para manejar el evento de selección de un día en el calendario
  const handleDayPress = async (day) => {
    setSelectedDate(day.dateString);
    setShowModal(true);
    setLoading(true);

    try {
      // Llamada a la API para obtener citas por fecha
      const response = await axios.get(
        `http://192.168.1.5:3000/api/citas/fecha/${day.dateString}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Usa el token del contexto
          },
        }
      );
      setFilteredCitas(response.data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
      setFilteredCitas([]); // Vaciar la lista en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Función para renderizar el mensaje cuando no hay eventos disponibles
  const renderNoEventsMessage = () => (
    <View style={styles.noEventsContainer}>
      <Text style={styles.noEventsText}>Sin eventos disponibles</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "blue",
          },
        }}
        markingType="dot"
        locale={"es"}
        theme={{
          textDayFontFamily: "System",
          textMonthFontFamily: "System",
          textDayHeaderFontFamily: "System",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          monthTextColor: "#2d4150",
          indicatorColor: "#00adf5",
          backgroundColor: "white",
        }}
      />
      {selectedDate && (
        <Modal
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            {loading ? (
              <Text>Cargando...</Text>
            ) : filteredCitas.length > 0 ? (
              <FlatList
                data={filteredCitas}
                keyExtractor={(item) => item.id_cita.toString()}
                renderItem={({ item }) => (
                  <View style={styles.citaItem}>
                    <Text>{item.nombre_paciente}</Text>
                    <Text>{item.hora_cita}</Text>
                    <Text>{item.estado}</Text>
                  </View>
                )}
              />
            ) : (
              renderNoEventsMessage()
            )}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    marginTop: "auto",
  },
  citaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#B8B6F2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noEventsContainer: {
    padding: 20,
    alignItems: "center",
  },
  noEventsText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CalendarComponent;

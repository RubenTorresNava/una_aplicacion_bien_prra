import React from "react";
import Layout from "../componets/Layout";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PacienteTable from "../componets/Tables/PacienteTable";

const PatientScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <Text style={styles.Titulo}>Lista de Pacientes</Text>
      <PacienteTable />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate("Addpaciente");
        }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </Layout>
  );
};

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

export default PatientScreen;

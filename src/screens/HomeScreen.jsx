import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";


export default function HomeScreen() {
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    comidaFavorita: ''
  });

  const navigation = useNavigation();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error(`Error al cargar el perfil: ${error}`);
    }
  };

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error(`Error al atualizar el perfil: ${error}`);
      alert('Error al actualizar perfil');
    }
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(StackActions.replace("Login"));
    } catch (error) {
      console.error(`Error al cerrar sesión: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Mi Perfil</Text>
      <Input
        placeholder="Nombre"
        value={profile.nombre}
        onChangeText={(text) => setProfile({...profile, nombre: text})}
      />
      <Input
        placeholder="Apellido"
        value={profile.apellido}
        onChangeText={(text) => setProfile({...profile, apellido: text})}
      />
      <Input
        placeholder="Comida Favorita"
        value={profile.comidaFavorita}
        onChangeText={(text) => setProfile({...profile, comidaFavorita: text})}
      />
      <Button
        title="Actualizar Perfil"
        onPress={handleUpdate}
        containerStyle={styles.button}
      />
      <Button
        title="Cerrar Sesión"
        type="outline"
        onPress={handleSignout}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    textAlign: 'center',
    marginBottom: 30
  },
  button: {
    marginVertical: 10
  },
});
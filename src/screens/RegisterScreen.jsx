import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      setError(`Error al iniciar sesión: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.goBack()}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

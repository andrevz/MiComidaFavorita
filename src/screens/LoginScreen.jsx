import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const veryfiedEmail = /^\S+@\S+\.\S+$/.test(email);
  const veryfiedPassword = Boolean(password.trim());
  const isValidForm = veryfiedEmail && veryfiedPassword;

  const emailErrorMessage = submitted && !veryfiedEmail ? 'Formato de email invalido' : '';
  const passwordErrorMessage = submitted && !veryfiedPassword ? 'El campo es requerido' : '';
  const loginButtonDisabled = submitted && !isValidForm;

  const handleLogin = async () => {
    setIsLoading(true);
    setSubmitted(true);

    if (!isValidForm) {
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      setLoginError(`Error al iniciar sesión: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Mi Comida Favorita</Text>
      <Input
        placeholder="Email"
        errorMessage={emailErrorMessage}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        errorMessage={passwordErrorMessage}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loginError && <Text style={styles.error}>{loginError}</Text>}
      <Button
        title="Iniciar Sesión"
        disabled={isLoading || loginButtonDisabled}
        loading={isLoading}
        onPress={handleLogin}
        containerStyle={styles.button}
      />
      <Button
        title="Registrarse"
        type="outline"
        disabled={isLoading}
        onPress={() => navigation.navigate('Register')}
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

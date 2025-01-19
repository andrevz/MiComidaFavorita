import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { isValidEmailFormat, isEmptyObject } from "../utils/validators";


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleInputChange = (value, setValue) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    setValue(value);
  }

  const handleLogin = async () => {
    setIsLoading(true);
    setIsDirty(true);

    if (!isEmptyObject(validateForm())) {
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

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'El email es requerido';
    } else if (!isValidEmailFormat(email)) {
      errors.email = 'Formato de email inválido'
    }

    if (!password) {
      errors.password = 'La contraseña es requerida';
    }

    return errors;
  };

  const validationErrors = isDirty ? validateForm() : {};
  const loginButtonDisabled = isDirty && !isEmptyObject(validationErrors);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Mi Comida Favorita</Text>
      <Input
        placeholder="Email"
        errorMessage={validationErrors.email}
        value={email}
        onChangeText={(value) => handleInputChange(value, setEmail)}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        errorMessage={validationErrors.password}
        value={password}
        onChangeText={(value) => handleInputChange(value, setPassword)}
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

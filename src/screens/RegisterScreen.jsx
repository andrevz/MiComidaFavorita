import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";


export default function RegisterScreen() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    setSubmitted(true);

    if (!isEmptyObject(validateForm())) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      setRegisterError(`Error al iniciar sesión: ${error}`);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Formato de email inválido'
    }

    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (!validatePassword(password)) {
      errors.password = `La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial`;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
  };

  /**
   * Validates that the password matches the following criteria:
   * At least 8 characters, an upper case, a lower case, a number and a special character.
   * @param {string} password value to be validated
   * @returns a boolean indicating if value is valid
   */
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  /**
   * Checks if an object has keys.
   * @param {object} value the object to be tested
   * @returns true if the object doesn't contain keys
   */
  const isEmptyObject = (value) => {
    return typeof value === 'object' && Object.keys(value).length === 0;
  }

  const validationErrors = submitted ? validateForm() : {};
  const registerButtonDisabled = submitted && !isEmptyObject(validationErrors);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input
        placeholder="Email"
        errorMessage={validationErrors.email}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        errorMessage={validationErrors.password}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Contraseña"
        errorMessage={validationErrors.confirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {registerError && <Text style={styles.error}>{registerError}</Text>}
      <Button
        title="Registrarse"
        disabled={registerButtonDisabled}
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

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { isValidEmailFormat, isValidPasswordFormat, isEmptyObject } from "../utils/validators";


export default function RegisterScreen() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const navigation = useNavigation();

  const handleInputChange = (value, setValue) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    setValue(value);
  }

  const handleRegister = async () => {
    setIsDirty(true);
    setIsLoading(true);

    if (!isEmptyObject(validateForm())) {
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      setRegisterError(`Error al iniciar sesión: ${error}`);
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
    } else if (!isValidPasswordFormat(password)) {
      errors.password = `La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial`;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
  };

  const validationErrors = isDirty ? validateForm() : {};
  const registerButtonDisabled = isDirty && !isEmptyObject(validationErrors);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
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
      <Input
        placeholder="Confirmar Contraseña"
        errorMessage={validationErrors.confirmPassword}
        value={confirmPassword}
        onChangeText={(value) => handleInputChange(value, setConfirmPassword)}
        secureTextEntry
      />
      {registerError && <Text style={styles.error}>{registerError}</Text>}
      <Button
        title="Registrarse"
        disabled={isLoading || registerButtonDisabled}
        loading={isLoading}
        onPress={handleRegister}
        containerStyle={styles.button}
      />
      <Button
        title="Volver al Login"
        type="outline"
        disabled={isLoading}
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

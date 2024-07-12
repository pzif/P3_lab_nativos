import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Cadastro realizado com sucesso!', `Nome: ${data.name}\nEmail: ${data.email}`);
      } else {
        Alert.alert('Erro ao cadastrar', data.message || 'Ocorreu um erro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToHome}>
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#fff',
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


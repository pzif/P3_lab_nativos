import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log('Enviando requisição de login...');
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      console.log('Resposta recebida:', response);
      const data = await response.json();
      console.log('Dados recebidos:', data);

      if (response.ok) {
        Alert.alert('Login realizado com sucesso!', `Token: ${data.token}`);
      } else {
        Alert.alert('Erro ao fazer login', data.message || 'Ocorreu um erro.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
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
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
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

import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToLogin}>
          <Text style={styles.menuItemText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToCadastro}>
          <Text style={styles.menuItemText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo à Home</Text>
        <Text style={styles.subtitle}>Selecione uma opção no menu ao lado</Text>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

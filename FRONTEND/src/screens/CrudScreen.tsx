import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Item {
  id: string;
  name: string;
}

export default function CrudScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const navigation = useNavigation();

  const addItem = () => {
    if (!name) return;

    const newItem: Item = {
      id: Math.random().toString(),
      name,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setName('');
  };

  const updateItem = () => {
    if (!name || !editingItem) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id ? { ...item, name } : item
      )
    );

    setEditingItem(null);
    setName('');
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const startEditing = (item: Item) => {
    setEditingItem(item);
    setName(item.name);
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setName('');
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
        <Text style={styles.title}>CRUD</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        {editingItem ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={updateItem}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelEditing}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={styles.itemButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.editButton, styles.deleteButton]} onPress={() => deleteItem(item.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
  itemButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

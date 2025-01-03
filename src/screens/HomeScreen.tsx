import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [lists, setLists] = React.useState([
    { id: '1', name: 'Weekelijkse boodschappen', itemCount: 0, lastModified: new Date().toISOString() }
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <View>
        <Text style={styles.listName}>{item.name}</Text>
        <Text style={styles.listInfo}>
          {item.itemCount} items • Laatst bewerkt: {new Date(item.lastModified).toLocaleDateString('nl-NL')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  listName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
  },
  listInfo: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
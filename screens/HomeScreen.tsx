import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchLists } from '../requests'; 

const HomeScreen = () => {
  const [households, setHouseholds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  useEffect(() => {
    const getLists = async () => {
      try {
        const data = await fetchLists();
        setHouseholds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLists();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeContainer, { paddingTop: statusBarHeight }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.headerTitle}>John's Lists</Text>

      <FlatList
        data={households}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10, paddingHorizontal:16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { listID: item.id, listName: item.name })}
          >
            <Text style={styles.nameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginBottom: 16 
  },
  item: { 
    padding: 16, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    backgroundColor: '#f9f9f9' 
  },
  nameText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
});

export default HomeScreen;

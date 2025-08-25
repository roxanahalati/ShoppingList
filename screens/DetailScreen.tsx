import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import HeaderWithBack from './../components/Header';
import { fetchListDetails } from '../requests';

const DetailScreen = ({ route, navigation }) => {
  const { listID, listName } = route.params; 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getListInfo = async () => {
      try {
        const data = await fetchListDetails(listID);
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getListInfo();
  }, [listID]);

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

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
        {/* Here we'd need a new request for actual category info */}
      <Text style={styles.categoryTitle}>Category {item.category}</Text>
      {item.groceries.map((grocery, index) => (
        <View key={index} style={styles.groceryCard}>
          <Text style={styles.groceryText}>{grocery.amount} x {grocery.name}</Text>
          {grocery.note ? (
            <Text style={styles.groceryNote}>{grocery.note.trim()}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
      <HeaderWithBack title={listName} onBack={() => navigation.goBack()} />

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  categoryContainer: { 
    marginBottom: 20, 
    paddingHorizontal: 16 
  },
  categoryTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#222' 
  },
  groceryCard: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  groceryText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
  groceryNote: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginTop: 4,
  },
});

export default DetailScreen;

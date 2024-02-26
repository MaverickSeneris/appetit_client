import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUri = 'http://192.168.1.101:8080/recipes';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUri);
        console.log(response.data);
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const recipeEls = recipes.map(item => {
    return (
      <View key={item._id} style={styles.recipesList}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.recipeText}>{item.recipe}</Text>
          <Text style={styles.authorText}>{item.author}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item.image}} />
        </View>
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : recipes ? (
        <View style={styles.recipeFeed}>
          <Text style={{fontSize: 40, fontWeight: '700', color: 'black'}}>
            User Recipes
          </Text>
          {recipeEls}
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  recipeFeed: {
    width: '100%',
    justifyContent: 'center',
  },
  recipesList: {
    width: '100%',
  },
  userInfoContainer: {
    justifyContent: 'center',
  },
  recipeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10
  },
});

export default Home;

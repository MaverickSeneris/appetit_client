import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Fonts} from '../globalStyles/theme';
import backArrow from '../assets/icons/back-arrow.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function RecipeDetailScreen({navigation, route}) {
  const {itemId} = route.params;
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUri = `http://192.168.1.237:8080/recipes/${itemId}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUri);
        console.log(response.data);
        setSelectedRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : selectedRecipe ? (
        <View>
          {/* Image elements */}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: selectedRecipe.image}} />
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate('Home')}>
              <Image source={backArrow} style={styles.backArrow} />
            </TouchableOpacity>
          </View>

          {/* Recipe info elements */}
          <View style={styles.recipeInfoContainer}>
            <Text style={styles.name}>{selectedRecipe.name}</Text>
            <Text style={styles.infoHeaders}>Description</Text>
            <Text>{selectedRecipe.description}</Text>
            <Text style={styles.infoHeaders}>Ingredients</Text>
            <View>
              {selectedRecipe.ingredients.map((item, index) => (
                <View key={index} style={styles.lists}>
                  <Text>• {item}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.infoHeaders}>Instructions</Text>
            <Text>{selectedRecipe.instructions}</Text>
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 18,
    height: 18,
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  recipeInfoContainer: {
    padding: 20,
  },
  name: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 20,
    marginVertical: 3,
  },
  infoHeaders: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 16,
    marginVertical: 15,
  },
  lists:{
    paddingBottom: 7
  }
});

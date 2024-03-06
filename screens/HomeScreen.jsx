import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import {Fonts} from '../globalStyles/theme';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../components/Header';


const HomeScreen = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const apiUri = 'http://192.168.1.237:8080/recipes';
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUri);
          console.log(response.data);
          setRecipes(response.data);
          setLoading(false);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : recipes ? (
        <View>
          <Button
            title="Create Recipe"
            onPress={() => navigation.navigate('Create Recipe')}
          />
         <Header header={"All Recipes"}/>
          <View style={styles.cardContainer}>
            <FlatList
              numColumns={2}
              keyExtractor={item => item._id}
              data={recipes}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Recipe', {itemId: item._id})
                  }>
                  <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: item.image}} />
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : (
        // TODO: Make a no data available component
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    padding: 10,
  },
  header: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 22,
  },
  cardContainer: {
    width: '100%',
    borderRadius: 8,
  },
  card: {
    width: 168,
    height: 220,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    borderRadius: 8,
    margin: 9,
  },
  imageContainer: {
    borderRadius: 8,
    width: '100%',
    height: 145,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: '100%',
    height: 145,
  },
  infoContainer: {
    padding: 7,
  },
  name: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
  },
  details: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  textDetail: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 12,
    color: 'rgba(0,0,0,0.50)',
  },
});

export default HomeScreen;

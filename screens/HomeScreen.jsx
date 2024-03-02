import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import {Fonts} from '../globalStyles/theme';

const HomeScreen = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUri = 'http://192.168.1.237:8080/recipes';
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

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : recipes ? (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Your Recipes</Text>
          </View>
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

                    <View style={{flexDirection: "row"}}>
                      {item.typeOfDish.map((type, index) => (
                        <View key={index}>
                          <Text style={styles.textDetail}>{type} </Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.details}>
                      <Text style={styles.textDetail}>
                        <Text>{`${item.cookingTime.duration} ${
                          item.cookingTime.duration > 1
                            ? item.cookingTime.unit + 's'
                            : item.cookingTime.unit
                        }`}</Text>
                      </Text>
                      <Text style={styles.textDetail}>
                        Serves: {item.serves}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
      <Button title="Create Recipe" onPress={()=>navigation.navigate("Create Recipe")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  header: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 22,
  },
  cardContainer: {
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin: 5,
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

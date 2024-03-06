import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts} from '../globalStyles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RecipeForm from '../components/RecipeForm';
import Header from '../components/Header';

export default function CreateRecipeScreen() {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    instructions: '',
    ingredients: ['', '', ''],
    image: '',
    serves: '',
    cookingHr: '',
    cookingMin: '',
    typeOfDish: '',
  });

  function handleChange(key, value) {
    setNewRecipe(prevNewRecipe => ({
      ...prevNewRecipe,
      [key]: value,
    }));
  }

  function handleIngredientChange(index, text) {
    const newIngredients = [...newRecipe.ingredients];
    newIngredients[index] = text;
    setNewRecipe(prevNewRecipe => ({
      ...prevNewRecipe,
      ingredients: newIngredients,
    }));
  }

  function handleAddIngredient() {
    setNewRecipe(prevNewRecipe => ({
      ...prevNewRecipe,
      ingredients: [...prevNewRecipe.ingredients, ''], // Add a new empty ingredient
    }));
  }

  const handleDeleteIngredient = (index) => {
    setNewRecipe(prevState => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients.splice(index, 1);
      return { ...prevState, ingredients: updatedIngredients };
    });
  };

  // TODO: Fix image picker error 404
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        uploadImage(response);
      }
    });
  };

  const uploadImage = async image => {
    try {
      const data = new FormData();
      data.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName || 'image.jpg', // Provide a default name if not available
      });
      data.append('upload_preset', '_DemoUser');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/mavseneriscamp/image/upload',
        data,
      );
      const imageUrl = response.data.secure_url;

      setNewRecipe(prevNewRecipe => ({
        ...prevNewRecipe,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      // Alert.alert('Error', 'Failed to upload image to Cloudinary. Please try again.');
    }
  };

  function handleSubmit() {
    const createRecipe = async () => {
      try {
        const response = await axios.post(
          'http://192.168.1.237:8080/create',
          newRecipe,
        );
        if (response.status !== 201) {
          throw new Error('Error creating recipe');
        }
        const data = response.data;
        console.log('New recipe created:', data);
        setNewRecipe({
          name: '',
          description: '',
          instructions: '',
          ingredients: ['', '', ''],
          image: '',
          serves: '',
          cookingHr: '',
          cookingMin: '',
          typeOfDish: '',
        });
      } catch (error) {
        console.error('Error creating recipe:', error);
        // TODO: Handle any errors or display error message to the user
      }
    };
    createRecipe();
  }

  return (
    <View style={styles.container}>
      <Header header={"Create Recipe"}/>
      <RecipeForm
        recipeData={newRecipe}
        handleChange={handleChange}
        handleIngredientChange={handleIngredientChange}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}
        handleImagePicker={handleImagePicker}
        handleSubmit={handleSubmit}
      />
      <Button title="submit" onPress={() => handleSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    width: 327,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 22,
  },
  form: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    marginVertical: 10,
  },
  input: {
    fontFamily: Fonts.REGULAR,
    backgroundColor: 'rgba(0,0,0,0.10)',
    width: 327,
    height: 53,
    borderRadius: 8,
    padding: 20,
    fontFamily: Fonts.REGULAR,
  },
  inputDescription: {
    backgroundColor: 'rgba(0,0,0,0.10)',
    width: 327,
    height: 100,
    borderRadius: 8,
    padding: 20,
  },
  uploadArea: {
    width: 327,
    height: 190,
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitSection: {
    width: '100%',
    height: 200,
    marginTop: 20,
    gap: 10,
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rtSmInput: {
    width: 153,
    height: 53,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.10)',
    padding: 20,
    fontFamily: Fonts.REGULAR,
  },
  rtXsInput: {
    width: 45,
    height: 45,
    justifyContent: 'center',

    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.10)',
    padding: 10,
    fontFamily: Fonts.REGULAR,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

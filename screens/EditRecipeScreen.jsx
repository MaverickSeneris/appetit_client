import {StyleSheet, View, Button} from 'react-native';
import React, {useState} from 'react';
import RecipeForm from '../components/RecipeForm';
import axios from 'axios';
import Header from '../components/Header';


export default function EditRecipeScreen({route}) {
  const {selectedRecipe} = route.params;
  const [editedRecipe, setEditedRecipe] = useState(selectedRecipe);

  function handleChange(key, value) {
    setEditedRecipe(prevEditedRecipe => ({
      ...prevEditedRecipe,
      [key]: value,
    }));
  }

  function handleIngredientChange(index, text) {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients[index] = text;
    setEditedRecipe(prevEditedRecipe => ({
      ...prevEditedRecipe,
      ingredients: newIngredients,
    }));
  }
  function handleSubmit() {
    const createRecipe = async () => {
      try {
        const response = await axios.post(
          'http://192.168.1.237:8080/create',
          editedRecipe,
        );
        if (response.status !== 201) {
          throw new Error('Error creating recipe');
        }
        const data = response.data;
        console.log('New recipe created:', data);
      } catch (error) {
        console.error('Error creating recipe:', error);
        // TODO: Handle any errors or display error message to the user
      }
    };
    createRecipe();
  };

  function handleAddIngredient() {
    setEditedRecipe(prevEditedRecipe => ({
      ...prevEditedRecipe,
      ingredients: [...prevEditedRecipe.ingredients, ''], // Add a new empty ingredient
    }));
  };

  const handleDeleteIngredient = index => {
    setEditedRecipe(prevState => {
      const updatedIngredients = [...prevState.ingredients];
      updatedIngredients.splice(index, 1);
      return {...prevState, ingredients: updatedIngredients};
    });
  };
  return (
    <View style={styles.container}>
        <Header header={`Edit ${editedRecipe.name}`}/>
      <RecipeForm
        recipeData={editedRecipe}
        handleAddIngredient={handleAddIngredient}
        handleChange={handleChange}
        handleIngredientChange={handleIngredientChange}
        handleDeleteIngredient={handleDeleteIngredient}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
});

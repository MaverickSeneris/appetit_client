import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Fonts} from '../globalStyles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CreateRecipeScreen() {
  const Unit = ['min', 'hr'];
  const [ingredient, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    instructions: '',
    ingredients: ['', '', ''],
    image: '',
    serves:'',
    cookingHr:'',
    cookingMin:'',
    typeOfDish:'',
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

  function handleSubmit() {
    // Here you can handle form submission, e.g., send data to the server
    console.log(newRecipe);
    // Reset form after submission
    setNewRecipe({
      name: '',
      description: '',
      instructions: '',
      ingredients: [],
      image: '',
      serves: 0,
      cookingHr: '',
      cookingMin: '',
      typeOfDish: '',
    });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ***HEADER*** */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create a Recipe</Text>
        </View>

        {/* ***FORM 1*** */}
        <View style={{width: '100%'}}>
          {/* Recipe Title */}
          <Text style={styles.label}>Recipe Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Family favorite chicken soup"
            value={newRecipe.name}
            onChangeText={text => handleChange('name', text)}
          />

          {/* ***DESCRIPTION*** */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline
            editable
            numberOfLines={1000}
            style={styles.inputDescription}
            placeholder="e.g. Grandama's delicious recipe..."
            value={newRecipe.description}
            onChangeText={text => handleChange('description', text)}
          />

          {/* ***INGREDIENTS*** */}
          <View style={{gap: 10}}>
            <Text style={styles.label}>Ingredients</Text>
            {newRecipe.ingredients.map((ingredient, index) => (
              <TextInput
                key={index}
                value={ingredient}
                onChangeText={text => handleIngredientChange(index, text)}
                placeholder={`Ingredient ${index + 1}`}
                style={styles.input}
              />
            ))}
            <TouchableOpacity onPress={handleAddIngredient}>
              <Text>+ Add ingredients</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <Text style={styles.label}>Instructions</Text>
          <TextInput
            multiline
            editable
            numberOfLines={1000}
            style={styles.inputDescription}
            placeholder="Enter cooking instruction here"
            value={newRecipe.instructions}
            onChangeText={text => handleChange('instructions', text)}
          />

          {/* ***RECIPE PHOTO*** */}
          <Text style={styles.label}>Recipe Photo</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <AntDesign name="picture" style={{fontSize: 50, color: 'gray'}} />
          </TouchableOpacity>
        </View>
        {/* ***FORM 2*** */}
        <View style={styles.unitSection}>
          <View style={styles.rowSection}>
            {/* Cooking Time */}
            <Text style={styles.label}>Cooking Time</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                marginRight: 12,
              }}>
              <TextInput
                placeholder="1"
                style={styles.rtXsInput}
                value={newRecipe.cookingHr}
                onChangeText={text => handleChange('cookingHr', text)}
              />
              <Text>hr</Text>
              <TextInput
                placeholder="45"
                style={styles.rtXsInput}
                value={newRecipe.cookingMin}
                onChangeText={text => handleChange('cookingMin', text)}
              />
              <Text>min</Text>
            </View>
          </View>
          {/* ***PORTION*** */}
          <View style={styles.rowSection}>
            <Text style={styles.label}>Portion</Text>
            <TextInput
              placeholder="2 people"
              style={styles.rtSmInput}
              value={newRecipe.serves}
              onChangeText={text => handleChange('serves', text)}
            />
          </View>
        </View>
      </ScrollView>
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
});

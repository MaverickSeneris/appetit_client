import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ***SCREENS*** //
import HomeScreen from './screens/HomeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import CreateRecipeScreen from './screens/CreateRecipeScreen';
import EditRecipeScreen from './screens/EditRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'Bold',
            },
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Appetit',
          }}
        />
        <Stack.Screen name="Recipe" component={RecipeDetailScreen} />
        <Stack.Screen name="Create Recipe" component={CreateRecipeScreen} />
        <Stack.Screen name="Edit Recipe" component={EditRecipeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

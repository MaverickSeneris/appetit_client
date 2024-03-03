import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Fonts} from '../globalStyles/theme';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function CreateRecipeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Create a Recipe</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Recipe Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Family favorite chicken soup"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline
              editable
              numberOfLines={10}
              maxLength={40}
              style={styles.inputDescription}
              placeholder="Grandama's delicious recipe..."
            />
            <Text style={styles.label}>Recipe Photo</Text>
            <TouchableOpacity style={styles.uploadArea}>
              <AntDesign name="picture" style={{fontSize:50, color: "gray"}}/>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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

  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 14,
    marginVertical: 10
  },
  input: {
    fontFamily: Fonts.REGULAR,
    backgroundColor: 'rgba(0,0,0,0.10)',
    width: 327,
    height: 53,
    borderRadius: 8,
    padding: 20,
  },
  inputDescription: {
    fontFamily: Fonts.REGULAR,
    backgroundColor: 'rgba(0,0,0,0.10)',
    width: 327,
    height: 100,
    borderRadius: 8,
    padding: 2,
  },
  uploadArea:{
    width: 327,
    height: 190,
    backgroundColor:'rgba(0,0,0,0.10)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

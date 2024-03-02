import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Fonts} from '../globalStyles/theme';

export default function CreateRecipeScreen() {
  const [imageSource, setImageSource] = useState('');

  const selectFromCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
  };

  const selectFromGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image library picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
  };

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
              multiline={true}
              style={styles.input}
              placeholder="Grandama's delicious recipe..."
            />
            <Text style={styles.label}>Recipe Photo</Text>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            <View style={styles.buttonContainer}>
              <Button title="Select from Camera" onPress={selectFromCamera} />
              <Button title="Select from Gallery" onPress={selectFromGallery} />
            </View>
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
    gap: 10
  },
});

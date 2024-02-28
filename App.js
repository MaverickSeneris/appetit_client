import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      {/* <LoadingScreen/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import Logo from '../assets/Logo.png';
import React from 'react';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <Text style={{fontSize: 30, fontWeight: "700", color: "red"}}>Appetit</Text>
      <View style={{marginTop: 100}}>
        <ActivityIndicator size="extra-large" color="orange" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '80%',
  },
  logo: {
    width: 300,
    height: 300,
  },
});

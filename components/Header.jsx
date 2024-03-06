import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Fonts } from '../globalStyles/theme';

export default function Header({header}) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{header}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: 327,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    fontFamily: Fonts.SEMIDBOLD,
    fontSize: 22,
  },
});

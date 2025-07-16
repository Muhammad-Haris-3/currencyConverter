import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CurrencyProp = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 26,
    color: 'black',
    marginBottom: 3,
  },
  country: {
    fontSize: 16,
    color: 'black',
    padding: 1,
    fontWeight: 'bold',
  },
});

export default CurrencyButton;

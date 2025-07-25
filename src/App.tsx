import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { CurrencyByRuppee } from './constants';
import CurrencyButton from './components/CurrencyButton';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      Snackbar.show({
        text: 'Please Enter Amount First',
        textColor: 'red',
        backgroundColor: 'aqua',
      });
      return;
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedAmount = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedAmount.toFixed(2)}`;

      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      Snackbar.show({
        text: 'Please Enter Valid Input',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>Rs</Text>
            <TextInput
              style={styles.inputAmountField}
              value={inputValue}
              onChangeText={setInputValue}
              maxLength={14}
              keyboardType="numeric"
              placeholder="Enter Amount"
              placeholderTextColor={'green'}
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={CurrencyByRuppee}
            keyExtractor={item => item.name}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={[
                    styles.button,
                    targetCurrency === item.name && styles.selected,
                  ]}
                  onPress={() => buttonPressed(item)}
                >
                  <CurrencyButton {...item} />
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 7,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;

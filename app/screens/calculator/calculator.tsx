import React from 'react'
import { StyleSheet, View, ViewStyle} from 'react-native'
import { observer } from 'mobx-react-lite'
import {CalculatorButtons, CalculatorDisplay } from '../../components'
import * as math from 'mathjs';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuid } from  'uuid'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';

if (__DEV__ && false) {
    AsyncStorage.clear().then(() => console.log('Cleared'))
}

const FULL: ViewStyle = {
  flex: 1
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DDDDDD',
  }
});

const CALCULATOR_HISTORY_KEY = 'CALCULATOR_HISTORY'

export const Calculator = observer(function Calculator() {

  const [displayExpression, setDisplayExpression] = React.useState('');
  const [currentNumber, setCurrentNumber] = React.useState('');

  const navigation = useNavigation()
  const navigateToHistory = () => navigation.navigate('historyList')

  const storeData = async (value) => {
    const toStore = {
      date: Date.now(),
      expression: value
    }
    try {
      await AsyncStorage.mergeItem(CALCULATOR_HISTORY_KEY + '-' + uuid(), JSON.stringify(toStore))
    } catch (e) {
      console.log('Error storing ' + value + ' ' + e)
    }
  }

  const onChangeText = (text: string) => {
    setDisplayExpression(text)
  }

  const clearAll = () => {
    console.log('Clear')
    setDisplayExpression('')
    setCurrentNumber('')
  }

  const inputParenthesis = (parenthesis: string) => {
    const newValue = displayExpression === '' ? String(parenthesis) : displayExpression + parenthesis
    setDisplayExpression(newValue)
  };

  const inputOperator = (keyType: string) => {
    setCurrentNumber('')
    inputDigit(keyType)
  };

  const clearLastChar = () => {
    if(displayExpression && currentNumber){
      setDisplayExpression(displayExpression.substring(0, displayExpression.length - 1) || '');
      setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1) || '');
    }
  }

  const inputPercent = () => {
    inputDigit('%')
  };

  const inputDot = () => {
    setDisplayExpression(displayExpression + '.')
  }

  const inputDigit = (digit: string) => {
    const newValue = displayExpression === '' ? String(digit) : displayExpression + digit
    setDisplayExpression(newValue)
    const newCurrent = currentNumber === '' ? String(digit) : currentNumber + digit
    setCurrentNumber(newCurrent)
  }

  const performOperation = (nextOperator: string) => {
    let newDisplayValue = ''
    
    if(nextOperator === '='){

      try {
        newDisplayValue = String(math.evaluate(displayExpression))
      } catch(e){
        console.log('Error')
        setDisplayExpression('')
        setCurrentNumber('')
      }
      storeData(displayExpression)
      setDisplayExpression(newDisplayValue)
      setCurrentNumber(newDisplayValue)
    }
  }

  return (
    <View testID='CalculatorScreen' style={FULL}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title='Calculator' />
        <Appbar.Action icon={() => <FontAwesome name='history' size={24} color='black' />} 
          onPress={navigateToHistory} />
      </Appbar.Header>
      <CalculatorDisplay displayValue={displayExpression} clearLastChar={clearLastChar}
        onChangeText={onChangeText}/>
      <CalculatorButtons clearAll={clearAll} inputDot={inputDot}
       inputDigit={inputDigit} performOperation={performOperation}
       inputOperator={inputOperator} inputPercent={inputPercent}
      inputParenthesis={inputParenthesis}/>
    </View>
  )
})

import React from "react"
import { View, ViewStyle} from "react-native"
import { observer } from "mobx-react-lite"
import {CalculatorButtons, CalculatorDisplay } from "../../components"

const FULL: ViewStyle = {
  flex: 1
}

export const Calculator = observer(function Calculator() {

  const [value, setValue] = React.useState(null);
  const [displayValue, setDisplayValue] = React.useState('0');
  const [operator, setOperator] = React.useState(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);

  const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  }

  const clearAll = () => {
      console.log("Clear");
      setValue(null);
      setDisplayValue('');
      setOperator(null);
      setWaitingForOperand(false);
  }

  const clearDisplay = () => {
    setDisplayValue('');
  }

  const clearLastChar = () => {
      setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  }

  const inputPercent = () => {
    console.log("%");
    const currentValue = parseFloat(displayValue)
    
    if (currentValue === 0)
      return
    
    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }

  const inputDot = () => {
    console.log(".");
    if (!(/\./).test(displayValue)) {
        setDisplayValue(displayValue + '.')
        setWaitingForOperand(false)
    }
  }

  const inputDigit = (digit) => {
    console.log(digit);
    if (waitingForOperand) {
        setDisplayValue(String(digit))
        setWaitingForOperand(false)
    } else {
        setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
    }
  }

  const performOperation = (nextOperator) => {    
    console.log(nextOperator);
    const inputValue = parseFloat(displayValue)
    
    if (value == null) {
      setValue(inputValue)
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      setValue(newValue)
      setDisplayValue(String(newValue))
    }
    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  return (
    <View testID="CalculatorScreen" style={FULL}>
      <CalculatorDisplay displayValue={displayValue}/>
      <CalculatorButtons clearAll={clearAll} inputPercent={inputPercent}
      inputDot={inputDot} inputDigit={inputDigit} performOperation={performOperation}/>
    </View>
  )
})

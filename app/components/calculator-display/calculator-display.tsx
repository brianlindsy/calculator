import React from "react"
import { View, ViewStyle, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native"
import { observer } from "mobx-react-lite"
import { DisplayProps } from "./display-props"
import { FontAwesome5 } from "@expo/vector-icons"

const FULL: ViewStyle = {
  flex: 1
}
const CALC_PANE: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  justifyContent: "flex-end",
  padding: 10
}

const BACKSPACE: ViewStyle = {
  backgroundColor: "#FFFFFF",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  padding: 20,
}

const styles = StyleSheet.create({
  calcDisplayText: {
    fontSize: 40,
    fontWeight: "bold",
    alignContent:"flex-end",
    padding: 25,
  },
  backspace: {
    fontSize: 25
  }
});

export const CalculatorDisplay = observer(function CalculatorDisplay(props: DisplayProps) {

  const handleOnPress = () => {
    props.clearLastChar()
  }

  const onChangeText = (text: string) => {
    props.onChangeText(text);
  }

  return (
    <View testID="CalculatorDisplay" style={FULL}>
      <TextInput style={CALC_PANE} onChangeText={onChangeText} keyboardType="number-pad" multiline={true}>
        <Text style={styles.calcDisplayText}>{props.displayValue}</Text>
      </TextInput>
      <TouchableOpacity key="back" style={BACKSPACE} onPress={() => handleOnPress()}>
          <View>
            <FontAwesome5 style={styles.backspace} name="backspace" color="black" />
          </View>
      </TouchableOpacity>
    </View>
  )
})


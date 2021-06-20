import React from "react"
import { View, ViewStyle, Text, StyleSheet} from "react-native"
import { observer } from "mobx-react-lite"
import { DisplayProps } from "./display-props"

const FULL: ViewStyle = {
  flex: 1
}
const CALC_PANE: ViewStyle = {
  flex:1,
  backgroundColor: "#FFFFFF",
  justifyContent: "center"
}

const styles = StyleSheet.create({
  calcDisplayText: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf:"flex-end",
    padding: 10,
  }
});

export const CalculatorDisplay = observer(function CalculatorDisplay(props: DisplayProps) {
  return (
    <View testID="CalculatorDisplay" style={FULL}>
      <View style={CALC_PANE}>
        <Text style={styles.calcDisplayText}>{props.displayValue}</Text>
      </View>
    </View>
  )
})

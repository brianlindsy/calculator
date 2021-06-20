import React from "react"
import { View,  ViewStyle, TouchableOpacity, Text} from "react-native"
import { observer } from "mobx-react-lite"
import { ButtonProps } from "./button-props"

const FULL: ViewStyle = {
    flex: 3,
}
const ROW: ViewStyle = {
    flexDirection: "row",
    height: "20%"
}
const BUTTON: ViewStyle = {
    backgroundColor: "#DDDDDD",
    padding: 10,
    flexGrow:1
}

export const CalculatorButtons = observer(function CalculatorButtons(props: ButtonProps) {

    const handleOnPress = (keyType: string) => {
        if(!isNaN(Number(keyType))){
            console.log('is a number')
            props.inputDigit(keyType);
        } else if (keyType === "C"){
            props.clearAll();
        } else if (keyType === "."){
            props.inputDot();
        } else if (keyType === "%"){
            props.inputPercent();
        } else {
            props.performOperation(keyType);
        }
    }

    return (
        <View style={FULL}>
            <View style={ROW}>
                <TouchableOpacity key="clear" style={BUTTON} onPress={() => handleOnPress("C")}>
                    <Text>C</Text>
                </TouchableOpacity>
                <TouchableOpacity key="parenthesis" style={BUTTON}>
                    <Text>()</Text>
                </TouchableOpacity>
                <TouchableOpacity key="percent" style={BUTTON} onPress={() => handleOnPress("%")}>
                    <Text>%</Text>
                </TouchableOpacity>
                <TouchableOpacity key="divide" style={BUTTON} onPress={() => handleOnPress("/")}>
                    <Text>/</Text>
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="seven" style={BUTTON} onPress={() => handleOnPress("7")}>
                    <Text>7</Text>
                </TouchableOpacity>
                <TouchableOpacity key="eight" style={BUTTON} onPress={() => handleOnPress("8")}>
                    <Text>8</Text>
                </TouchableOpacity>
                <TouchableOpacity key="nine" style={BUTTON} onPress={() => handleOnPress("9")}>
                    <Text>9</Text>
                </TouchableOpacity>
                <TouchableOpacity key="multiply" style={BUTTON} onPress={() => handleOnPress("*")}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="four" style={BUTTON} onPress={() => handleOnPress("4")}>
                    <Text>4</Text>
                </TouchableOpacity>
                <TouchableOpacity key="five" style={BUTTON} onPress={() => handleOnPress("5")}>
                    <Text>5</Text>
                </TouchableOpacity>
                <TouchableOpacity key="six" style={BUTTON} onPress={() => handleOnPress("6")}>
                    <Text>6</Text>
                </TouchableOpacity>
                <TouchableOpacity key="minus" style={BUTTON} onPress={() => handleOnPress("-")}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="one" style={BUTTON} onPress={() => handleOnPress("1")}>
                    <Text>1</Text>
                </TouchableOpacity>
                <TouchableOpacity key="two" style={BUTTON} onPress={() => handleOnPress("2")}>
                    <Text>2</Text>
                </TouchableOpacity>
                <TouchableOpacity key="three" style={BUTTON} onPress={() => handleOnPress("3")}>
                    <Text>3</Text>
                </TouchableOpacity>
                <TouchableOpacity key="add" style={BUTTON} onPress={() => handleOnPress("+")}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="doubleZero" style={BUTTON} onPress={() => handleOnPress("00")}>
                    <Text>00</Text>
                </TouchableOpacity>
                <TouchableOpacity key="zero" style={BUTTON} onPress={() => handleOnPress("0")}>
                    <Text>0</Text>
                </TouchableOpacity>
                <TouchableOpacity key="dot" style={BUTTON} onPress={() => handleOnPress(".")}>
                    <Text>.</Text>
                </TouchableOpacity>
                <TouchableOpacity key="equals" style={BUTTON} onPress={() => handleOnPress("=")}>
                    <Text>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  })
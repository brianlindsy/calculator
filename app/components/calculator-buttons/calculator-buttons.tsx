import React from "react"
import { View,  ViewStyle, TouchableOpacity, Text, Image, StyleSheet} from "react-native"
import { observer } from "mobx-react-lite"
import { ButtonProps } from "./button-props"

const FULL: ViewStyle = {
    flex: 2,
}
const ROW: ViewStyle = {
    flexDirection: "row",
    height: "20%"
}
const BUTTON: ViewStyle = {
    backgroundColor: "#DDDDDD",
    padding: 12.5,
    flexGrow:1
}

const DOUBLE_ZERO: ViewStyle = {
    flexDirection: "row"
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    buttonNumber: {
        flexGrow:1,
        width: 50,
        height: 50,
        padding: 5
    },
    doubleZero: {
        width: 25,
        height: 25
      },
    dot: {
        fontSize: 50
    }
  });

export const CalculatorButtons = observer(function CalculatorButtons(props: ButtonProps) {
    const isOperator = (keyType: string) => {
        if(keyType === "/" || keyType === "*" || keyType === "+" || keyType === "-"){
            return true;
        }
        return false;
    }

    const handleOnPress = (keyType: string) => {
        if(!isNaN(Number(keyType))){
            props.inputDigit(keyType)
        } else if(isOperator(keyType)){
            props.inputOperator(keyType)
        } else if (keyType === "C"){
            props.clearAll()
        } else if (keyType === "."){
            props.inputDot()
        } else if(keyType === "="){
            props.performOperation("=")
        } else if(keyType === "%"){
            props.inputPercent()
        } else if(keyType === "(" || keyType === ")"){
            props.inputParenthesis(keyType)
        }
    }

    return (
        <View style={FULL}>
            <View style={ROW}>
                <TouchableOpacity key="clear" style={BUTTON} onPress={() => handleOnPress("C")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/AC.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="leftParenthesis" style={BUTTON} onPress={() => handleOnPress("(")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/left_paren.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="rightParenthesis" style={BUTTON} onPress={() => handleOnPress(")")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/right_paren.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="percent" style={BUTTON} onPress={() => handleOnPress("%")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/percent.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="divide" style={BUTTON} onPress={() => handleOnPress("/")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/divide.png')} />
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="seven" style={BUTTON} onPress={() => handleOnPress("7")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/seven.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="eight" style={BUTTON} onPress={() => handleOnPress("8")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/eight.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="nine" style={BUTTON} onPress={() => handleOnPress("9")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/nine.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="multiply" style={BUTTON} onPress={() => handleOnPress("*")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/multiply.png')} />
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="four" style={BUTTON} onPress={() => handleOnPress("4")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/four.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="five" style={BUTTON} onPress={() => handleOnPress("5")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/five.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="six" style={BUTTON} onPress={() => handleOnPress("6")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/six.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="minus" style={BUTTON} onPress={() => handleOnPress("-")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/subtract.png')} />
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="one" style={BUTTON} onPress={() => handleOnPress("1")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/one.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="two" style={BUTTON} onPress={() => handleOnPress("2")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/two.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="three" style={BUTTON} onPress={() => handleOnPress("3")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/three.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="add" style={BUTTON} onPress={() => handleOnPress("+")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/add.png')} />
                </TouchableOpacity>
            </View>
            <View style={ROW}>
                <TouchableOpacity key="doubleZero" style={BUTTON} onPress={() => handleOnPress("00")}>
                    <View style={DOUBLE_ZERO}>
                        <Image style={styles.doubleZero} source={require('./buttonImages/zero.png')} />
                        <Image style={styles.doubleZero} source={require('./buttonImages/zero.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity key="zero" style={BUTTON} onPress={() => handleOnPress("0")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/zero.png')} />
                </TouchableOpacity>
                <TouchableOpacity key="dot" style={BUTTON} onPress={() => handleOnPress(".")}>
                    <Text style={styles.dot}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity key="equals" style={BUTTON} onPress={() => handleOnPress("=")}>
                    <Image style={styles.buttonNumber} source={require('./buttonImages/equals.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
  })
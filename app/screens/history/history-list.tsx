import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from "mobx-react-lite";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Appbar, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    header: {
      backgroundColor: "#DDDDDD",
    },
    title: {
        fontSize: 28
    },
    description: {
        fontSize: 14
    },
  });

export const HistoryList = observer(function HistoryList() {

    const CALCULATOR_HISTORY_KEY = "CALCULATOR_HISTORY"

    const getCalcHistoryKeys = async () => {
        let historyKeys = await AsyncStorage.getAllKeys()
        historyKeys.filter((key) => key.startsWith(CALCULATOR_HISTORY_KEY) ? true : false)

        return historyKeys
    }

    const clearStorage = async () => {
        const calcKeys = await getCalcHistoryKeys()

        AsyncStorage.multiRemove(calcKeys)

        setList([])
    }

    const navigation = useNavigation()
    const navigateToCalculator = () => navigation.navigate("calculator")

    const [list, setList] = React.useState([])
    
    useEffect(() => {
        async function fetch() {
            let historyKeys = await getCalcHistoryKeys()
            const values = await AsyncStorage.multiGet(historyKeys)
            const objects = values.map((array) => { return {date: JSON.parse(array[1])?.date, expression: JSON.parse(array[1])?.expression} })
            objects.sort(function(a, b) {
                return b.date - a.date;
            });
            setList(objects)
        }
        fetch()
    }, [])

    const renderHistoryItems = () => {
        return list.map((historyItem, index) => 
            <List.Item key={index} titleStyle={styles.title} descriptionStyle={styles.description} title={historyItem.expression} description={new Date(historyItem.date).toString()}/>
        )
    }
  
    return (
        <View>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="History" />
                <Appbar.Action icon={() =><MaterialIcons label="Clear" name="auto-delete" size={24} color="black" />} onPress={() => {clearStorage()}} />
                <Appbar.Action icon={() => <FontAwesome name="calculator" size={24} color="black" />} onPress={navigateToCalculator} />
            </Appbar.Header>
            <SafeAreaView>
                <ScrollView>
                    {renderHistoryItems()}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
})
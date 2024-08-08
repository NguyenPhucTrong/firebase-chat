import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from "expo-router";
import "../global.css"

export default function Layout() {
    return (
        <View>
            <Slot />
        </View >
    )
}

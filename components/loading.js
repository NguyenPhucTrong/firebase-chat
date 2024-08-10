import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import loading from "../assets/images/loading3.json"


export default function Loading({ size }) {
    return (
        <View style={{ height: size, aspectRatio: 1 }}>
            <LottieView style={{ flex: 1 }} source={loading} autoPlay loop />
        </View>
    )
}
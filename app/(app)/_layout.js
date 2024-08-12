import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContextProvider, useAuth } from '../../context/autContext'
import { Slot, Stack, useSegments } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';

export default function _layout() {

    return (
        <Stack className="bg-black" >
            <Stack.Screen
                name='home'
                options={{
                    header: () => <HomeHeader />
                }}
            />
        </Stack>
    )
}
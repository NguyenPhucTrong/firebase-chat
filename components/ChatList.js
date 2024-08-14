import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CharItem from './CharItem'
import { useRouter } from 'expo-router';

export default function ChatList({ users, currentUser }) {
    const router = useRouter();
    return (
        <View className="flex-1">
            <FlatList
                data={users}
                contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <CharItem
                    noBorder={index + 1 == users.length}
                    router={router}
                    item={item}
                    index={index}
                    currentUser={currentUser}
                />}
            />
        </View>
    )
}
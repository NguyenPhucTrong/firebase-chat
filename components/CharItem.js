import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import avatar from "../assets/images/react-logo.png"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { getPathFromState } from '@react-navigation/native';


export default function CharItem({ item, router, noBorder }) {

    const openChatRoom = () => {
        router.push({ pathname: "/chatRoom", params: item });
    }

    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? "" : "border-b border-b-neutral-200"} `}>
            {/* <Image
                source={{ uri: item?.profileURL }}
                style={{ height: hp(6), width: wp(12) }}
                className="rounded-full bg-slate-600"
            /> */}

            <Image
                source={{ uri: item?.profileURL }}
                style={{ height: hp(6), width: wp(12), borderRadius: 100 }}
                placeholder={blurhash}
                transition={1000}
            />

            <View className="flex-1 gap-1" >
                <View className="flex-row justify-between" >
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800"> {item?.username} </Text>
                    <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500"> Time </Text>
                </View>
                <Text style={{ fontSize: hp(1.6) }} className="font-semibold text-neutral-600"> Last message </Text>
            </View>
        </TouchableOpacity>
    )
}
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Login from '../assets/images/3805752.png';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignIn() {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const router = useRouter();

    const handlerlogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign In", "Please fill all the fields!")
            return;
        }
    }

    return (
        <View className="flex-1 ">
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image style={{ height: hp(25) }} resizeMode='contain' source={Login} />

                </View>
                <View className="gap-10">
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">
                        SignIn
                    </Text>
                    {/* input */}
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                            <Octicons name='mail' size={hp(2.7)} color="gray " />
                            <TextInput style={{ fontSize: hp(2) }} className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email address' placeholderTextColor={"gray"}
                                onChangText={value => emailRef.current = value}
                            />
                        </View>
                        <View className="gap-3">
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                                <Octicons name='lock' size={hp(2.7)} color="gray " />
                                <TextInput style={{ fontSize: hp(2) }} className="flex-1 font-semibold text-neutral-700"
                                    placeholder='Password' placeholderTextColor={"gray"}
                                    onChangText={value => passwordRef.current = value}
                                    secureTextEntry
                                />
                            </View>
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">
                                Forgot Password?
                            </Text>
                        </View>
                        {/* submit button */}
                        <TouchableOpacity onPress={handlerlogin} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                            <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                                Sign In
                            </Text>
                        </TouchableOpacity>

                        {/* sign up text */}

                        <View className=" flex-row font-semibold justify-center text-neutral-500">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
                                Don't have an account?
                            </Text>
                            <Pressable onPress={() => {
                                console.log('Button Pressed');
                                router.push('SignUp');
                            }}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500"> Sign up</Text>
                            </Pressable>


                        </View>
                    </View>


                </View>

            </View>
        </View >

    )
}
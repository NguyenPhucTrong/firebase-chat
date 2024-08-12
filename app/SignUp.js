import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Login from '../assets/images/register.png';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import { useAuth } from '../context/autContext';
import CustomKeyboardView from '../components/CustomKeyboardView';

export default function SignUp() {

    const { regiter } = useAuth();

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handlerRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
            Alert.alert("Sign Up", "Please fill all the fields!")
            return;
        }
        setLoading(true);

        let response = await regiter(emailRef.current, usernameRef.current, profileRef.current, passwordRef.current)

        setLoading(false);

        // console.log(response);

        if (!response.success) {
            Alert.alert("Sign Up", response.msg);
        }
    }

    return (
        <CustomKeyboardView>
            <StatusBar style='dark' />
            <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                <View className="items-center">
                    <Image style={{ height: hp(25) }} resizeMode='contain' source={Login} />

                </View>
                <View className="gap-10">
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">
                        Sign Up
                    </Text>
                    {/* input */}
                    <View className="gap-4">
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                            <Feather name='user' size={hp(2.7)} color="gray " />
                            <TextInput style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Username'
                                placeholderTextColor={"gray"}
                                onChangeText={value => usernameRef.current = value}
                            />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                            <Octicons name='mail' size={hp(2.7)} color="gray " />
                            <TextInput style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Email address'
                                placeholderTextColor={"gray"}
                                onChangeText={value => emailRef.current = value}
                            />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                            <Octicons name='lock' size={hp(2.7)} color="gray " />
                            <TextInput style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Password'
                                placeholderTextColor={"gray"}
                                onChangeText={value => passwordRef.current = value}
                                secureTextEntry
                            />
                        </View>
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl ">
                            <Feather name='image' size={hp(2.7)} color="gray " />
                            <TextInput style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder='Profile URL'
                                placeholderTextColor={"gray"}
                                onChangeText={value => profileRef.current = value}
                            />
                        </View>



                        {/* submit button */}

                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">

                                        <Loading size={hp(6.5)} />

                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handlerRegister} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                                        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>

                                )
                            }
                        </View>


                        {/* sign up text */}

                        <View className=" flex-row font-semibold justify-center text-neutral-500">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
                                Already have an account?
                            </Text>
                            <Pressable onPress={() => {
                                console.log('Button Pressed');
                                router.push('SignIn');
                            }}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500"> Sign In</Text>
                            </Pressable>


                        </View>
                    </View>


                </View>

            </View>
        </CustomKeyboardView >

    )
}
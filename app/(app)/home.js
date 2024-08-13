import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/autContext'
import { StatusBar } from 'expo-status-bar';
import ChatList from '../../components/ChatList';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from '../../components/loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig'; // Đảm bảo rằng bạn đang sử dụng biến đúng

export default function Home() {

    const { logout, user } = useAuth();
    const [users, setUsers] = useState([1]);

    useEffect(() => {
        if (user?.uid) {
            getUsers();
        }
    }, []);

    console.log("User ID1:", user?.uid)

    const getUsers = async () => {
        try {
            const q = query(usersRef, where("userId", "!=", user?.uid));

            const querySnapshot = await getDocs(q);
            let data = [];
            querySnapshot.forEach(doc => {
                data.push({ ...doc.data() });
            });


            console.log("Hi======", data);

            setUsers(data);
        }
        catch (error) {
            console.log("Error getting documents: ", error);
        }
    }

    const handleLogout = async () => {
        await logout();
    }

    console.log("user data", user);

    return (
        <View className="flex-1 bg-white" >
            <StatusBar style='light' />
            {
                users.length > 0 ? (
                    <ChatList users={users} />



                ) : (
                    <View className="flex items-center" style={{ top: hp(30) }} >
                        <ActivityIndicator size="large" />
                        {/* <Loading size={hp(10)} /> */}

                    </View>
                )
            }
        </View >
    )
}
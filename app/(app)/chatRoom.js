import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { StatusBar } from 'expo-status-bar';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { getRoomId } from '../../utils/common';
import { useRef } from 'react';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/autContext';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';

export default function ChatRoom() {

    const item = useLocalSearchParams();
    const { user } = useAuth();

    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef("");
    const inputRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);
        })
        return unsub;
    }, [])
    const createRoomIfNotExists = async () => {
        // roomId
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessages = async () => {
        let message = textRef.current.trim();
        if (!message) return;
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = "";
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileURL: user?.profileURL,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            console.log("newDoc", newDoc.id);

        }
        catch (err) {
            Alert.alert('Message', err.message);
        }



    }
    // console.log("messages: ", messages);
    return (
        <CustomKeyboardView inChat={true}>
            <View className="flex-1 bg-white" >
                <StatusBar style='dark' />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-200" />

                <View className="flex-1 justify-between bg-neutral-100 overflow-visible " >
                    <View className="flex-1">
                        <MessageList messages={messages} currentUser={user} />
                    </View>
                    <View style={{ marginBottom: hp(1) }} className="pt-2">
                        <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5" >
                            <TextInput
                                onChangeText={value => textRef.current = value}
                                placeholder="Type message..."
                                style={{ fontSize: hp(2) }}
                                className="flex-1 mr-2"
                            />
                            <TouchableOpacity onPress={handleSendMessages} className="bg-neutral-200 p-2 mr-[1px] rounded-full" >
                                <Feather name='send' size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}
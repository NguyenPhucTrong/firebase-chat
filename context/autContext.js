import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // console.log("User changed:", user);
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub;
    }, [])

    const updateUserData = async (userId) => {
        const docRef = doc(db, "user", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = docSnap.data()
            setUser({ ...user, username: data.username, profileURL: data.profileURL, userId: data.userId });
        } else {
            console.log("No such document!");
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            let msg = error.message
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"
            if (msg.includes("(auth/invalid-credential)")) msg = "Wrong credentials";
            return { success: false, msg }
        }
    }
    const logout = async (email, password) => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message, error: error };

        }
    }
    const regiter = async (email, username, profileURL, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response?.user);

            // setUser(response?.user);
            // setIsAuthenticated(true);
            await setDoc(doc(db, "user", response?.user?.uid), {
                username,
                profileURL,
                password,
                userId: response?.user?.uid,
            });
            return {
                success: true, data: response?.user
            }
        } catch (error) {
            let msg = error.message
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email"
            if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
            return { success: false, msg }

        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, regiter }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }

    return value;
}
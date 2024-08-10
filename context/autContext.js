import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(false);
        }, 3000)
    }, [])

    const login = async (email, password) => {
        try {

        } catch (error) {

        }
    }
    const logout = async (email, password) => {
        try {

        } catch (error) {

        }
    }
    const regiter = async (email, password, username, profileURL) => {
        try {

        } catch (error) {

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
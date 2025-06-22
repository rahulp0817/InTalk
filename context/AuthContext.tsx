import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

interface AuthContextProps {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
    isReady?: boolean;
}

const authStorageKey = "auth-key"

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    logIn: () => { },
    logOut: () => { },
    isReady: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
        try {
            const JsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, JsonValue);
        } catch (error) {
            console.error("Error storing auth state:", error);
        }
    };

    const logIn = () => {
        setIsLoggedIn(true);
        storeAuthState({ isLoggedIn: true });
        router.replace("/")
    };
    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState({ isLoggedIn: false });
        router.replace("/(auth)/sign-in")
    };

    useEffect(() => {
        const getAuthFormStorage = async () => {
            try {
                const value = await AsyncStorage.getItem(authStorageKey);
                if (value !== null) {
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                }
            } catch (error) {
                console.error("Error retrieving auth state:", error);
            }
            setIsReady(true);
        }
        getAuthFormStorage();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, isReady }}>
            {children}
        </AuthContext.Provider>
    );
}
import { deleteItemAsync, getItem, setItem } from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
    isLoggedIn: boolean;
    hasCompletedOnboarding: boolean,
    logIn: () => void;
    logOut: () => void;
    completedOnboarding: () => void;
    resetOnboarding: () => void;
}

export const useAuthStore = create(
    persist<UserState>(
        (set) => ({
            isLoggedIn: false,
            hasCompletedOnboarding: false,
            logIn: () => {
                set((state) => {
                    return ({
                        ...state,
                        isLoggedIn: true,
                    })
                })
            },
            logOut: () => {
                set((state) => {
                    return ({
                        ...state,
                        isLoggedIn: false,
                    })
                })
            },
            completedOnboarding: () => {
                set((state) => {
                    return ({
                        ...state,
                        hasCompletedOnboarding: true,
                    })
                })
            },
            resetOnboarding: () => {
                set((state) => {
                    return ({
                        ...state,
                        hasCompletedOnboarding: false
                    })
                })
            }
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => ({
                setItem,
                getItem,
                removeItem: deleteItemAsync
            }))
        }
    )
);
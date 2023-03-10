import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import toast from 'react-hot-toast';
import app from '../firebase/firebase.config';
const auth = getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Create user by Email & Password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Sign in  by Email & Password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // signin with google
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }
        // update Profile
        const handleUpdateProfile = (profile) => {
            return updateProfile(auth.currentUser, profile)
        }
    //user state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])
    // sign out 
    const logOut = () => {
        // 
        setLoading(true);
        signOut(auth).then(() => {
            toast.success('Sign-out successful.')
            localStorage.removeItem('Sweet_Home_Token');
        }).catch((error) => {
            console.log(error);
        });
    }
    const value = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        googleSignIn,
        handleUpdateProfile,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
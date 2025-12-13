import React, { useEffect, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const googlePRovider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, googlePRovider);
    }

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }

    }, [])



    const authInfo = {

        user,
        setUser,
        loading,
        setLoading,
        googleLogin,
        login,
        registerUser,
        logOut,

    };


    return <AuthContext value={authInfo}></AuthContext>
};

export default AuthProvider;
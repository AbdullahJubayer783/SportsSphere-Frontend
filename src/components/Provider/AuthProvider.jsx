import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../../firebase.init";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null)
const AuthProvider = ({children}) =>{
    const [user , setUser] = useState(null); 
  
    const createUserEmailPass = (name ,email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUserEmailPass = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signout = () => {
        return signOut(auth);
    }
    const authenticateWithGoogle=()=>{
        return signInWithPopup(auth, provider);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log("current User logged in",currentUser);
            setUser(currentUser);
        })
        return () =>{
            unsubscribe();
        }
    },[])
    


    const AuthInfo = {createUserEmailPass,signInUserEmailPass,signout,authenticateWithGoogle,user};
    return <>
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    </>
}

export default AuthProvider;
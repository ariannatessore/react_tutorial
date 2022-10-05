import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState,useEffect } from "react";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

  const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

const firebaseConfig = {
    apiKey: "AIzaSyAXhu-jj0uCjf76hfAt8rqr3yDsAozwBos",
    authDomain: "reacttutorial2-480ea.firebaseapp.com",
    projectId: "reacttutorial2-480ea",
    storageBucket: "reacttutorial2-480ea.appspot.com",
    messagingSenderId: "982524767506",
    appId: "1:982524767506:web:27ca1d3a1b0d048094d7cb",
    measurementId: "G-G92E5F9Y06"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
  };
  


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database,'/courses');
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );

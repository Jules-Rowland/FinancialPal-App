import { createContext, useEffect } from 'react';
import { useState } from 'react';
import {  onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase.js';
import App from '../App.jsx';

export const Response = createContext({user: null, setUser: () => {}});

export const FirebaseResponse =() =>{
    
const [user, setUser]  = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => 
        {setUser(user)
    });
    return unsubscribe;
}, []);


return(
    <Response.Provider value={{user, setUser}}>
<App/>
    </Response.Provider>
)
}

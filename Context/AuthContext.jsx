import axios from 'axios';
import Cryptr from 'cryptr';
import { getApp, getApps } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import userapp from '../firebase/firebase.config';
const app = !getApps().length ? initializeApp(userapp) : getApp();
export const auth = getAuth(app)
export const UserContext = createContext()



const AuthContext = ({children}) => {
    const [user,setUser] = useState({})

    //cryptr 
const cryptr = new Cryptr('myTotallySecretKey');

    // router
    const router = useRouter()

// userLoading
const [userLoading,setUserLoading] = useState(true)

// create user  
const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
// login 
const loginUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
// logout
const logOut = ()=>{
    return signOut(auth)
}
    // get user
    useEffect(()=>{
        setUserLoading(true)
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setUserLoading(false)
        })
        return ()=>{ 
            unsubscribe()
            setUserLoading(false)
        };
    },[])

    // get params
    const siteParams = router.query.siteId
 // site loading
 const [siteLoading,setSiteLoading] = useState(true)
    const siteUid = siteParams
    // get uid
    const [siteId,setSiteId] = useState({})
    useEffect(()=>{
       if(siteUid){
        setSiteLoading(false)
        axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/site?uid=${siteUid}`)
        .then(res=>{
            setSiteId(res.data)
            setSiteLoading(false)
        })
       }
    },[siteUid])
console.log(siteId)
    // get site user
    const [siteUser,setSiteUser] = useState({})

    // get email from cookie
    const cookieEmail = Cookies.get('email')

    // get user
    useEffect(()=>{
        
       if(cookieEmail){
        setUserLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/siteuser?email=${cryptr?.decrypt(cookieEmail)}`)
        .then(res=>{
            setSiteUser(res.data)
            setUserLoading(false)
        })
        .catch(err=>{
            toast.error(err.message)
            setUserLoading(false)
        })
       }
    },[cookieEmail])
    const value = {user,createUser,logOut,siteLoading,siteId,siteUser,loginUser,userLoading}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;
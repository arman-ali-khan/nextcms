import Loader from '@/components/Blog/Loader/Loader';
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
// main user loading
const [mainUserLoading,setMainUserLoading] = useState(true)

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
        setMainUserLoading(true)
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setMainUserLoading(false)
        })
        return ()=>{ 
            unsubscribe()
            setMainUserLoading(false)
        };
    },[])

    // get params
    const siteParams = router.query.siteId
 // site loading
 const [siteLoading,setSiteLoading] = useState(true)
    const siteUid = siteParams
  
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


// get router
const getSiteParams = router.query.siteId


  // get uid
  const [siteId,setSiteId] = useState({})
  useEffect(()=>{
     if(user?.email){
      setSiteLoading(false)
      axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/site?uid=${getSiteParams}`)
      .then(res=>{
          setSiteId(res.data)
          setSiteLoading(false)
      })
     }
  },[siteUid,user?.uid])





    const value = {user,createUser,logOut,siteLoading,siteId,siteUser,mainUserLoading,loginUser,userLoading}
    return (
        <UserContext.Provider value={value}>
            {mainUserLoading ? <Loader />:children}
        </UserContext.Provider>
    );
};

export default AuthContext;
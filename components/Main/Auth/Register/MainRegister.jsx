import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import passwordHash from 'password-hash';
import { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const MainRegister = () => {
    const router = useRouter();
    // context
    const { createUser, user } = useContext(UserContext);

    // error
    const [registerError, setRegisterError] = useState("");
  
    // loading
    const [loading, setLoading] = useState(false);
  
    // register btn
    const [registerBtn, setRegisterBtn] = useState("Register");
    const [showPass, setShowPass] = useState(false);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
  
    const handleRegisterUser = () => {
      setLoading(true);
      setRegisterBtn("Creating...");
      console.log(email, password);
      return createUser(email, password)
        .then((res) => {
          const user = res.user;
  
          setRegisterError("");
          const info = {
            name: "",
            email: email,
            uid: user.uid,
            siteurl: siteUrl,
            username: "",
            photo: "",
            createdAt: new Date(),
            password: passwordHash.generate(password)
          };
            axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/api/users`,info)
            .then((res) => {
              setLoading(false);
              setRegisterBtn("Account created!");
              // redirect when register
              if (user?.email) {
                router.push("/");
              }
            });
          
        })
        .catch((err) => {
          setLoading(false);
          setRegisterError(err.message);
          setRegisterBtn("Try again");
        });
    };

    // get sites 
    const [sites,setSites] = useState([])

    // loading
    const [siteLoading,setSiteLoading] = useState(false)
    useEffect(()=>{
       if(siteUrl){
        setSiteLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/getsiteurl?siteurl=${siteUrl}`)
        .then(res=>{
            setSites(res.data)
            setSiteLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setSiteLoading(false)
        })
       }
    },[siteUrl])
    console.log(sites)
    return (
        <div className="bg-white h-screen w-full flex justify-center items-center">
        <div className="border px-2 py-4 border-neutral rounded-md">
          <div className="flex flex-col space-y-2 text-black">
          <div className="relative flex flex-col">
            {/* Site url */}
          <label htmlFor="site">Site Url</label>
            <input placeholder="site_url"
              onChange={(e) => setSiteUrl(e.target.value)}
              className="input input-bordered rounded btn-sm"
              id="site"
              type="text"
            />
           <p className="absolute right-0">
             {
               siteLoading ? 'Loading':  sites.length ? <span className="text-rose-500">No</span>: <span className="text-teal-600">OK</span>
                }
                </p>
          </div>

            <label htmlFor="email">Email</label>
            {/* Email */}
            <input placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered rounded btn-sm"
              id="email"
              type="email"
            />

            <div className="w-full relative flex flex-col">

                {/* Password */}
              <label htmlFor="password">Password</label>
              <input placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered rounded btn-sm"
                id="password"
                type={`${showPass ? "text" : "password"}`}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-1 p-2 top-8"
              >
                {!showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>
            {/* Register btn */}
            <button
              disabled={!email || !password || sites.length || siteLoading }
              onClick={() => handleRegisterUser()}
              className="btn disabled:bg-gray-400 rounded btn-sm btn-neutral"
            >
              {registerBtn}
            </button>
          </div>
          <div className="text-black py-2">
            Already have an account?{" "}
            <Link className="text-neutral underline" href={"/auth/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    );
};

export default MainRegister;
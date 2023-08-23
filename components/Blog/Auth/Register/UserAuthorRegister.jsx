import { useContext } from "react";

import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import passwordHash from 'password-hash';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const UserAuthorRegister = () => {

 const router = useRouter();
  // context
  const { createUser, user,siteId } = useContext(UserContext);
  
  // error
  const [registerError, setRegisterError] = useState("");
  // redirect when register
  if (user?.email) {
    router.push("/");
  }
  // loading
  const [loading, setLoading] = useState(false);

  // register btn
  const [registerBtn, setRegisterBtn] = useState("Register");
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = () => {
       
        // const passDe = passwordHash.verify(password,'sha1$f6b537e9$1$3dd7ab941141ad877b7a8f02cd4786fc337d0337')
        // console.log(passDe)
    setLoading(true);
    setRegisterBtn("Creating...");

        setRegisterError("");
        const info = {
          email: email,
          password:passwordHash.generate(password),
          date: new Date(),
        }
          axios
            .post(`${process.env.NEXT_PUBLIC_LOCAL}/api/siteUsers`, info)
            .then((res) => {
              setLoading(false);
              setRegisterBtn("Account created!");
                  if(res.status===200){
                    console.log(res)
                    Cookies.set('email', email, { expires: 7 })
                    if(Cookies.get('email')===email){
                      router.push(`/${siteId?.uid}`)
                    }
                  }
            }).catch(err=>{
              toast.error(err.response.data.message)
              setRegisterBtn('Try Again')
            })
  };
    return (
        <div>
           <div className="h-full text-sm my-12 w-full flex justify-center items-center">
        <div className="border px-2 py-4 bg-base-200 border-neutral rounded-md">
          <div className="flex flex-col space-y-2 text-black">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
               className="px-4 py-1 border rounded border-base-100"
              id="email"
              type="email"
            />

            <div className="w-full relative flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                 className="px-4 py-1 border rounded border-base-100"
                id="password"
                type={`${showPass ? "text" : "password"}`}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-1 p-2 top-5"
              >
                {!showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>
            <button
            disabled={!email && !password}
            onClick={() => handleRegisterUser()}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            {registerBtn}
          </button>
          </div>
          <div className="text-black py-2">
            Already have an account?{" "}
            <Link className="text-neutral underline" href={"auth/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default UserAuthorRegister;







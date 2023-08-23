import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import Cryptr from 'cryptr';
import Cookies from "js-cookie";
import Link from "next/link";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const UserAuthorLogin = () => {
  // router
  const router = useRouter();
//cryptr 
const cryptr = new Cryptr('myTotallySecretKey');
  // get query
  const query = router.query.to;
  // page and next
  const page = router.query.page;
  const next = router.query.next;
  // context
  const { user, loginUser,siteId } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(false);
  
  // btn text
  const [btnText, setBtnText] = useState("Login");
  // login error
  const [loginError, setLoginError] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //
  const [siteUser, setSiteUser] = useState({});
  console.log(siteUser);
  const handleLoginUser = () => {
    console.log(email, password);
    setLoading(true);
    console.log(email, password);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_LOCAL}/api/loginuser?email=${email}&password=${password}`
      )
      .then((res) => {
        setSiteUser(res.data);
        setLoading(false);
        setLoginError("");
        setBtnText("Login Success");
        Cookies.set('email',cryptr.encrypt(res?.data?.email))
        router.push(`/${siteId?.uid}`)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
        setLoginError(err?.response?.data?.message);
        setBtnText("Try Again");
      });
  };
  return (
    <div>
      <div className=" h-full text-sm my-12 w-full flex justify-center items-center">
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
              onClick={() => handleLoginUser()}
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              {loading ? "Logging in..." : btnText}
            </button>
          </div>
          <div>
            <p className="text-error">
              {loginError === "Firebase: Error (auth/wrong-password)." &&
                "Wrong Password"}
              {loginError === "Firebase: Error (auth/user-not-found)." &&
                "Wrong Email"}
              {loginError !== "Firebase: Error (auth/wrong-password)." &&
              loginError !== "Firebase: Error (auth/user-not-found)."
                ? loginError
                : ""}
            </p>
          </div>
          <div className="text-black py-2">
            Don't have an account?{" "}
            <Link className="text-neutral underline" href={"auth/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthorLogin;

import { UserContext } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const MainLogin = () => {
      // router
  const router = useRouter();

  // get query
  const query = router.query.to;
  // page and next
  const page = router.query.page;
  const next = router.query.next;
  // context
  const { user, loginUser } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(false);
 // redirect when login
 if (user?.email) {
    router.push("/");
  }
  // btn text
  const [btnText, setBtnText] = useState("Login");
  // login error
  const [loginError, setLoginError] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = () => {
    console.log(email, password);
    setLoading(true);
    return loginUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        setLoginError("");
        setLoading(false);
        setBtnText("Successfully logged in");
        // if (user) {
        //   axios
        //     .post(`${process.env.NEXT_PUBLIC_API_PRO}/jwt`, {
        //       email: user.email,
        //     })
        //     .then((res) => {
        //       if (res.data) {
        //         Cookie.set("token", res.data.token, { expires: 7 });
        //         setLoginError("");
        //         setLoading(false);
        //         setBtnText("Successfully logged in");
        //       }
        //       // redirect when login
        //       if ((user?.email && Cookie.get("token")) || loading) {
        //         if(query){
        //           router.push(`/blog/${query}#comments`)
        //         }else if(page && next){
        //           router.push(`/${page}/${next}`)
        //         }else if(page){
        //           router.push(`/${page}`)
        //         }
        //         else{
        //           router.push("/");
        //         }
        //       }
        //     });
        // }
      })
      .catch((err) => {
        setLoading(false);
        setLoginError(err.message);
        setBtnText("Try Again");
      });
  };
    return (
        <div className="bg-white h-screen w-full flex justify-center items-center">
        <div className="border px-2 py-4 border-neutral rounded-md">
          <div className="flex flex-col space-y-2 text-black">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered rounded input-sm"
              id="email"
              type="email"
            />
            <div className="w-full relative flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered rounded input-sm"
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
            <button
              disabled={!email && !password}
              onClick={() => handleLoginUser()}
              className="btn btn-sm rounded btn-neutral"
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
            <Link className="text-neutral underline" href={"/auth/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    );
};

export default MainLogin;
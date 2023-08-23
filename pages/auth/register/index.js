import { UserContext } from "@/Context/AuthContext";
import MainLayout from "@/Layout/Main/MainLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const index = () => {
  const router = useRouter();
  // context
  const { createUser, user } = useContext(UserContext);
  console.log(user);
  // error
  const [registerError, setRegisterError] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  // register btn
  const [registerBtn, setRegisterBtn] = useState("Register");
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          username: "",
          photo: "",
          createdAt: new Date(),
        };
          axios.post(`http://localhost:5000/api/users`,info)
          .then((res) => {
            setLoading(false);
            setRegisterBtn("Account created!");
            // redirect when register
            // if (user?.email) {
            //   router.push("/");
            // }
          });
        
      })
      .catch((err) => {
        setLoading(false);
        setRegisterError(err.message);
        setRegisterBtn("Try again");
      });
  };
  return (
    <MainLayout title={"Register"}>
      <div className="bg-white h-screen w-full flex justify-center items-center">
        <div className="border px-2 py-4 border-neutral rounded-md">
          <div className="flex flex-col space-y-2 text-black">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              id="email"
              type="email"
            />

            <div className="w-full relative flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
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
              onClick={() => handleRegisterUser()}
              className="btn btn-neutral"
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
    </MainLayout>
  );
};

export default index;

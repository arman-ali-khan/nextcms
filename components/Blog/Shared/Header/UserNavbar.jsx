import { UserContext } from "@/Context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import UserAuthorHeader from "./UserAuthorHeader";

const UserNavbar = () => {
    const {user,siteId,siteUser} = useContext(UserContext)
    return (
        <div>
            {
                siteUser?.email &&  <UserAuthorHeader />
            }
           
            <div className="bg-[#eee] px-3 text-info h-12 flex justify-between w-full items-center">
            <div className="flex w-full justify-between items-center">
                {/* Logo */}
               <div className="h-10 w-44">
                <Link href={`/${siteId?.uid}`}>
               <img className="w-44 h-10" src="https://trickbd.com/wp-content/uploads/2022/01/23/logo.png" alt="" />
                </Link>
               </div>
               {/* Login Btn */}
               {
                !siteUser?.email ? 
                 <div className="text-xs flex items-center gap-2">
                    <Link className=" inline-block border border-[#ddd] p-[5px] hover:bg-base-300" href={`/${siteId?.uid}/auth/login`}>Login</Link>
                    <Link className=" inline-block border border-[#ddd] p-[5px] hover:bg-base-300" href={`/${siteId?.uid}/auth/register`}>Signup</Link>
                </div>
                :
                <p className="text-accent text-sm">Hi, {siteUser?.email}</p>
               }
               
            </div>
        </div>
        {/* Navbar */}
        <div className="bg-accent text-base-100 border-b-2 border-error">
            <div className="flex justify-between items-center">
                <ul className="flex items-center">
                    <li><Link className="hover:bg-error pb-0.5 px-2 duration-200 border-r border-[#222]" href={`/${siteId?.uid}`}>Home</Link></li>
                    <li><Link className="hover:bg-error pb-0.5 px-2 duration-200 border-r border-[#222]" href={'#'}>Notifications</Link></li>
                </ul>
                <Link className="bg-white px-2 py-0 h-5 w-5 flex justify-center items-center rounded-full text-black" href={'#'}> ৳ </Link>
            </div>
        </div>
        {/* Trainer Request Btn */}
        <div className="flex justify-center w-full bg-base-100">
            <Link className=" w-60 py-2 bg-secondary m-2 rounded-md hover:bg-opacity-90 duration-300 flex text-base-100 items-center gap-1 text-xs font-bold px-2" href={'#'}>
            Be a Trainer! <span className="font-normal"> Share your knowledge.</span>
            </Link>
        </div>
        </div>
    );
};

export default UserNavbar;
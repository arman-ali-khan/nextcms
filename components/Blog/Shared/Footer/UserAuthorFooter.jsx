import { UserContext } from "@/Context/AuthContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const UserAuthorFooter = () => {
  const {user,logOut,siteUser} = useContext(UserContext)

  // get router
  const router = useRouter()
  return (
    <div className=" px-4 bg-accent  text-base-100 text-sm py-3">
      <div className="flex justify-between w-full">
        <ul>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              About Us
            </Link>
          </li>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              Team
            </Link>
          </li>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              Terms
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              FAQ
            </Link>
          </li>
          <li>
            <Link className="pt-1 inline-block" href={"#"}>
              Copyright issues
            </Link>
          </li>
          {
            siteUser?.email && <li>
            <button className="py-1" onClick={()=>{
              Cookies.remove('email')
              router.reload()
          }} href={"#"}>Logout ({siteUser?.email})</button>
          </li>
          }
          
        </ul>
      </div>
      <div className="w-full flex justify-center py-2 items-center">
        <a href="#top" className="border inline-block text-center px-1 py-1 w-full border-base-200 text-xs">Back To Top</a>
      </div>
    </div>
  );
};

export default UserAuthorFooter;

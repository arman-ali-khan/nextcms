import { UserContext } from "@/Context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const MainNavbar = () => {
  const {logOut,user,siteId} = useContext(UserContext)
    return (
        <div>
            <div className="navbar text-black bg-base-100 border-b">
  <div className="navbar-start">
    {/* <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link href={`/${siteId.uid}`}>My Site</Link></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div> */}
    <a className="btn btn-ghost normal-case text-xl">Logo</a>
  </div>
  <div className="navbar-center  lg:flex">
    <ul className="menu menu-horizontal px-1">
    {
      user?.email ? <li><Link href={`/${user?.uid}`} target="_blank">My Site</Link></li>:''
    }
     
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?.email ? <button className="btn btn-sm" onClick={()=>logOut()}>Logout</button> 
      :
    <Link href={'/auth/login'} className="btn btn-sm">Login</Link>
    }
  </div>
</div>
        </div>
    );
};

export default MainNavbar;
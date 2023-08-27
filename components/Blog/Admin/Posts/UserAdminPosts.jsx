import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserAdminPostsCard from "./UserAdminPostsCard";

const UserAdminPosts = () => {
      // context
  const {siteId} = useContext(UserContext)
  const [popular,setPopular] = useState([])
  // get all popular post
  useEffect(()=>{
    if (siteId?.siteurl) {
    axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/popular?id=${siteId?.siteurl}`)
    .then(res=>{
      setPopular(res.data)
    })}
  },[siteId?.siteurl])
    return (
        <div>
           <div className="bg-white">
        <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
          All Posts
        </h2>
        <ul>
            { popular?.length ?
            popular?.map((post,i)=><UserAdminPostsCard post={post} key={i} />)
            :
            'No Data'
            }
        </ul>
      </div>
        </div>
    );
};

export default UserAdminPosts;
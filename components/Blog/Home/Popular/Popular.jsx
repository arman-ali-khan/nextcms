import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";


const Popular = () => {
  // context
  const {siteId} = useContext(UserContext)
  const [popular,setPopular] = useState([])
  // get all popular post
  useEffect(()=>{
    if (siteId?.uid) {
    axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/popular?id=${siteId?.uid}`)
    .then(res=>{
      setPopular(res.data)
    })}
  },[siteId?.uid])
  return (
    <div className="bg-base-100 text-black p-1">
      <div class="bg-white">
        <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
          Popular Post
        </h2>
        <ul>
            { popular?.length ?
            popular?.map((post,i)=><Card post={post} key={i} />)
            :
            'No Data'
            }
        </ul>
      </div>
    </div>
  );
};

export default Popular;

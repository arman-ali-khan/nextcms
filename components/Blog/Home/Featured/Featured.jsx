import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";

const Featured = () => {
  // conext
  const {siteId} = useContext(UserContext)
  const [featured,setFeatured] = useState({})
  // get all Featured post
  useEffect(()=>{
    if (siteId?.uid) {
    axios.get(`http://localhost:5000/api/featured?id=${siteId?.uid}`)
    .then(res=>{
      setFeatured(res.data)
    })}
  },[siteId?.uid])
  return (
    <div className="bg-base-100 text-black p-1">
      <div class="bg-white">
        <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
          Featured Post
        </h2>
        <ul>
          {
            featured ? 
            <Card post={featured} />
            :
            'No Data'
          }
        </ul>
      </div>
    </div>
  );
};

export default Featured;

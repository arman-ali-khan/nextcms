import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCartd";


const Categories = () => {
  const [categories,setCategories] = useState([])
  useEffect(()=>{
    axios.get(`https://blog-server-sparmankhan.vercel.app/category`)
    .then(res=>{
      setCategories(res.data)
    })
  },[])
  return (
    <div className="bg-base-100 text-black p-1">
      <div class="bg-white">
        <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
          Categories
        </h2>
        <ul>
          {
            categories.map((category,i)=><CategoryCard key={i} category={category} />)
          }
            
        </ul>
      </div>
    </div>
  );
};

export default Categories;

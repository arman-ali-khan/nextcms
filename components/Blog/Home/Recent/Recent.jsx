import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";

const Recent = () => {
  // context
  const { siteId } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  // get all popular post
  useEffect(() => {
    if (siteId?.uid) {
      axios
        .get(`${process.env.NEXT_PUBLIC_LOCAL}/api/posts?id=${siteId?.uid}`)
        .then((res) => {
          setPosts(res.data);
        });
    }
  }, [siteId?.uid]);
  return (
    <div>
      <div className="bg-base-100 text-black p-1">
        <div className="bg-white">
          <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
            Recent Posts
          </h2>
          <ul>
            { posts?.length ? posts.map((post, i) => (
              <Card post={post} key={i} />
            ))
            :
            'No Data'
          }
          </ul>
        </div>
      </div>
      {/* pagination */}
      <div className="bg-base-100 text-black flex justify-center gap-2 text-sm">
        <div className="flex gap-2 text-info text-sm ">
          <span className="px-2 bg-white flex justify-center items-center text-black border border-gray-400">
            1 of 13,022
          </span>
          {[...Array(5).keys()].map((item, i) => (
            <button key={i} className="px-2 border-gray-400 border hover:border-black duration-200 bg-white">
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex items-center text-info gap-2">
          <button className="py-1 px-2 bg-white hover:border-black duration-200 border border-gray-400">
            »
          </button>
          <button className="py-1 px-2 bg-white hover:border-black duration-200 border border-gray-400">
            »»
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recent;

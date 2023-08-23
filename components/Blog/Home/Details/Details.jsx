import { UserContext } from "@/Context/AuthContext";
import parse from "html-react-parser";
import moment from "moment";
import Link from "next/link";

import { useContext } from "react";
import Comments from "./Comments";

const Details = ({ blog }) => {
  const { user , siteId} = useContext(UserContext);
const categories = JSON.parse(blog.categories)
  return (
    <div className="p-1">
      <div>
        <div>
          {/* Title */}
          <div className="gap-1 space-x-1 text-sm p-1 px-2 bg-white">
            <Link className="text-info" href={`/${siteId?.uid}`}>
              Home
            </Link>
            <span>»</span>
            <Link
              className="text-info"
              href={`/${siteId?.uid}/category/${categories[0].value}`}
            >
              {" "}
              {categories[0].label}
            </Link>
            <span>»</span>
            <p className="inline">{blog?.title}</p>
          </div>
          {/* Body */}
          <div className="bg-base-100 text-black p-1">
            <div className="bg-white">
              <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">
                {blog.title}
              </h2>
              <div className="p-1">{parse(JSON.parse(blog.body))}</div>
              <h2 className="w-full text-sm bg-[#f5f5f5] border-b border-[#ddd] py-4 text-black p-2">
              <time dateTime={blog.date} suppressHydrationWarning />
                {moment(blog.date).fromNow()} ({moment(blog.date).format("LL")})
              </h2>
            </div>
          </div>
          {/* Report btn */}
          <div className="flex items-center gap-1 px-2 my-2">
            <button className="px-4 bg-blue-600 text-white text-xs py-2.5 rounded-sm">
              Like
            </button>
            <button className="px-4 bg-rose-600 text-white text-xs py-2.5 rounded-sm">
              Report
            </button>
          </div>
          {/* About Author */}
          <div className="bg-white my-2">
            <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-accent p-2 text-sm">
              About Author (6)
            </h2>
            <div className="text-sm flex gap-2">
              <div className="w-20 h-16 p-0.5 border border-base-100">
                <img
                  className="w-full h-full"
                  src="https://secure.gravatar.com/avatar/ec9f69da9c03137a62a7ef11eadb5aeb?s=64&d=wavatar&r=g"
                  alt=""
                />
              </div>
              <div className="w-full">
                <Link className="font-bold text-info" href={"#"}>
                  Arman Khan
                </Link>
                <p className="text-xs">Admin</p>
                <p>Need any support related trickbd. Sent mail </p>
              </div>
            </div>
          </div>
          {/* Comments and replay */}
        <Comments blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default Details;

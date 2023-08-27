import { UserContext } from "@/Context/AuthContext";
import moment from "moment";
import Link from "next/link";
import { useContext } from "react";

const UserAdminPostsCard = ({post}) => {
    const {user,siteId} = useContext(UserContext)
    return (
        <li className="p-1 border-b">
        <div className="flex gap-2">
          <div className="w-20 h-16 border-2 border-base-300">
            <img
              className="border-2 object-cover h-16 w-20 border-base-200"
              src={post?.featured_image}
            />
          </div>

          <div className="leading-5 w-full text-sm">
            <Link
             className="text-info hover:underline "
             href={`/${siteId?.siteurl}/blog/${post?.id}`}
           >
              {post?.title}
            </Link>
            <div className="flex flex-col">
              <p>
                {moment(post?.date).calendar()} {' '}
                <Link
                  className="text-info hover:underline "
                  href={`/${siteId?.siteurl}/blog/${post?.id}/#comments`}
                >
                  0 Comments
                </Link>
              </p>
              <div className="post-views post-751138 entry-meta">
                <span className="post-views-count">View: {post?.view}</span>
              </div>
              {/* Action */}
              <div className="flex items-center gap-2 font-bold">
                <Link className="text-blue-600 hover:underline" href={`#`}>
                    Edit
                </Link>
                <Link className="text-cyan-600 hover:underline" href={`#`}>
                    Unpublish
                </Link>
                <Link className="text-rose-600 hover:underline" href={`#`}>
                    Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
};

export default UserAdminPostsCard;
import { UserContext } from "@/Context/AuthContext";
import moment from "moment";
import Link from "next/link";
import { useContext } from "react";

const Card = ({post}) => {
    const {user,siteId} = useContext(UserContext)
    return (
        <li className="p-1 border-b">
        <div className="flex gap-2">
          <div className="w-16 h-16 border-2 border-base-300">
            <img
              className="border-2 object-cover h-16 w-16 border-base-200"
              src={post?.featured_image}
            />
          </div>

          <div className="leading-5 text-sm">
            <Link
             className="text-info hover:underline "
             href={`${siteId?.uid}/blog/${post?.id}`}
           >
              {post?.title}
            </Link>
            <div className="flex flex-col">
              <p>
                {moment(post?.date).calendar()} {' '}
                <Link
                  className="text-info hover:underline "
                  href={`${siteId?.uid}/blog/${post?.id}/#comments`}
                >
                  0 Comments
                </Link>
              </p>
              <div class="post-views post-751138 entry-meta">
                <span class="post-views-count">{post?.view}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
};

export default Card;
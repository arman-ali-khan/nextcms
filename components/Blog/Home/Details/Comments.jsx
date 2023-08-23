import { UserContext } from "@/Context/AuthContext";
import moment from "moment";
import Link from "next/link";
import { useContext } from "react";

const Comments = ({blog}) => {

    // get user context
    const {siteUser} = useContext(UserContext)
    return (
        <div className="bg-white">
        <h2 className="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-accent p-2 text-sm">
          0 Responses to "{blog.title}"
        </h2>
        <div className="flex gap-1 border-b">
          <div className="w-10 h-10 p-0.5 border border-base-100">
            <img
              className="w-full h-full"
              src="https://secure.gravatar.com/avatar/ec9f69da9c03137a62a7ef11eadb5aeb?s=64&d=wavatar&r=g"
              alt=""
            />
          </div>
          <div className="w-full">
            <Link href={"#"} className="text-info text-sm font-bold">
              Arman Khan
            </Link>{' '}
            (<span className="text-sm font-bold">Admin</span>)
            <p className="text-xs flex justify-end w-full float-right text-gray-500">
              <span>{moment(blog.data).format("LLLL")}</span>
            </p>
            <div className="text-sm leading-4 w-full">
              <p className="p-1">
               If you want to push your changes to GitHub, you first need to create a new repository on GitHub. Once you have done that, you can push your changes to GitHub using the following command:
              </p>
              {
                siteUser?.email ? <div className="px-3 border py-1 float-right text-xs bg-base-100">Replay</div>: <div className="px-3 border py-1 float-right text-xs bg-base-100">Login to Replay</div>
              }
              
            </div>
          </div>
        </div>
        {/* Replay */}
        <div className="ml-4 border">
        <div className="flex gap-1 border-b">
          <div className="w-10 h-10 p-0.5 border border-base-100">
            <img
              className="w-full h-full"
              src="https://secure.gravatar.com/avatar/ec9f69da9c03137a62a7ef11eadb5aeb?s=64&d=wavatar&r=g"
              alt=""
            />
          </div>
          <div className="w-full">
            <Link href={"#"} className="text-info text-sm font-bold">
              Arman Khan
            </Link>{' '}
            (<span className="text-sm font-bold">Admin</span>)
            <p className="text-xs flex justify-end w-full float-right text-gray-500">
              <span>{moment(blog.data).format("LLLL")}</span>
            </p>
            <div className="text-sm leading-4 w-full">
              <p className="p-1">
               If you want to push your changes to GitHub, you first need to create a new repository on GitHub. Once you have done that, you can push your changes to GitHub using the following command:
              </p>
              
            </div>
          </div>
        </div>
        <div className="flex gap-1 border-b">
          <div className="w-10 h-10 p-0.5 border border-base-100">
            <img
              className="w-full h-full"
              src="https://secure.gravatar.com/avatar/ec9f69da9c03137a62a7ef11eadb5aeb?s=64&d=wavatar&r=g"
              alt=""
            />
          </div>
          <div className="w-full">
            <Link href={"#"} className="text-info text-sm font-bold">
              Arman Khan
            </Link>{' '}
            (<span className="text-sm font-bold">Admin</span>)
            <p className="text-xs flex justify-end w-full float-right text-gray-500">
              <span>{moment(blog.data).format("LLLL")}</span>
            </p>
            <div className="text-sm leading-4 w-full">
              <p className="p-1">
               If you want to push your changes to GitHub, you first need to create a new repository on GitHub. Once you have done that, you can push your changes to GitHub using the following command:
              </p>
              
            </div>
          </div>
        </div>
        </div>
      </div>
    );
};

export default Comments;
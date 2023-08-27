import { UserContext } from "@/Context/AuthContext";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

const UserAdminLayout = ({ children, title }) => {
  const { siteId } = useContext(UserContext);
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div>
          <ul className="flex flex-wrap">
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/posts`}>
                Posts
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/users`}>
                Users
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/categories`}>
                Categories
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/pages`}>
                Pages
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/posts`}>
                Points
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/withdraw`}>
                Widthdraw
              </Link>
            </li>
            <li>
              <Link className="px-4 py-1 bg-white border flex" href={`/${siteId.siteurl}/admin/settings`}>
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserAdminLayout;

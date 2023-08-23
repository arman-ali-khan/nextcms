import UserAuthorFooter from "@/components/Blog/Shared/Footer/UserAuthorFooter";
import UserNavbar from "@/components/Blog/Shared/Header/UserNavbar";
import Head from "next/head";

const UserLayout = ({children,title,desc,thumb}) => {
    return (
        <div className="container m-auto">
            <Head>
        <title>{title}</title>
        <meta name="description" content={desc} key="desc" />
        <meta property="og:title" content={desc} />
        <meta
          property="og:description"
          content={desc}
        />
        <meta
          property="og:image"
          content={thumb}
        />
      </Head>
            <div>
              <UserNavbar/>
              {children}
              <UserAuthorFooter />
            </div>
        </div>
    );
};

export default UserLayout;
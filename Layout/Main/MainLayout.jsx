import { UserContext } from "@/Context/AuthContext";
import MainNavbar from "@/components/Main/Shared/MainNavbar";
import Head from "next/head";
import { useContext } from "react";

const MainLayout = ({children,title,desc,thumb}) => {
  const { userLoading,siteUser,siteId } = useContext(UserContext);
    return (
        <div>
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
  <MainNavbar />
        {children}
    </div>
    );
};

export default MainLayout;
import MainNavbar from "@/components/Main/Shared/MainNavbar";
import Head from "next/head";

const MainLayout = ({children,title,desc,thumb}) => {
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
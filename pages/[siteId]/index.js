import { UserContext } from "@/Context/AuthContext";
import UserLayout from "@/Layout/User/UserLayout";
import Categories from "@/components/Blog/Categories/Categories";
import Featured from "@/components/Blog/Home/Featured/Featured";
import Popular from "@/components/Blog/Home/Popular/Popular";
import Recent from "@/components/Blog/Home/Recent/Recent";
import Loader from "@/components/Loader/Loader";
import { useContext } from "react";

const blogID = () => {
  const { userLoading, siteUser } = useContext(UserContext);
  return (
    <UserLayout title={"Home"}>
      
        <>
          {userLoading ? (
            <Loader />
          ) : (
            <>
              <Featured />
              <Popular />
              <Recent />
              <Categories />
            </>
          )}
        </>
      
    </UserLayout>
  );
};

export default blogID;

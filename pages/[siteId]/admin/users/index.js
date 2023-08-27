import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminUsers from "@/components/Blog/Admin/Users/UserAdminUsers";

const index = () => {
    return (
        <UserLayout>
        <UserAdminLayout title={"Admin Posts"}>
         <UserAdminUsers />
        </UserAdminLayout>
      </UserLayout>
    );
};

export default index;
import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminSettings from "@/components/Blog/Admin/Settings/UserAdminSettings";

const index = () => {
  return (
    <UserLayout>
      <UserAdminLayout title={"Admin Posts"}>
        <UserAdminSettings />
        </UserAdminLayout>
    </UserLayout>
  );
};

export default index;

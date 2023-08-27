import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminDashboard from "@/components/Blog/Admin/Dashboard/UserAdminDashboard";

const index = () => {
  return (
    <UserLayout>
      <UserAdminLayout title={"Admin Dashboard"}>
        <UserAdminDashboard />
      </UserAdminLayout>
    </UserLayout>
  );
};

export default index;

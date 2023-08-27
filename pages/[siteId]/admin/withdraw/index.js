import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminWithdraw from "@/components/Blog/Admin/Withdraw/UserAdminWithdraw";

const index = () => {
  return (
    <UserLayout>
      <UserAdminLayout title={"Admin Posts"}>
        <UserAdminWithdraw />
      </UserAdminLayout>
    </UserLayout>
  );
};

export default index;

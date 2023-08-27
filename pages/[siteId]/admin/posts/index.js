import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminPosts from "@/components/Blog/Admin/Posts/UserAdminPosts";

const index = () => {
  return (
    <UserLayout>
      <UserAdminLayout title={"Admin Posts"}>
        <UserAdminPosts />
      </UserAdminLayout>
    </UserLayout>
  );
};

export default index;

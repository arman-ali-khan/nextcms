import UserAdminLayout from "@/Layout/User/UserAdminLayout";
import UserLayout from "@/Layout/User/UserLayout";
import UserAdminCategories from "@/components/Blog/Admin/Categories/UserAdminCategories";
function index() {
  return (
    <UserLayout>
      <UserAdminLayout title={"Admin Categories"}>
        <UserAdminCategories />
      </UserAdminLayout>
    </UserLayout>
  );
}

export default index;

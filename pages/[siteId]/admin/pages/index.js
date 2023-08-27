import UserAdminLayout from '@/Layout/User/UserAdminLayout';
import UserLayout from '@/Layout/User/UserLayout';
import UserAdminPages from '@/components/Blog/Admin/Pages/UserAdminPages';

const index = () => {
    return (
        <UserLayout>
        <UserAdminLayout title={"Pages"}>
          <UserAdminPages />
        </UserAdminLayout>
      </UserLayout>
    );
};

export default index;
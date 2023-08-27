import UserAdminLayout from '@/Layout/User/UserAdminLayout';
import UserLayout from '@/Layout/User/UserLayout';
import UserAdminPoints from '@/components/Blog/Admin/Points/UserAdminPoints';

const index = () => {
    return (
        <UserLayout>
      <UserAdminLayout title={"Points"}>
        <UserAdminPoints />
      </UserAdminLayout>
    </UserLayout>
    );
};

export default index;
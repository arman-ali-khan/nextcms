import UserLayout from "@/Layout/User/UserLayout";
import UserAuthorLogin from "@/components/Blog/Auth/Login/UserAuthorLogin";

const login = () => {
    return (
        <UserLayout title={'Login'}>
            <UserAuthorLogin />
        </UserLayout>
    );
};

export default login;
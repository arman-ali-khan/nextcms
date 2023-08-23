import UserLayout from "@/Layout/User/UserLayout";
import UserAuthorRegister from "@/components/Blog/Auth/Register/UserAuthorRegister";

const register = () => {
    return (
        <UserLayout title={'Register'}>
            <UserAuthorRegister />
        </UserLayout>
    );
};

export default register;
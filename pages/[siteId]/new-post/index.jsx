import UserLayout from "@/Layout/User/UserLayout";
import UserAuthorNewPost from "@/components/Blog/Author/UserAuthorNewPost";

const newPost = () => {
    return (
        <UserLayout title={'Create New Post'}>
           <UserAuthorNewPost />
        </UserLayout>
    );
};

export default newPost;
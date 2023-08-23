import UserLayout from '@/Layout/User/UserLayout';
import Details from '@/components/Blog/Home/Details/Details';
import { useRouter } from 'next/router';


const blogId = ({data,params}) => {
  console.log(params,'params')
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
    return (
        <UserLayout title={data.title} thumb={data.thumb}>
       <Details blog={data} />
        </UserLayout>
    );
};

export async function getServerSideProps({ params }) {
  const { blogId,siteId } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/api/post?id=${siteId}&postId=${blogId}`);
  const data = await response.json();
  
  return {
    props: {
      data,params
    },
  };
}
export default blogId;
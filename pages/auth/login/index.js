
import MainLayout from "@/Layout/Main/MainLayout";
import MainLogin from "@/components/Main/Auth/Login/MainLogin";


const index = () => {

  return (
    <MainLayout title={"Login"}>
     <MainLogin />
    </MainLayout>
  );
};

export default index;

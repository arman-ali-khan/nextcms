import MainLayout from "@/Layout/Main/MainLayout";
import MainRegister from "@/components/Main/Auth/Register/MainRegister";


const index = () => {
 
  return (
    <MainLayout title={"Register"}>
      <MainRegister />
    </MainLayout>
  );
};

export default index;

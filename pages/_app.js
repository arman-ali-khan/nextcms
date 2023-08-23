import AuthContext from "@/Context/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <AuthContext>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </AuthContext>
  );
}

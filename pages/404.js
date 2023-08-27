import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Error404() {
    const router = useRouter()
    // get uid from url
    const siteParams = router.asPath.split('/')[1]
  const [siteId,setSiteId] = useState({})
  console.log(siteParams)
  // siteloading
  const [siteLoading,setSiteLoading] = useState(true)
  useEffect(()=>{
     if(siteParams){
      setSiteLoading(true)
      axios.get(`${process.env.NEXT_PUBLIC_LOCAL}/api/site?uid=${siteParams}`)
      .then(res=>{
          setSiteId(res.data)
          setSiteLoading(false)
      })
     }
  },[siteParams])
  return (
      <section className="bg-base-100">
       <Head>
       <title>404 Page Not Found</title>
       </Head>
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            <img
              className="w-full max-w-lg lg:mx-auto"
              src="https://merakiui.com/images/components/illustration.svg"
              alt=""
            />
          </div>
          <div className="wf-ull lg:w-1/2">
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, the page you are looking for doesn't exist.Here are some
              helpful links:
            </p>
          {
            siteLoading ? 'Loading...'
            :
             <Link href={`/${siteId?.siteurl}`}>
              <div className="flex items-center mt-6 gap-x-3">
                {" "}
                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  Take me home
                </button>
              </div>
            </Link>
          }
           
          </div>
        </div>
      </section>
  );
}

export default Error404;

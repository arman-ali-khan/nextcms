
import dynamic from "next/dynamic";

import { UserContext } from "@/Context/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loader from "../Loader/Loader";
const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
  <Loader />
  </div>,
});
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];


const UserAuthorNewPost = () => {

  // context
  const { user, dbUser,userLoading,siteUser, logOut,siteId } = useContext(UserContext);

  // router
  const router = useRouter();

  // React Select

  const animatedComponents = makeAnimated();
  // categories
  // category update
  const [updateCat, setUpdateCat] = useState(false);
  // Category
  const [categories, setCategories] = useState([]);
  // Category load from db
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`https://blog-server-sparmankhan.vercel.app/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, [updateCat]);

  // categories end
  // post body
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // handle featured image

  // Photo upload
  const [featuredImage, setFeaturedImage] = useState("");

  // Uploading...
  const [uploadLoad, setUploadPhoto] = useState(false);
  // photo upload error
  const [error, setError] = useState("");

    // confirm
    const [unsavedChanges,useUnsavedChange] = useState(false) 

  // handle upload
  const handlePhotoUpload = (data) => {
    const photo = data;

    if (photo.size > 2097152) {
      return toast.error("Too Large File, Max Upload Limit 2 MB");
    }
    setUploadPhoto(true);
    const photoData = new FormData();
    photoData.append("file", photo);
    photoData.append("upload_preset", "simpleblog");
    photoData.append("cloud_name", "dl1cxduy0");
    fetch("https://api.cloudinary.com/v1_1/dl1cxduy0/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((resp) => resp.json())
      .then((photoData) => {
        const photoUrl = photoData.secure_url;
        setFeaturedImage(photoUrl);
        setUploadPhoto(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // handle featured image end

  // publish btn
  const [publishBtn, setPublishBtn] = useState("Publish");

  // post title
  const [postTitle, setPostTitle] = useState("");

  // posting
  const [postLoading, setPostLoading] = useState(false);

  // get desc

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }


 
// date
const now = new Date();
const isoString = now.toISOString();


// create post
  const handlePost = () => {
    setPostLoading(true);
    setPublishBtn("Publishing...");
    const postData = {
      title: postTitle,
      body: JSON.stringify(content),
      categories: JSON.stringify(categories),
      description: removeTags(content),
      featured_image: featuredImage,
      date: isoString,
      email: siteUser.email,
      username: siteUser.username,
      view: 0,
      createdAt: isoString,
      tags: postTitle.split(' ').join(','),
      siteId: siteId.uid,
      publish:1,
      aproved:1
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_LOCAL}/api/posts`, postData)
      .then((res) => {
        setPostLoading(false);
        useUnsavedChange(false)
        setPublishBtn("Published");
        // router.push(`/user/${dbUser.username}`);
      })
      .catch((err) => {
        setPublishBtn("Try Again");
        setPostLoading(false);
        if (err.response?.status === 401) {
          logOut().then(() => {
            router.push(`/start/login`);
          });
        }
      });
  };


  // chenge body
const handleChengeBody = () =>{
  useUnsavedChange(true)
}

// page leave warning


const warningText =
  'You have unsaved changes - are you sure you wish to leave this page?'

useEffect(() => {
  const handleWindowClose = (e) => {
    if (!unsavedChanges) return
    e.preventDefault()
    return (e.returnValue = warningText)
  }
  const handleBrowseAway = () => {
    if (!unsavedChanges) return
    if (window.confirm(warningText)) return
    router.events.emit('routeChangeError')
    throw 'routeChange aborted.'
  }
  window.addEventListener('beforeunload', handleWindowClose)
  router.events.on('routeChangeStart', handleBrowseAway)
  return () => {
    window.removeEventListener('beforeunload', handleWindowClose)
    router.events.off('routeChangeStart', handleBrowseAway)
  }
}, [unsavedChanges])

  // error handling

  var reactListDiv = typeof document !== 'undefined' && document.querySelector('.list');

if (reactListDiv) {
    reactListDiv.remove();
}

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className="md:flex bg-base-100 text-black gap-6 container mx-auto">
        <div className="md:w-2/3 space-y-2">
          {/* Post title */}
          <div>
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Title</p>
            </div>
            <input
              onChange={(e) => setPostTitle(e.target.value)}
              onChangeCapture={()=>handleChengeBody()}
              type="text"
              placeholder="Post Title"
              className="px-4 border py-2 w-full rounded"
            />
          </div>
          <div>
            {/* Post body */}
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Body</p>
            </div>

            <QuillNoSSRWrapper
      modules={modules}
      formats={formats}
      theme="snow"
      onChange={setContent}
      value={content}
    />
            
          </div>
        </div>
        <div className="md:w-1/3  space-y-2">
          {/* categories */}
          <div className="border bg-white">
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Categories</p>
            </div>
            {category.length > 0 ? (
              <Select
                className="p-3  bg-transparent text-black"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                onChange={(e) => setCategories(e)}
                onChangeCapture={()=>handleChengeBody()}
                options={category}
              />
            ) : (
              <div className="flex justify-center">
                <button
                  className="bg-base-200 px-4 py-2"
                  onClick={() => setUpdateCat(!updateCat)}
                >
                  Reload Category
                </button>
              </div>
            )}
          </div>
          {/* Featured Image */}
          <div className="bg-white border">
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Featured Image</p>
            </div>
            <div className="relative">
              {}
              {featuredImage?.length === 0 ? (
                uploadLoad ? (
                  <span className="py-32 flex justify-center relative">
                    Uploading...{" "}
                    <button
                      onClick={() => setUploadPhoto(false)}
                      className="absolute right-1 top-1 bg-error rounded-full px-4 py-2"
                    >
                      X
                    </button>
                  </span>
                ) : (
                  <span className="underline text-blue-500 flex items-center justify-center">
                    <label htmlFor="image" className="py-32 px-[23%] relative">
                      <input
                        hidden
                        id="image"
                        onChange={(e) => handlePhotoUpload(e.target.files[0])}
                        type="file"
                        className=""
                      />
                      Click to upload
                    </label>
                  </span>
                )
              ) : (
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover p-4"
                    src={featuredImage}
                    alt=""
                  />
                  <button
                    onClick={() => setFeaturedImage("")}
                    className="absolute right-1 top-1 bg-error rounded-full px-4 py-2"
                  >
                    X
                  </button>
                </div>
              )}
              <span>{error}</span>
            </div>
          </div>
          {/* Action */}
          <div className="bg-white border">
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Publish</p>
            </div>
            <div className="px-2 py-1">
              <h3 className="font-bold">Post Publish Policy</h3>
              <ul className="mx-6">
                <li className="list-decimal">
                  পোষ্ট এর সাথে সম্পুর্কযুক্ত ক্যাটাগরী/ফিচারড ইমেজ/ট্যাগ
                  ব্যবহার করুন
                </li>
                <li className="list-decimal">কপিপেষ্ট পরিহার করুন।</li>
                {/* <li className="list-decimal">কেউ কপিপেষ্ট করেছে এমন প্রমান পেলে সাথে সাথে ট্রেইনার থেকে তাকে বাতিল করা হবে</li> */}
                <li className="list-decimal">
                  পোষ্ট এর একেবারে শেষ ছাড়া কোথাও পোষ্ট দাতার সাইট লিংক থাকতে
                  পারবে না
                </li>
                <li className="list-decimal">
                  এপ/গেম এর রিভিও দিলে এপ/গেম ডাওনলোড এর ডাইরেক্ট লিংক দিতে হবে
                  এবং বিস্তারিত পোষ্ট+স্ক্রিনশট দিতে হবে
                </li>
              </ul>
            </div>
            <div className="flex justify-end px-4 py-2">
              <button
                onClick={() => handlePost()}
                disabled={
                  postTitle.length < 30 ||
                  categories.length === 0 ||
                  featuredImage.length === 0 ||
                  content.length < 300
                }
                className="px-4 hover:bg-opacity-80 py-2 bg-neutral text-white disabled:bg-indigo-100 disabled:cursor-not-allowed"
              >
                {publishBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserAuthorNewPost;
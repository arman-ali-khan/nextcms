import Link from "next/link";

const UserAdminCategories = () => {
    return (
        <div>
           <div className="bg-white my-2">
           <h2 class="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">Categories</h2>
           {/* Body */}
           <div>
            <div className="flex flex-col text-sm my-2">
                <label htmlFor="label" className="px-4 py-1">Category label</label>
                <input className="py-2 px-3 mx-3 border border-gray-400 my-3 rounded" placeholder="Android Tips" type="text" id="label" />
            </div>
            <div className="flex justify-center py-2">
               <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded">Create</button>
            </div>
           </div>
           <div>
           <h2 class="w-full py-1 bg-[#f5f5f5] border-b border-[#ddd] font-bold text-black p-2">Categories</h2>
           {/* All Categories */}
           <div>
            <ul>
                <li className="w-full border-b flex items-center gap-1 pl-3">›<Link className="pr-2 flex items-center py-1 text-sm text-info visited:text-indigo-700  hover:underline" href={'#'}>Android Tips</Link>
               <div className="flex items-center gap-2">
                 <Link className="hover:underline text-teal-600 font-bold" href={'#'}>Edit</Link>
                <Link className="hover:underline text-rose-600 font-bold" href={'#'}>Delete</Link>
               </div>
                </li>
                <li className="w-full border-b flex items-center gap-1 pl-3">›<Link className="pr-2 flex items-center py-1 text-sm text-info visited:text-indigo-700  hover:underline" href={'#'}>Android Tips</Link>
               <div className="flex items-center gap-2">
                 <Link className="hover:underline text-teal-600 font-bold" href={'#'}>Edit</Link>
                <Link className="hover:underline text-rose-600 font-bold" href={'#'}>Delete</Link>
               </div>
                </li>
                <li className="w-full border-b flex items-center gap-1 pl-3">›<Link className="pr-2 flex items-center py-1 text-sm text-info visited:text-indigo-700  hover:underline" href={'#'}>Android Tips</Link>
               <div className="flex items-center gap-2">
                 <Link className="hover:underline text-teal-600 font-bold" href={'#'}>Edit</Link>
                <Link className="hover:underline text-rose-600 font-bold" href={'#'}>Delete</Link>
               </div>
                </li>
                <li className="w-full border-b flex items-center gap-1 pl-3">›<Link className="pr-2 flex items-center py-1 text-sm text-info visited:text-indigo-700  hover:underline" href={'#'}>Android Tips</Link>
               <div className="flex items-center gap-2">
                 <Link className="hover:underline text-teal-600 font-bold" href={'#'}>Edit</Link>
                <Link className="hover:underline text-rose-600 font-bold" href={'#'}>Delete</Link>
               </div>
                </li>
                <li className="w-full border-b flex items-center gap-1 pl-3">›<Link className="pr-2 flex items-center py-1 text-sm text-info visited:text-indigo-700  hover:underline" href={'#'}>Android Tips</Link>
               <div className="flex items-center gap-2">
                 <Link className="hover:underline text-teal-600 font-bold" href={'#'}>Edit</Link>
                <Link className="hover:underline text-rose-600 font-bold" href={'#'}>Delete</Link>
               </div>
                </li>
            </ul>
           </div>
           </div>
           </div>
        </div>
    );
};

export default UserAdminCategories;
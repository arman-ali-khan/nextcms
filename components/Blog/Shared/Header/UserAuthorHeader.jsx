import { UserContext } from '@/Context/AuthContext';
import Link from 'next/link';
import { useContext } from 'react';

const UserAuthorHeader = () => {
    const {user,siteId} = useContext(UserContext)
    return (
        <div className='container m-auto bg-accent text-white px-2'>
            <div>
                <ul className='flex items-center'>
                    <li className='w-full flex justify-center text-center'>
                        <Link className='py-1 inline-block w-full hover:bg-black' href={`/${siteId?.siteurl}/dashboard`}>Dashboard</Link>
                    </li>
                    <li className='w-full flex justify-center text-center'>
                        <Link className='py-1 inline-block w-full hover:bg-black' href={`/${siteId?.siteurl}/profile`}>Profile</Link>
                    </li>
                    <li className='w-full flex justify-center text-center'>
                        <Link className='py-1 inline-block w-full hover:bg-black' href={`/${siteId?.siteurl}/new-post`}>New Post</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserAuthorHeader;
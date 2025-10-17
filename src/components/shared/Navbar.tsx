
import React from 'react';
import OutlineButton from './OutlineButton';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LogOutButton from '../features/login/LogOutButton';


const Navbar =  async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;


    return (
        <nav className="bg-[#EFF1F3] h-20 ">
            <div className='container mx-auto p-4  flex justify-between items-center'>
                <div className="text-lg sm:text-xl font-semibold text-[#0D1821]">
                    <a href="/">MyLogo</a>
                </div>


                {
                    token ? (
                        <LogOutButton />
                    ) : (
                        <Link href="/login">
                            <OutlineButton className=' !px-6' >Log In</OutlineButton>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;
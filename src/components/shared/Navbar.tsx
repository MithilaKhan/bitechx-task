import React from 'react';
import OutlineButton from './OutlineButton';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-[#EFF1F3] h-20 ">
            <div className='container mx-auto p-4  flex justify-between items-center'>
                <div className="text-lg sm:text-xl font-semibold text-gray-800">
                    <a href="/">MyLogo</a>
                </div>

                <Link href="/login">
                    <OutlineButton className=' !px-6' >Log In</OutlineButton>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
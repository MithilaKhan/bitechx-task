"use client";
import OutlineButton from '@/components/shared/OutlineButton';
import React from 'react'; 
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LogOutButton = () => { 
    const token = Cookies.get("accessToken"); 
    const router = useRouter();
    const handleLogOut = () => {
        Cookies.remove("accessToken");
        router.push("/login");
    } 

    return (

        <OutlineButton className="!px-6" onClick={handleLogOut} >
            Log Out
        </OutlineButton>

    );
};

export default LogOutButton;
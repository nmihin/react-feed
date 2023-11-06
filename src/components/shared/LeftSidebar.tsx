import React from 'react'
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";


const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { mutate: signOut, isSuccess } = useSignOutAccount();

    useEffect(() => {
    if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <nav className="leftsidebar">
            <div className='flex flex-col gap-11'>
            <Link to="/" className="flex items-center gap-3">
            <img
                src="/assets/images/logo.svg"
                alt="logo"
                width={170}
                height={36}
            />
            </Link>
            <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
                <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" className="w-8 h-8 rounded-full" />
                <div className='flex flex-col'>
                    <p className='body-bold'>
                        {user.name}
                    </p>
                    <p className='small-regular text-light-3'>
                        {user.username}
                    </p>
                </div>
            </Link>
            </div>
        </nav>
    )
}

export default LeftSidebar

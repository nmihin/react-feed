import React from 'react'
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';


const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const { pathname } = useLocation();

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
            <ul className="flex flex-col gap-6">
                {sidebarLinks.map((link: INavLink) => {
                    const isActive = pathname === link.route;

                    return (
                    <li
                        key={link.label}
                        className={`leftsidebar-link group ${
                        isActive && "bg-primary-500"
                        }`}>
                        <NavLink
                        to={link.route}
                        className="flex items-center gap-4 p-4">
                        <img
                            src={link.imgURL}
                            alt={link.label}
                            className={`group-hover:invert-white ${
                            isActive && "invert-white"
                            }`}
                        />
                        {link.label}
                        </NavLink>
                    </li>
                    );
                })}
                </ul>
            </div>
        </nav>
    )
}

export default LeftSidebar

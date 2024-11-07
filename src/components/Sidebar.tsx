"use client";
import React, { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import { RxHome, RxEnvelopeOpen } from 'react-icons/rx';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedin, FaRegChartBar } from "react-icons/fa";

import NavLink from './Navlink';
import useMediaQuery from '../lib/media-query';
import Contact from '../pages/contact';
const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false });

const Sidebar = ({ children }: { children: ReactNode }) => {

    const { theme } = useTheme();
    const [iconColor, setIconColor] = useState('black');

    const size = useMediaQuery('(min-width: 640px)') ? 20 : 15;

    useEffect(() => {
        setIconColor(theme === 'lightTheme' ? 'green' : 'darkgreen');
    }, [theme]);
    return (
        <div className='lg:flex md:flex sm:block'>
            <div className='lg:w-20 lg:h-screen lg:flex-col lg:border-r-[5px] lg:fixed
                            md:w-20 md:h-screen md:flex-col md:border-r-[5px] md:fixed
                            sm:h-20 sm:w-full sm:border-b-[5px] sm:sticky sm:top-0 sm:flex-row sm:items-center 
                            p-1 bg-background overflow-x-auto z-50 flex border-border'>

                <NavLink href="/" ><RxHome size={size} color={iconColor} /></NavLink >
                <NavLink href="https://www.linkedin.com/in/jordan-thijssen-373a431a5/" ><FaLinkedin size={size} color={iconColor} /></NavLink >
                <NavLink href="/dash" ><FaRegChartBar size={size} color={iconColor} /> </NavLink >
                <NavLink href="/contact" ><RxEnvelopeOpen size={size} color={iconColor} /> </NavLink >
                <NavLink href="https://github.com/JordanTPhysics" ><FiGithub size={size} color={iconColor} /> </NavLink >
            </div>
            <main className='lg:ml-20 md:ml-20 w-screen lg:w-full h-full'>
                <header className='bg-background-secondary items-center text-center flex flex-col'>
                    <div>
                        <h1 className='lg:text-3xl text-xl text-text font-bold'> - Thijssen Data Services - </h1>
                        <h3 className='text-lg text-text font-semibold'></h3>
                    </div>
                    <ThemeSwitcher />

                </header>
                {children}
                <footer className='bg-secondary text-text text-center p-3'>
                    <Contact />   
                </footer>
            </main>
        </div>
    );
};

export default Sidebar;
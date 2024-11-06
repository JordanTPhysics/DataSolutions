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

const linkClassName = 'bg-secondary border-2 border-border text-text m-3 p-3 rounded-lg inline-block hover:ml-0 hover:mr-0 hover:bg-foreground smooth';

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
                <div className="bg-secondary text-text m-3 p-3 border-2 border-icon-border rounded-lg inline-block hover:ml-0 hover:mr-0 hover:bg-foreground smooth">
                    <ThemeSwitcher />
                </div>
                <NavLink href="/" ><RxHome size={size} color={iconColor} /></NavLink >
                <NavLink href="https://www.linkedin.com/in/jordan-thijssen-373a431a5/" ><FaLinkedin size={size} color={iconColor} /></NavLink >
                <NavLink href="/dash" ><FaRegChartBar size={size} color={iconColor} /> </NavLink >
                <NavLink href="/contact" ><RxEnvelopeOpen size={size} color={iconColor} /> </NavLink >
                <NavLink href="https://github.com/JordanTPhysics/Dashboarding" ><FiGithub size={size} color={iconColor} /> </NavLink >
            </div>
            <main className='lg:ml-20 md:ml-20 w-screen lg:w-full h-full'>
                <header className='bg-secondary items-center text-center'>
                    <div>
                        <h1 className='text-3xl text-text font-bold'> - Jordan Thijssen </h1>
                        <h1 className='text-3xl text-text font-bold'> Data Explorer - </h1>
                        <h3 className='text-lg text-text font-semibold'></h3>
                    </div>

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
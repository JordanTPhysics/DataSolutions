import React, { useState } from 'react';

import Link from 'next/link';

import { RiStackLine, RiRobot2Line } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";
import { LuAreaChart } from "react-icons/lu";
import { PiMagnifyingGlassPlusDuotone, PiWrench } from "react-icons/pi";
import { BsLightningCharge } from "react-icons/bs";
import { GoDatabase } from "react-icons/go";
import { SlPeople } from "react-icons/sl";
import { HiOutlineCursorClick } from "react-icons/hi";
import { IoTelescopeOutline } from "react-icons/io5";

import useMediaQuery from '../lib/media-query';
import { useSession } from '../lib/SessionContext';
import { JourneyStep, UserJourney } from '../lib/UserJourney';

const skills: string[] = [
  "Customer Segmentation",
  "Journey Tracking",
  "TimeSeries Forecast",
  "Machine Learning",
  "Dashboard Development",
  "Analytics and Insight",
  "Process Automation",
  "Data Pipeline",
  "API Development",
  "Database Management",
  "FullStack Development",
];

const renderLink = (text: string, size: number, handleRouteChange: (e: React.MouseEvent<HTMLAnchorElement>) => void) => {
  switch (text) {
    case "Journey Tracking":
      return (
        <Link href="/services/journey" onClick={handleRouteChange}>
          <HiOutlineCursorClick size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "FullStack Development":
      return (
        <Link href="/services/fullstack" onClick={handleRouteChange} >
          <RiStackLine size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "Machine Learning":
      return (
        <Link href="/services/ml" onClick={handleRouteChange}>
          <BiNetworkChart size={size} className='mx-auto' />{text}
        </Link>
      );
    case "Dashboard Development":
      return (
        <Link href="/services/dashboard" onClick={handleRouteChange}>
          <LuAreaChart size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "Analytics and Insight":
      return (
        <Link href="/services/analytics" onClick={handleRouteChange}>
          <PiMagnifyingGlassPlusDuotone size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "Process Automation":
      return (
        <Link href="/services/automation" onClick={handleRouteChange}>
          <RiRobot2Line size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "Data Pipeline":
      return (
        <Link href="/services/pipeline" onClick={handleRouteChange}>
          <PiWrench size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "API Development":
      return (
        <Link href="/services/api" onClick={handleRouteChange}>
          <BsLightningCharge size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "Database Management":
      return (
        <Link href="/services/db" onClick={handleRouteChange}>
          <GoDatabase size={size} className='mx-auto' /> {text}
        </Link>
      );

    case "Customer Segmentation":
      return (
        <Link href="/services/segmentation" onClick={handleRouteChange}>
          <SlPeople size={size} className='mx-auto' /> {text}
        </Link>
      );
    case "TimeSeries Forecast":
      return (
        <Link href="/services/forecast" onClick={handleRouteChange}>
          <IoTelescopeOutline size={size} className='mx-auto' /> {text}
        </Link>
      );

    default:
      return <Link href="/services/">{text}</Link>;

  }
}

const Carousel = () => {
  const extendedItems = [...skills, ...skills];

  const { addJourneyStep, userJourney } = useSession();
  const handleRouteChange = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const step: JourneyStep = {
      timestamp: Date.now(),
      pageUrl: window.location.href,
      action: "link",
      elementId: e.currentTarget.href,
    };
    addJourneyStep(step, userJourney);
  }

  const size = useMediaQuery('(min-width: 640px)') ? 20 : 15;

  return (
    <div className="font-sans relative w-full overflow-hidden group bg-slate-800 border-y-2 border-y-gray-100 ">
      <div
        className={`flex animate-scroll group-hover:animate-scroll-paused text-text relative`}
        style={{
          width: `${extendedItems.length * 18}rem`
        }}
      >
        {extendedItems.map((item, index) => (
          <div
            key={index}
            className=" flex-shrink-0 px-8 py-2 flex items-center justify-center bg-slate-800/30 text-lg lg:text-2xl  hover:scale-95 hover:text-slate-800 hover:bg-text transition ease-in-out 3s"
          >
            {renderLink(item, size, handleRouteChange)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

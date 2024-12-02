import React, { useState } from "react";
import useMediaQuery from "../lib/media-query";

import { GiBroadsword } from "react-icons/gi";
import { TbZoomMoney } from "react-icons/tb";
import { RiSpeakLine } from "react-icons/ri";
import { PiStrategy } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiLightbulbLine } from "react-icons/ri";
import { LuSigmaSquare } from "react-icons/lu";
import { PiNumberSquareSix } from "react-icons/pi";
import { MdiSigmaLower } from "../components/icons/Sigma";

const Prompts = () => {
    const size = useMediaQuery('(min-width: 768px)') ? 75 : 45;

    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    }
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    }
  return (
    <>
          <ul className="text-left flex flex-col justify-evenly text-lg lg:text-3xl italic font-serif">
            <li className="flex flex-row p-4"><GiBroadsword size={size} color="silver" className="mr-auto mx-4 swipe text-[24px] md:text-[48px] lg:text-[64px]" /> <span className="px-4 my-auto">Slash Operational Costs</span></li>
            <li className="flex flex-row p-4"><TbZoomMoney size={size} color="goldenrod" className="mr-auto mx-4 flip" /> <span className="px-4 my-auto">Identify Saving Opportunities</span></li>
            <li className="flex flex-row p-4"><RiSpeakLine size={size} className="mr-auto mx-4 swell" color="brown" /> <span className="px-4 my-auto">Track Customer Engagement</span></li>
            <li className="flex flex-row p-4 "><PiStrategy size={size} className="mr-auto mx-4 shift" color="teal" /> <span className="px-4 my-auto">Strategize Marketing</span></li>
            <li className="flex flex-row p-4 relative">
              <div className="twist mr-auto mx-4">
                <div className="icon-container">
                  <LuSigmaSquare size={size} color="indigo" className="default-icon" />
                  <PiNumberSquareSix size={size} className="twisted-x hidden-icon" color="turquoise" />
                  <MdiSigmaLower width={size} height={size} className="twisted-y hidden-icon" color="orange" />
                </div>
              </div>

              <span className="px-4 my-auto">Implement Six Sigma</span>
            </li>
            <li className="flex flex-row p-4 ">
              <div
                className="swell mr-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isHovered ? <HiOutlineLightBulb size={size} className="mr-auto mx-4" color="yellow" /> :
                  <RiLightbulbLine size={size} className="mr-auto mx-4" color="gray" />}
              </div>
              <span className="px-4 my-auto">Improve Data Literacy</span></li>
          </ul>
    </>
  )
}

export default Prompts;
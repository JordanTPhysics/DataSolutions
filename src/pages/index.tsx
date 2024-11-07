import React, { useState } from "react";
import Link from "next/link";

import Carousel from "../components/Carousel";

const skills: string[] = [
  "Customer Segmentation",
  "FullStack Development",
  "Machine Learning",
  "Dashboard Development",
  "Analytics and Insight",
  "Process Automation",
  "Data Pipelining",
  "API Development",
];

const Home = () => {
  return (
    <div className="bg-background lg:h-screen md:h-screen h-full text-text align-middle items-center text-center lg:p-20">
            <Carousel items={skills} />
        </div>
  );
};

export default Home;

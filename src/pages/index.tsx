import React, { useState } from "react";
import Link from "next/link";



import Carousel from "../components/Carousel";

import { useSession } from "../lib/SessionContext";
import { JourneyStep } from "../lib/UserJourney";
import Prompts from "../components/Prompts";

const Home = () => {

  const { addJourneyStep, userJourney } = useSession();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    const step: JourneyStep = {
      timestamp: Date.now(),
      pageUrl: window.location.pathname === "/" ? "home" : window.location.pathname,
      action: "click",
      elementId: "contact-link",
    };
    addJourneyStep(step, userJourney);
  }

  return (
    <>
      <Carousel />
      <div className=" bg-gradient-to-t from-background to-slate-800 h-full text-text flex flex-col align-middle items-center text-center">
        <section id="main" className="flex flex-col items-center text-center">
          <h3 className="lg:text-2xl text-lg p-4 m-4 lg:max-w-[50vw] border-b-2 border-border">A Data Analytics consulting agency dedicated to fulfil your business needs. We see value in your data where you don&apos;t. Safely navigate your dense <span className="font-bold">jungle</span>  of data to <span className="font-bold">explore</span> new opportunities and <span className="font-bold">drop</span> issues preventing growth.<br /><br />
            <Link href="" className="hover:underline font-bold text-red-600" onClick={handleContactClick}>Hire Now</Link>{"   "}
            to discover how we can help... </h3>
        </section>

        <section id="attributes" className="flex flex-col items-center text-center my-4 overflow-visible border-b-2 border-border">
          <Prompts />
        </section>

        <section id="business" className="w-1/2  border-b-2 border-border my-4">
          <h2 className="text-2xl lg:text-5xl p-4 border-b-2 border-border m-4">Why Choose Pathfinder?</h2>
          <span className="lg:text-xl text-md p-4 my-2">
            Our experts are passionate about data science, analytics, AI integration.
            We love supporting small and medium enterprise (SME) with the latest technologies.
            We specifically target small businesses as the backbone of our economy, enriching communities and preserving cash flow and jobs in local areas.
          </span>
          <br />
          <br />
          <span className="lg:text-xl text-md p-4 my-2">
            SMEs already face tight margins,
            tough decision making, constant catchup with regulations,
            the list goes on. What&apos;s the point in incurring extra costs by investing in Data?
            While there are upfront costs, the benefits of data-driven decision making will save thousands in the long run.
            You could hire a large agency, likely to be forgotten in place of their large clients... <br />We will work directly with you to build <span className="text-red-600"> your bespoke solution.</span>
          </span>
          <br />
          <br />
          <span className="lg:text-xl text-md p-4 my-2">
            91.9% of organizations achieved measurable value from their data analytics in 2023 out of those that implemented data strategy.
            Despite that, only 20-25% of data is used for business decisions, and less than 50% of all businesses collect and use the data that they have!
            Our mission is to help <span className="text-red-600">you</span> put that untapped resource to good use.
            If large corporations can benefit from their data, why can&apos;t you? They spend millions on high grade tech, logistics, optimizations and marketing strategy.
            Yet, SMEs still dominate the GDP and the workforce, not to mention quality of service! Imagine if even 10% of SMEs started using their data effectively... 
          </span>
          <br />
          <br />
          <span className="lg:text-xl text-md p-4 my-2">
            Still not convinced your business needs data analytics? Since you&apos;re 4 paragraphs in, I don&apos;t believe you. but feel free to fill in the form to tell us why.
          </span>

        </section>
        {/* <section id="projects">
          <h2 className="text-2xl lg:text-5xl">Testimonials</h2>

        </section> */}
      </div>
    </>
  );
};

export default Home;

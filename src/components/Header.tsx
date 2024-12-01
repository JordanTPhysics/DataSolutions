import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useSession } from '../lib/SessionContext';

const Header = () => {
  const [backgroundImage, setBackgroundImage] = useState('/images/placeholder.png');

  const { userJourney, addJourneyStep } = useSession();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const step = {
      timestamp: Date.now(),
      pageUrl: window.location.pathname === '/' ? 'home' : window.location.pathname,
      action: 'click',
      elementId: 'header-link',
    };
    addJourneyStep(step, userJourney);
  };

  useEffect(() => {
    const highResImage = new Image();
    highResImage.src = '/images/background.jpg';
    highResImage.onload = () => {
      setBackgroundImage('/images/background.jpg');
    };
  }, []);

  return (
    <header
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="items-center text-center flex flex-col p-4 m-0 header"
    >
      <div className='lg:flex lg:flex-row text-text font-serif justify-between
      '>
        <Link onClick={handleLinkClick} href="/" className='skew-x-6 text-lg mx-auto lg:px-4 px-12 hover:bg-slate-800 rounded-r-md transition-all duration-300 ease-in-out link-border'>Home</Link>
        <Link onClick={handleLinkClick} href="/blog" className='skew-x-6 text-lg mx-auto lg:px-4 px-12 hover:bg-slate-800 rounded-r-md transition-all duration-300 ease-in-out link-border' >Blog</Link>
        <h1 className='lg:text-3xl text-xl text-text font-sans link-border rounded-md hover:bg-slate-800 mx-4 px-12 transition-all duration-300 ease-in-out'><Link onClick={handleLinkClick} href="/"> - Pathfinder Data Solutions - </Link></h1>
        <Link onClick={handleLinkClick} href="/tracker" className='-skew-x-6 text-lg mx-auto lg:px-4 px-12 hover:bg-slate-800 rounded-l-md transition-all duration-300 ease-in-out link-border' >Tracker</Link>
        <Link onClick={handleLinkClick} href="/cases" className='-skew-x-6 text-lg mx-auto lg:px-4 px-12 hover:bg-slate-800 rounded-l-md transition-all duration-300 ease-in-out link-border' >Case Studies</Link>
      </div>
    </header>
  );
};

export default Header;

import Link from 'next/link';
import Image from 'next/image';

import { RiNextjsLine, RiReactjsLine, RiTailwindCssLine } from 'react-icons/ri';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import useMediaQuery from '../lib/media-query';
import Contact from './Contact';
import { JourneyStep } from '../lib/UserJourney';
import { useSession } from '../lib/SessionContext';

export default function Footer() {

  const { userJourney, addJourneyStep } = useSession();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const step = new JourneyStep("home", "link", e.currentTarget.href);
    addJourneyStep(step, userJourney);
  }

  const size = useMediaQuery('(min-width: 640px)') ? 45 : 25;
  const iconColor = 'rgba(var(--text))';

  return <footer className='bg-gradient-to-b from-background-secondary to-soil border-t-8 border-border text-text text-center pt-2'>
    <h3 className='text-xl lg:text-2xl'>Reach out <span className='italic'>Today</span> to book a free 30 minute consultation. Discover how we take your business to the <span className="text-red-600">Next Level</span></h3>
    <Contact />
    <div className='flex flex-row justify-evenly'>
      <div className='mx-auto'>
        Built using NextJS and Tailwind CSS
        <div className='flex flex-row'>
          <Link href='https://nextjs.org/' className='mx-auto' onClick={handleLinkClick} target='_blank'><RiNextjsLine size={size} color="black" /></Link>
          <Link href='https://tailwindcss.com/' className='mx-auto' onClick={handleLinkClick} target='_blank'><RiTailwindCssLine size={size} color="turquoise" /></Link>
        </div>
      </div>
      <div className='mx-auto'>© 2025 Pathfinder Data Solutions
        <div className='flex flex-row'>
          <Link href='https://www.linkedin.com/company/pathfinderdatasolution' className='mx-auto' onClick={handleLinkClick} target='_blank'><FaLinkedin size={size} color="teal" /></Link>
          <Link href='https://github.com/JordanTPhysics/DataSolutions' className='mx-auto' onClick={handleLinkClick} target='_blank'><FaGithub size={size} color={iconColor} /></Link>

          <Link href='/policy/khushu' className='mx-auto' onClick={handleLinkClick}><Image className='rounded-lg' src="/images/khushu.png" width={50} height={50} alt='Khushu logo'></Image></Link>
          <Link href='/policy' className='mx-auto' onClick={handleLinkClick}><Image className='rounded-lg' src="/favicon.ico" width={50} height={50} alt='Pathfinder logo'></Image></Link>
        </div>
      </div>
      <div className='mx-auto'>
        Icons from React Icons
        <div className='flex flex-row'>
          <Link href='https://react-icons.github.io/react-icons/' className='mx-auto' onClick={handleLinkClick} target='_blank'><RiReactjsLine size={size} color="orange" /></Link>
        </div>
      </div>

    </div>
  </footer>;
}
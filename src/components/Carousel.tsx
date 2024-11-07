// components/Carousel.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: string[]; // Modify the type here to fit your items (string, image URL, etc.)
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="overflow-hidden w-full relative" ref={carouselRef}>
      <div
        className="flex transition-transform duration-1000 ease w-[200%]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="min-w-full box-sizing">
            {item}
          </div>
        ))}
        {/* Duplicate items to enable smooth infinite scroll */}
        {items.map((item, index) => (
          <div key={`${index}-duplicate`} className={styles.carouselItem}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

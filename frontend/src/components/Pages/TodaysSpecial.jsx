import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import cappuccino from '../../assets/TSimg/cappuccino.webp';
import lemonade from '../../assets/TSimg/lemonade.webp';
import pasta_primavera from '../../assets/TSimg/pasta_primavera.webp';
import espresso from '../../assets/TSimg/espresso.webp';
import mango_smoothie from '../../assets/TSimg/mango_smoothie.webp';
import cheese_sandwich from '../../assets/TSimg/cheese_sandwich.webp';
import latte from '../../assets/TSimg/latte.webp';
import iced_tea from '../../assets/TSimg/iced_tea.webp';
import caesar_salad from '../../assets/TSimg/caesar_salad.webp';

// Sample data for today's specials
const todaysSpecials = [
  {
    name: 'Espresso',
    description: 'Rich and bold coffee shot.',
    originalPrice: '$3.00',
    offerPrice: '$2.50',
    image: espresso,
  },
  {
    name: 'Cappuccino',
    description: 'Creamy coffee with frothy milk.',
    originalPrice: '$3.50',
    offerPrice: '$3.00',
    image: cappuccino,
  },
  {
    name: 'Latte',
    description: 'Smooth coffee with steamed milk.',
    originalPrice: '$4.00',
    offerPrice: '$3.50',
    image: latte,
  },
  {
    name: 'Mango Smoothie',
    description: 'Refreshing mango blend.',
    originalPrice: '$4.50',
    offerPrice: '$4.00',
    image: mango_smoothie,
  },
  {
    name: 'Lemonade',
    description: 'Zesty and chilled lemonade.',
    originalPrice: '$2.50',
    offerPrice: '$2.00',
    image: lemonade,
  },
  {
    name: 'Iced Tea',
    description: 'Cool iced tea with lemon.',
    originalPrice: '$2.00',
    offerPrice: '$1.50',
    image: iced_tea,
  },
  {
    name: 'Cheese Sandwich',
    description: 'Toasted sandwich with cheese.',
    originalPrice: '$3.50',
    offerPrice: '$3.00',
    image: cheese_sandwich,
  },
  {
    name: 'Pasta Primavera',
    description: 'Veggies and pasta in a light sauce.',
    originalPrice: '$5.50',
    offerPrice: '$5.00',
    image: pasta_primavera,
  },
  {
    name: 'Caesar Salad',
    description: 'Crispy salad with Caesar dressing.',
    originalPrice: '$5.00',
    offerPrice: '$4.50',
    image: caesar_salad,
  },
];

const infiniteSpecials = todaysSpecials;

const SpecialCard = ({ special, index, onMouseEnter, onMouseLeave }) => (
  <div
    className={` ${index % 2 === 0 ? 'bg-pink-100 dark:bg-amber-900' : 'bg-teal-100 dark:bg-amber-500'} p-4 rounded-lg shadow-lg max-w-xs text-center transition-transform duration-300 ease-in-out transform hover:scale-105 mx-2`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img
      src={special.image}
      alt={special.name}
      className="w-full h-48 rounded-lg mb-4 object-cover"
    />
    <h3 className="text-left font-semibold text-lg text-gray-800">
      {special.name}
    </h3>
    <p className="text-left mb-4 text-gray-600">{special.description}</p>
    <div
      className={`flex items-center justify-end gap-2 mt-2 transition-opacity duration-300 ease-in-out`}
    >
      <p className="text-md font-semibold text-gray-500 line-through">
        {special.originalPrice}
      </p>
      <p className="text-xl font-bold text-red-600">{special.offerPrice}</p>
    </div>
  </div>
);

const TodaysSpecial = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real special
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track hover
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 641px)' });

  const specialsWidth = isSmallScreen ? 100 : 100 / 3;

  const nextSpecial = useCallback(() => {
    if (!isHovered) {
      // Only change if not hovering
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (prevIndex === infiniteSpecials.length - 2) {
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(1);
          }, 500);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }
  }, [isHovered]);

  const prevSpecial = useCallback(() => {
    if (!isHovered) {
      // Only change if not hovering
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 1) {
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(infiniteSpecials.length - 2);
          }, 500);
          return prevIndex;
        }
        return prevIndex - 1;
      });
    }
  }, [isHovered]);

  useEffect(() => {
    const timer = setInterval(nextSpecial, 4000);
    return () => clearInterval(timer);
  }, [nextSpecial]);

  // Mouse event handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="p-8 rounded-lg shadow-md max-w-5xl mx-auto overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-9 dark:text-gray-50">
          Today's Specials
        </h2>
        <div className="relative mt-5">
          <div className="overflow-visible">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${!isTransitioning ? 'transition-none' : ''}`}
              style={{
                transform: `translateX(-${(currentIndex - 1) * specialsWidth}%)`,
              }}
            >
              {infiniteSpecials.map((special, index) => (
                <div
                  key={index}
                  className={`w-full ${isSmallScreen ? 'flex-shrink-0' : 'sm:w-1/3 flex-shrink-0'} px-2`}
                >
                  <SpecialCard
                    special={special}
                    index={index}
                    onMouseEnter={handleMouseEnter} // Pass mouse event handlers
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Conditional rendering for previous button */}
          {currentIndex > 1 && (
            <button
              onClick={prevSpecial}
              className="absolute top-1/2 -left-4 ml-1 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}

          {/* Conditional rendering for next button */}
          {currentIndex < infiniteSpecials.length - 2 && (
            <button
              onClick={nextSpecial}
              className="absolute top-1/2 -right-4 mr-1 bg-white rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:shadow-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex justify-center mt-8">
          {infiniteSpecials
            .slice(
              1,
              isLargeScreen
                ? infiniteSpecials.length - 1
                : infiniteSpecials.length
            )
            .map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index + 1)}
                className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index + 1 ? 'bg-red-600' : 'bg-gray-400'}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecial;

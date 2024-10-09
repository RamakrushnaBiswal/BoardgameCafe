import React, { useState, useEffect } from 'react';
import cappuccino from '../../assets/TSimg/cappuccino.webp';
import lemonade from '../../assets/TSimg/lemonade.webp';
import pasta_primavera from '../../assets/TSimg/pasta_primavera.webp';
import espresso from '../../assets/TSimg/espresso.webp';
import mango_smoothie from '../../assets/TSimg/mango_smoothie.webp';
import cheese_sandwich from '../../assets/TSimg/cheese_sandwich.webp';
import latte from '../../assets/TSimg/latte.webp';
import iced_tea from '../../assets/TSimg/iced_tea.webp';
import caesar_salad from '../../assets/TSimg/caesar_salad.webp';

const menuItems = {
  coffee: [
    { name: "Espresso", description: "Rich and bold coffee shot.", image: espresso, originalPrice: "$3.00", offerPrice: "$2.50" },
    { name: "Cappuccino", description: "Creamy coffee with frothy milk.", image: cappuccino, originalPrice: "$3.50", offerPrice: "$3.00" },
    { name: "Latte", description: "Smooth coffee with steamed milk.", image: latte, originalPrice: "$4.00", offerPrice: "$3.50" },
  ],
  drinks: [
    { name: "Mango Smoothie", description: "Refreshing mango blend.", image: mango_smoothie, originalPrice: "$4.50", offerPrice: "$4.00" },
    { name: "Lemonade", description: "Zesty and chilled lemonade.", image: lemonade, originalPrice: "$2.50", offerPrice: "$2.00" },
    { name: "Iced Tea", description: "Cool iced tea with lemon.", image: iced_tea, originalPrice: "$2.00", offerPrice: "$1.50" },
  ],
  food: [
    { name: "Cheese Sandwich", description: "Toasted sandwich with cheese.", image: cheese_sandwich, originalPrice: "$3.50", offerPrice: "$3.00" },
    { name: "Pasta Primavera", description: "Veggies and pasta in a light sauce.", image: pasta_primavera, originalPrice: "$5.50", offerPrice: "$5.00" },
    { name: "Caesar Salad", description: "Crispy salad with Caesar dressing.", image: caesar_salad, originalPrice: "$5.00", offerPrice: "$4.50" },
  ],
};

const TodaysSpecial = () => {
  const [todaysSpecial, setTodaysSpecial] = useState({ coffee: {}, drink: {}, food: {} });
  const [hoveredItem, setHoveredItem] = useState(null); // State to track the hovered item

  // Function to update today's special (cycling through 3 items)
  const updateTodaysSpecial = () => {
    const today = new Date();
    const dayIndex = today.getDay(); // Get the day of the week (0-6)
    const cycleIndex = dayIndex % 3; // Cycle through 3 items every 3 days

    setTodaysSpecial({
      coffee: menuItems.coffee[cycleIndex],
      drink: menuItems.drinks[cycleIndex],
      food: menuItems.food[cycleIndex],
    });
  };

  useEffect(() => {
    updateTodaysSpecial();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-5xl font-bold text-center mb-9">Today's Special</h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-8 space-y-8 md:space-y-0 md:space-x-4">
        {/* Coffee Card */}
        <div
          className="bg-pink-100 p-4 rounded-lg shadow-lg max-w-xs text-center transition-transform duration-300 ease-in-out transform hover:scale-105 mx-2"
          style={{ minHeight: '300px' }} // Ensure a minimum height for the card
          onMouseEnter={() => setHoveredItem('coffee')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img className="w-64 h-48 object-cover object-center rounded-md mb-4" src={todaysSpecial.coffee.image} alt={todaysSpecial.coffee.name} />
          <h3 className="text-xl font-semibold">{todaysSpecial.coffee.name}</h3>
          <p className="text-gray-600">{todaysSpecial.coffee.description}</p>
          {/* Show prices below the image and description */}
          {hoveredItem === 'coffee' && (
            <div className="mt-4">
              <p className="text-lg font-bold text-red-700 line-through">{todaysSpecial.coffee.originalPrice}</p>
              <p className="text-xl font-bold text-red-500">{todaysSpecial.coffee.offerPrice}</p>
            </div>
          )}
        </div>

        {/* Food Card */}
        <div
          className="bg-teal-100 p-4 rounded-lg shadow-lg max-w-xs text-center transition-transform duration-300 ease-in-out transform hover:scale-105 mx-2"
          style={{ minHeight: '300px' }} // Ensure a minimum height for the card
          onMouseEnter={() => setHoveredItem('food')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img className="w-64 h-48 object-cover object-center rounded-md mb-4" src={todaysSpecial.food.image} alt={todaysSpecial.food.name} />
          <h3 className="text-xl font-semibold">{todaysSpecial.food.name}</h3>
          <p className="text-gray-600">{todaysSpecial.food.description}</p>
          {/* Show prices below the image and description */}
          {hoveredItem === 'food' && (
            <div className="mt-4">
              <p className="text-lg font-bold text-red-700 line-through">{todaysSpecial.food.originalPrice}</p>
              <p className="text-xl font-bold text-red-500">{todaysSpecial.food.offerPrice}</p>
            </div>
          )}
        </div>

        {/* Drink Card */}
        <div
          className="bg-pink-100 p-4 rounded-lg shadow-lg max-w-xs text-center transition-transform duration-300 ease-in-out transform hover:scale-105 mx-2"
          style={{ minHeight: '300px' }} // Ensure a minimum height for the card
          onMouseEnter={() => setHoveredItem('drink')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img className="w-64 h-48 object-cover object-center rounded-md mb-4" src={todaysSpecial.drink.image} alt={todaysSpecial.drink.name} />
          <h3 className="text-xl font-semibold">{todaysSpecial.drink.name}</h3>
          <p className="text-gray-600">{todaysSpecial.drink.description}</p>
          {/* Show prices below the image and description */}
          {hoveredItem === 'drink' && (
            <div className="mt-4">
              <p className="text-lg font-bold text-red-700 line-through">{todaysSpecial.drink.originalPrice}</p>
              <p className="text-xl font-bold text-red-500">{todaysSpecial.drink.offerPrice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodaysSpecial;

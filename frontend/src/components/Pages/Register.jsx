/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import pic from '../../assets/img/abt1.jpg';
import pic2 from '../../assets/img/abt1.png';
import pic3 from '../../assets/img/abt2.png';
import pic4 from '../../assets/img/abt3.png';
import pic5 from '../../assets/img/abt4.png';
import MainHOC from '../MainHOC';
import { message } from 'antd';

function Register() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState();
  const [minDate, setMinDate] = useState('');

  const handleSubmit = (e) => {
    console.log(guests);
    console.log(time);
    console.log(date);
    // console.log(import.meta.env.VITE_BACKEND_URL);
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservation/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guests,
        date,
        time,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleDateValidation = () => {
    if (date.length === 10 && date < minDate) {
      // Reset to today's date if the selected date is invalid
      setDate(minDate);
      message.warning('You cannot select a date before today.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  return (
    <>
      <div className="w-full mx-auto mt-10 lg:mt-0 md:mt-0 dark:bg-gray-900 dark:text-white min-h-screen">
        {/* Hero Section with Enhanced Gradient Background */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 flex flex-col md:flex-row bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 dark:bg-amber-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-60 h-60 bg-red-200 dark:bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 text-center w-full md:w-2/5 md:mt-10 relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight mb-6">
              RESERVE YOUR SPOT AT THE BOARD GAME CAFE
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the perfect blend of strategy, fun, and delicious treats in our cozy gaming atmosphere
            </p>
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              <span>Make a Reservation</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
          
          <div className="w-full md:w-3/5 mt-6 md:mt-0 p-4 md:p-0 relative z-10">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <img
                src={pic}
                alt="Board Game Cafe"
                loading="lazy"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </section>

        {/* Enhanced Reservation Form Section with Advanced Hover Effects */}
        <section className="w-full py-16 md:py-24 lg:py-32 px-6 md:px-6 bg-gradient-to-b from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="w-full md:w-3/5 lg:w-2/5 mx-auto relative group">
            {/* Enhanced Glassmorphism Card Effect with Hover Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-600/20 dark:to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl group-hover:scale-110 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-8 rounded-2xl shadow-2xl hover:shadow-3xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-amber-300/40 dark:hover:border-amber-500/40 transition-all duration-500 hover:scale-[1.02]">
              <div className="space-y-8">
                {/* Header with Enhanced Hover Effects */}
                <div className="text-center group/header">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4 group-hover/header:from-amber-700 group-hover/header:to-red-600 transition-all duration-300">
                    Reserve Your Spot
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6 group-hover/header:w-32 group-hover/header:h-1.5 group-hover/header:from-amber-600 group-hover/header:to-red-600 transition-all duration-500"></div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 group-hover/header:text-gray-700 dark:group-hover/header:text-gray-200 transition-colors duration-300">
                    Fill out the form below to secure your reservation at our board game cafe.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Enhanced Guests Field */}
                    <div className="space-y-2 group/field">
                      <label
                        className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 group-hover/field:text-amber-600 dark:group-hover/field:text-amber-400 transition-colors duration-300"
                        htmlFor="guests"
                      >
                        <svg className="w-4 h-4 group-hover/field:scale-110 group-hover/field:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Number of Guests
                      </label>
                      <div className="relative">
                        <select
                          id="guests"
                          onChange={(e) => {
                            setGuests(e.target.value);
                          }}
                          className="w-full px-4 py-3 text-gray-700 dark:text-white bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-700/80 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-amber-900/20 hover:scale-[1.02] cursor-pointer"
                        >
                          <option value="">Select number of guests</option>
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5 Guests</option>
                          <option value="6">6 Guests</option>
                        </select>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 hover:from-amber-400/5 hover:via-orange-400/5 hover:to-red-400/5 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Enhanced Date Field */}
                    <div className="space-y-2 group/field">
                      <label
                        className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 group-hover/field:text-amber-600 dark:group-hover/field:text-amber-400 transition-colors duration-300"
                        htmlFor="date"
                      >
                        <svg className="w-4 h-4 group-hover/field:scale-110 group-hover/field:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="date"
                          min={minDate}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          onBlur={handleDateValidation}
                          className="w-full px-4 py-3 text-gray-700 dark:text-white bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-700/80 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-amber-900/20 hover:scale-[1.02] cursor-pointer"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 hover:from-amber-400/5 hover:via-orange-400/5 hover:to-red-400/5 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Time Field */}
                  <div className="space-y-2 group/field">
                    <label
                      className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 group-hover/field:text-amber-600 dark:group-hover/field:text-amber-400 transition-colors duration-300"
                      htmlFor="time"
                    >
                      <svg className="w-4 h-4 group-hover/field:scale-110 group-hover/field:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Time
                    </label>
                    <div className="relative">
                      <select
                        id="time"
                        onChange={(e) => {
                          setTime(e.target.value);
                        }}
                        className="w-full px-4 py-3 text-gray-700 dark:text-white bg-white/50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 transition-all duration-300 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-700/80 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-amber-900/20 hover:scale-[1.02] cursor-pointer"
                      >
                        <option value="">Select time</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/0 to-amber-400/0 hover:from-amber-400/5 hover:via-orange-400/5 hover:to-red-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="relative group/button">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-xl blur opacity-0 group-hover/button:opacity-70 transition-opacity duration-300"></div>
                    <button
                      className="relative w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-800 active:scale-[0.98] active:translate-y-0 overflow-hidden"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
                      
                      <span className="relative flex items-center justify-center gap-2">
                        <span className="group-hover/button:scale-110 transition-transform duration-300">Reserve Now</span>
                        <svg className="w-5 h-5 group-hover/button:translate-x-1 group-hover/button:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>

                      {/* Ripple effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100">
                        <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/10 rounded-full group-hover/button:w-96 group-hover/button:h-96 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"></div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Games Section */}
        <section className="w-full bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
          <div className="relative overflow-hidden">
            {/* Background Pattern Alternative */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-4 h-4 bg-amber-400 rounded-full"></div>
              <div className="absolute top-32 right-20 w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-32 right-10 w-3 h-3 bg-amber-300 rounded-full"></div>
            </div>
            
            <div className="relative z-10 py-16">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 mb-4">
                  Popular Board Games
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                  Discover our collection of exciting games that bring people together
                </p>
              </div>

              <div className="px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { src: pic2, title: 'Catan', players: '4-6 players', color: 'from-blue-500 to-purple-500' },
                    { src: pic3, title: 'Ticket to Ride', players: '2-5 players', color: 'from-green-500 to-teal-500' },
                    { src: pic4, title: 'Codenames', players: '4-8 players', color: 'from-red-500 to-pink-500' },
                    { src: pic4, title: 'Azul', players: '2-4 players', color: 'from-indigo-500 to-blue-500' },
                    { src: pic4, title: 'Splendor', players: '2-4 players', color: 'from-yellow-500 to-orange-500' },
                    { src: pic5, title: 'Pandemic', players: '2-4 players', color: 'from-emerald-500 to-green-500' },
                  ].map((game, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    >
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${game.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <div className="relative m-1 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden">
                        {/* Image Container with Overlay */}
                        <div className="relative overflow-hidden">
                          <img
                            src={game.src}
                            alt={game.title}
                            loading="lazy"
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300">
                            {game.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span className="text-sm font-medium">{game.players}</span>
                          </div>
                          
                          {/* Play Now Button */}
                          <div className="pt-4">
                            <button className={`w-full py-2 px-4 text-sm font-semibold text-white bg-gradient-to-r ${game.color} rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-lg`}>
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default MainHOC(Register);
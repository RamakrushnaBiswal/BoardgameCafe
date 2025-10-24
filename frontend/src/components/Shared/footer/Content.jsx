import { useEffect, useState } from 'react';
import Logo from '../../../assets/Logo/playcafe.png';
import googleImage from '../../../assets/img/google.png';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import Google from './Google';

export default function Content() {
  return (
    <div className="relative min-h-full">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-90"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-12">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left section - About & Navigation */}
          <div className="lg:col-span-2">
            <Nav />
          </div>

          {/* Right section - Newsletter */}
          <div className="flex justify-center lg:justify-end">
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom section - Logo and company info */}
        <Section2 />
      </div>
    </div>
  );
}

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletterRouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Compact animated background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition duration-300 animate-pulse"></div>

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/50 max-w-xs w-full transform transition-all duration-300 hover:scale-[1.01]">
        <div className="relative z-10">
          {/* Compact header */}
          <div className="text-center mb-5">
            <div className="relative inline-block mb-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-lg transform transition-transform duration-300 hover:rotate-6">
                <HiMail className="text-xl text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-snug">
              Get updates on events & offers
            </p>
          </div>

          {/* Compact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe Now'
              )}
            </button>
          </form>

          {/* Compact message */}
          {message && (
            <div
              className={`mt-3 p-3 rounded-xl text-center text-xs font-medium transition-all duration-300 ${
                message.includes('Thank you')
                  ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700'
                  : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {message.includes('Thank you') ? (
                  <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                ) : (
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    !
                  </span>
                )}
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="border-t border-amber-200 dark:border-gray-700 pt-8">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-30"></div>
            <img
              className="relative w-20 h-20 lg:w-24 lg:h-24 bg-transparent rounded-full shadow-xl border-4 border-white dark:border-gray-700 transition-transform duration-300 hover:scale-110"
              alt="PlayCafe Logo"
              src={Logo}
              loading="lazy"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              BoardGame Cafe
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mt-2">
              Where Games Meet Great Coffee
            </p>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="text-center lg:text-right">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            © 2024 by Sip & Play. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-end space-x-4 text-xs text-gray-500 dark:text-gray-500">
            <a
              href="/privacy"
              className="hover:text-amber-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/terms"
              className="hover:text-amber-600 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <span>•</span>
            <a
              href="/cookies"
              className="hover:text-amber-600 transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Events', link: '/events' },
    { name: 'Reservation', link: '/reservation' },
    { name: 'Boardgame', link: '/boardgame' },
    { name: 'About', link: '/about' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/sipnplaynyc/',
      icon: <FaFacebook className="text-xl" />,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/sipnplaynyc/?hl=en',
      icon: <FaInstagram className="text-xl" />,
      color: 'hover:text-pink-600',
    },
    {
      name: 'TikTok',
      link: 'https://www.tiktok.com/@sipnplaynycofficial?lang=en',
      icon: <FaTiktok className="text-xl" />,
      color: 'hover:text-gray-800 dark:hover:text-white',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/RamakrushnaBiswal/PlayCafe',
      icon: <FaGithub className="text-xl" />,
      color: 'hover:text-gray-800 dark:hover:text-white',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Quick Links */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 relative">
          Quick Links
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
        </h3>
        <nav className="space-y-3">
          {navLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 font-medium group"
            >
              <span className="relative">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Social Media */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 relative">
          Follow Us
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
        </h3>
        <div className="space-y-3">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-3 text-gray-600 dark:text-gray-300 ${item.color} transition-all duration-300 group font-medium`}
              aria-label={`${item.name} - opens in a new tab`}
            >
              <span className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors duration-300">
                {item.icon}
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 relative">
          Get in Touch
          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></span>
        </h3>
        <div className="space-y-4">
          <a
            href="mailto:sipnplaynyc@gmail.com"
            className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group font-medium"
          >
            <span className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors duration-300">
              <FaEnvelope className="text-lg" />
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              sipnplaynyc@gmail.com
            </span>
          </a>

          <a
            href="tel:+17189711684"
            className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300 group font-medium"
          >
            <span className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors duration-300">
              <FaPhone className="text-lg" />
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              718-971-1684
            </span>
          </a>

          <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-300 font-medium">
            <span className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <FaMapMarkerAlt className="text-lg" />
            </span>
            <div>
              <p>New York City</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Board Game Cafe
              </p>
            </div>
          </div>

          {/* Google Translate */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Google />
          </div>
        </div>
      </div>
    </div>
  );
};

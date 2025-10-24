/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import chess from '../../assets/img/chess.gif';
import { FaStar } from 'react-icons/fa6';

const FeedbackForm = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Use an environment variable for backend URL
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(5); // No need to set this dynamically unless you plan to change it later
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation for security
    if (!name || !email || !feedback || !rating) {
      setError('All fields are required, including the rating.');
      return;
    }

    // Clear any previous errors
    setError(null);

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/feedback/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, feedback, rating }),
      });

      // Check for JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response format.');
      }

      if (!response.ok) {
        const errorMessage =
          data.message || 'An error occurred while submitting feedback.';
        setError(errorMessage);
        console.error('Feedback submission failed:', errorMessage);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setFeedback('');
        setRating(null);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setError('An error occurred while submitting feedback.');
      console.error('Feedback submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-amber-100 dark:bg-black h-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={animationVariants}
          className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div className="mb-8 lg:mb-0 relative">
            <h2 className="text-5xl font-black text-[#004D43] dark:text-green-500">
              We value Your Feedback!
            </h2>
            <p className="mt-1 text-lg text-gray-700 pb-3 dark:text-white">
              Your thoughts help us improve. Share your experience and
              suggestions with us!
            </p>
            <div className="flex md:h-[40vh] md:w-[60vh] items-center justify-center mt-12">
              <img
                src={chess}
                alt="Chess"
                loading="lazy"
                className="md:p-10 p-5 object-contain bg-[#004D43] dark:bg-green-500 rounded-full shadow-2xl"
              />
            </div>
          </div>

          <div className="bg-[#004D43] dark:bg-green-500 rounded-xl p-3 pt-4 h-fit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 dark:bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43]"
                />
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 dark:bg-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43]"
                />
              </div>
              <div>
                <textarea
                  id="feedback"
                  placeholder="Your valuable feedback here"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  className="mt-1 block w-full border dark:bg-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43] resize-none"
                ></textarea>
              </div>
              <div className="flex flex-row justify-center gap-2">
                {[...Array(totalStars)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onChange={() => setRating(currentRating)}
                      />
                      <span
                        className="star"
                        style={{
                          color:
                            currentRating <= (hover || rating)
                              ? '#ffc107'
                              : '#e4e5e9',
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <FaStar />
                      </span>
                    </label>
                  );
                })}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md dark:bg-green-700 shadow-sm text-sm font-medium text-white bg-[#09342e] hover:bg-[#072d28] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D43]"
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10, display: 'none', height: 0 }}
                animate={{ opacity: 1, y: 0, display: 'block', height: 'auto' }}
                className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
              >
                Thank you for your feedback!
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackForm;

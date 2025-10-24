import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ReviewCarousel = () => {
  const [active, setActive] = useState(3);
  const items = [
    {
      img: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      stars: '★★★★★',
      text: 'The PlayCafe website project has been an incredible experience for me. The collaborative environment and innovative ideas helped me enhance my skills in web development and user experience design. I’m proud to be part of this initiative!',
      name: '- Arjun Sharma',
      jobTitle: 'Frontend Developer',
      location: 'Location: Bengaluru, India',
    },
    {
      img: 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid',
      stars: '★★★★',
      text: "Working on the PlayCafe project has truly expanded my horizons. I love how we're building a vibrant online space for board game enthusiasts, making it easy for them to connect and enjoy!",
      name: '- Priya Desai',
      jobTitle: 'UI/UX Designer',
      location: 'Location: Mumbai, India',
    },
    {
      img: 'https://img.freepik.com/free-vector/gradient-professional-sarah-smith-linkedin-personal-profile-picture_742173-13011.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid',
      stars: '★★★★★',
      text: 'The PlayCafe initiative has been a game-changer for my professional journey. The chance to work with a talented team and contribute to a meaningful project has been fulfilling. I can’t wait to see how our work transforms the cafe experience!',
      name: '- Rohan Patel',
      jobTitle: 'Backend Developer',
      location: 'Location: Ahmedabad, India',
    },
    {
      img: 'https://img.freepik.com/free-vector/profile-picture-template-design_742173-22027.jpg?ga=GA1.1.713761379.1679213202&semt=ais_hybrid',
      stars: '★★★★',
      text: 'Participating in the PlayCafe project has ignited my passion for web development. The creativity and teamwork involved in building this platform have not only sharpened my technical skills but also my ability to collaborate effectively.',
      name: '- Neha Iyer',
      jobTitle: 'Content Writer',
      location: 'Location: Chennai, India',
    },
    {
      img: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
      stars: '★★★★★',
      text: 'The PlayCafe website project has been an amazing platform for me to learn and grow. I am thrilled to contribute to a project that brings joy to board game lovers and creates a community.',
      name: '- Rahul Singh',
      jobTitle: 'Full Stack Developer',
      location: 'Location: Hyderabad, India',
    },
    {
      img: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      stars: '★★★★★',
      text: 'Being part of the PlayCafe initiative has been a rewarding experience. I’ve learned so much about web development while helping create an engaging space for board game enthusiasts. I’m excited to see our vision come to life!',
      name: '- Kavita Nair',
      jobTitle: 'Software Tester',
      location: 'Location: Pune, India',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    loadShow();
  }, [active]);

  const loadShow = () => {
    const itemsElement = document.querySelectorAll('.slider .item');
    itemsElement[active].style.transform = `none`;
    itemsElement[active].style.zIndex = 1;
    itemsElement[active].style.filter = 'none';
    itemsElement[active].style.opacity = 1;
    // Show after
    let stt = 0;
    for (let i = active + 1; i < itemsElement.length; i++) {
      stt++;
      itemsElement[i].style.transform =
        `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      itemsElement[i].style.transform =
        `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      itemsElement[i].style.zIndex = 0;
      itemsElement[i].style.filter = 'blur(5px)';
      itemsElement[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  return (
    <div className="mb-20 dark:bg-black dark:text-white">
      <div className="flex items-center justify-center p-20 mb-10">
        <h1 className="md:text-6xl text-4xl pl-3 pr-3 text-center font-bold text-[#004D43] dark:text-white">
          Customer Feedback
        </h1>
      </div>

      <div
        className="slider dark:bg-black dark:text-white"
        style={{
          position: 'relative',
          marginTop: '100px',
          width: '100%',
          height: '550px',
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <div
            className="item max-sm:!w-[300px] max-sm:!h-[430px]"
            key={index}
            style={{
              position: 'absolute',
              width: '350px',
              height: '500px',
              textAlign: 'justify',
              background: '#016457', // Dark green to light yellow gradient
              borderRadius: '12px',
              padding: '20px',
              transition: '0.5s',
              left: 'calc(50% - 150px)',
              top: '0',
              marginBottom: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
              overflow: 'hidden', // Ensures the image does not overflow
              color: 'white',
            }}
          >
            <img
              src={item.img}
              alt="User Avatar"
              className="w-[150px] h-[150px] rounded-lg object-cover mb-[20px] cursor-pointer max-sm:h-[120px] mb-0"
              style={{
                transition: 'transform 0.3s ease, filter 0.3s ease',
                border: '3px solid #d0e7b0', // Green border for the image
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.filter = 'brightness(1.1)'; // Brightness effect on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'brightness(1)'; // Reset brightness
              }}
            />
            <div className="stars text-[#ffd700] text-2xl mt-auto max-sm:mt-2">
              {item.stars}
            </div>
            <p className="text-justify mb-[20px] max-sm:text-xs max-sm:mb-0">
              {item.text}
            </p>
            <h2 className="mb-[10px] text-xl font-semibold max-sm:mb-1 max-sm:text-lg">
              {item.name}
            </h2>
            <div className="job-title text-[#007BFF] font-bold mb-[5px]">
              {item.jobTitle}
            </div>
            <div className="location text-[#e4e4e4] mb-[15px] max-sm:mb-1">
              {item.location}
            </div>
          </div>
        ))}

        {
          // Changed Buttons to motion.button provided by framer
          // whileHover is a framer specific attribute
          // It displaces buttons by 10px on hover for that nice slide animation
        }
        {active < items.length - 1 && (
          <motion.button
            id="next"
            className=" absolute top-[40%] text-green-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 right-[50px] max-sm:text-white max-sm:text-2xl max-sm:right-2"
            onClick={() =>
              setActive((prev) => (prev + 1 < items.length ? prev + 1 : prev))
            }
            whileHover={{ x: 10, color: '#00B2CA', opacity: 1 }}
          >
            {'>>'}
          </motion.button>
        )}
        {active > 0 && (
          <motion.button
            id="prev"
            className=" absolute top-[40%] text-green-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 left-[50px] max-sm:text-white max-sm:text-2xl max-sm:left-2"
            onClick={() =>
              setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev))
            }
            whileHover={{ x: -10, color: '#00B2CA', opacity: 1 }}
          >
            {' '}
            {'<<'}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ReviewCarousel;

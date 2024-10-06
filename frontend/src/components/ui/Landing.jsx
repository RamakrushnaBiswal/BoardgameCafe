import  { useState, useEffect } from 'react';
import heropic from "../../assets/landing/hero pic.jpg";
import coffecup from "../../assets/landing/coffecup.png";
import { motion } from 'framer-motion';
import AOS from 'aos'
import 'aos/dist/aos.css'

const parallaxVariants = {
  initial: { scale: 1 },
  animate: { scale: 1.05 },
};

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 10,
};

export default function Landing() {
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      })
    }, [])

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
  
    const parallaxEffect = {
      x: mousePosition.x / 100,
      y: mousePosition.y / 100,
      
      
    };
  return (
    <div>
      <section className="relative pb-24 mb-36 h-screen-dvh w-screen bg-cover bg-center overflow-hidden" >
        <div className="flex-col md:flex pt-20 z-1">
          {/* Text Content */}
          <div className="w-screen p-4 md:w-1/2 mb-6 md:mb-0 text-center md:text-left z-10 pt-14">
            <h1 className="text-6xl md:text-9xl font-bold">
              A unique café experience awaits you
            </h1>
          </div>
          <div>
            <div className="flex justify-center pt-64 z-0">
          <div className="absolute flex justify-center md:w-2/4 md:left-2/4 rotate-12 -bottom-20">
            <img src={heropic} alt="" className="w-2/4" />
          </div>
          <div className="absolute flex justify-center md:w-2/4 md:left-2/4 -rotate-12 -bottom-16">
            <img src={heropic} alt="" className="w-2/4" />
          </div>
          </div>
        </div>
        </div>
      </section>


      <section className="flex flex-row justify-center items-center p-32" >
        {/* <div className="w-3/5 p-28 mt-20">
          <h1 className="text-8xl font-bold text-black ">
            Our name says it all!
          </h1>
          <p className="text-black text-2xl">
            Founder, Jonathan Li, shares a passion for board games, boba, and
            delicious food, so he combined them all to become Sip & Play, Park
            Slope’s first board game cafe. It is a straightforward concept: come
            in with your friends and family to play any board game from our
            library of 300+ games! We hope when you visit, you also enjoy our
            coffee, espresso, boba, sandwiches, and snacks!
          </p>
          <ul className="text-xl mt-4">
            <li>New opening hours:</li>
            <li>Sunday: 10am-11pm</li>
            <li>Mon-Thurs: 11am-11pm</li>
            <li>Fri: 11am-midnight</li>
            <li>Sat: 10am-midnight</li>
          </ul>
          <button className="p-2 border-2 border-slate-500">Learn more↗️</button>
        </div> */}
        
        <div className="w-1/2 absolute p-4 md:right-40 m-auto rotate-12" onMouseMove={handleMouseMove}>
        <motion.img
              src={coffecup}
              alt="Coffee Cup"
              className="cursor-pointer"
              variants={parallaxVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.1 }}
              transition={transition}
              style={parallaxEffect }

            />
        </div>

        <div className="py-28 z-10">
          <h1 className="text-[4rem] md:text-[18rem] font-bold text-black">
            <span 
          data-aos="fade-left" 
          data-aos-delay="600" 
          className=""
        >
          PLAY
        </span>
        <span 
          data-aos="fade-left" 
          data-aos-delay="1000" 
          className=""
        >
          CAFE
        </span>
          </h1>
        </div>
      </section>
    </div>
  );
}

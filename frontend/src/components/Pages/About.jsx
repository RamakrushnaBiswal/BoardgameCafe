import bgpic from "../../assets/img/abt1.jpg";
import React, { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="about" className="relative w-full h-screen md:mt-28">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgpic})` }}
      >
        {/* Black overlay with 40% opacity */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content container */}
        <div className="relative z-10 grid items-center justify-center h-full grid-cols-1 p-4 md:grid-cols-2">
          {/* Heading */}
          <h1 className="p-4 text-4xl font-bold text-center text-white md:text-7xl lg:text-9xl">
            ABOUT US
          </h1>

          {/* Paragraph */}
          <div className="relative z-10 flex justify-center w-full mt-6 md:mt-0 md:px-36 ">
            <p className="w-full text-sm text-gray-200 md:text-base lg:text-xl">
              How it works..
              Our name says it all!
              Founder, Jonathan Li, shares a passion for board games, boba, and
              delicious food, so he combined them all to become Sip & Play, Park Slope’s
              first board game cafe. It is a straightforward concept, come in with your
              friends and family to play any board game from our library of{" "}
              <span className="text-amber-600">300+ games!</span>
              We hope when you visit, you also enjoy our coffee, espresso, boba,
              sandwiches, and snacks!
              <br />
              <br />
              <strong>Hours and Location</strong>
              <br />
              New opening hours:
              <br />
              Sunday: 10am-11pm
              <br />
              Mon-Thurs: 11am-11pm
              <br />
              Fri: 11am-midnight
              <br />
              Sat: 10am-midnight
              <br />
              Our kitchen closes 2.5-3 hours before we close!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

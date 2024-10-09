
import Landing from "../ui/Landing";
import ReviewCarousel from "../ui/ReviewCarousel";
import FeedbackForm from "../ui/FeedbackForm";
import About from "./About";
import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div id="home" className="bg-[#FDF3C7]">
            <Landing />
            <About/>
            <ReviewCarousel/>
            <FeedbackForm />
        </div>
    )
}



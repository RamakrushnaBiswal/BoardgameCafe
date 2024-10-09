import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import img1 from "../../assets/img/event1.jpg";
import img2 from "../../assets/img/event2.jpg";
import img3 from "../../assets/img/event3.jpg";
import img4 from "../../assets/img/event4.jpg";
import img5 from "../../assets/img/event6.jpg";
import band from "../../assets/landing/band.gif";
import game from "../../assets/Boardgames/carrom.gif";
import spin from "../../assets/Boardgames/spin.gif";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Event() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/event/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setEvents(data);
        // You can update the state with the fetched data here
      } catch (error) {
        setError(error.message);
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const textRef = useRef(null);

  useEffect(() => {
    const splitText = new SplitType(textRef.current, { types: "chars, words" });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Set initial opacity to 0 for all characters
    gsap.set(splitText.chars, { opacity: 0 });

    tl.to(splitText.chars, {
      opacity: 1,
      duration: 0.1,
      stagger: 0.1,
      ease: "power1.inOut",
    }).to(splitText.chars, {
      opacity: 0,
      duration: 0.1,
      stagger: 0.1,
      ease: "power1.inOut",
      delay: 1,
    });
    return () => {
      tl.kill();
      splitText.revert();
    };
  }, []);

  useEffect(() => {
    const splide = new Splide(".splide", {
      type: "loop",
      perPage: 1,
      perMove: 1,
      autoScroll: {
        speed: 1,
      },
      noDrag: true,
      arrows: false,
      pagination: false,
      gap: "2rem",
    }).mount({ AutoScroll });
    return () => {
      splide.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id="event" className="w-full h-fit bg-amber-100 md:overflow-hidden ">
        <section className="w-full h-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center md:overflow-hidden ">
          <div className="container relative items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <img
                src={band}
                alt="band"
                className="w-2/5 absolute left-1/2 top-[20%] z-10 translate-x-[-50%] mx-auto"
              />
              <h1 className="text-6xl md:text-9xl font-bold ml-4" ref={textRef}>
                Upcoming Events and much more....
              </h1>
              <div className="flex w-full h-80 rounded-full items-center px-40  bg-yellow-100 justify-between shadow-md">
                <img src={game} alt="game" className="w-28 h-28" />
                <img src={spin} alt="game" className="w-28 h-28" />
              </div>
            </div>
          </div>
        </section>
        <div className="min-h-screen bg-amber-100 p-4">
          <div className="container mx-auto flex flex-col flex-col-reverse lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Calendar */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
              <h2 className="text-xl font-bold mb-4">Event Calendar</h2>
              <div className="text-center mb-4">
                <span className="text-2xl font-semibold">
                  {months[currentMonth]}
                </span>{" "}
                <span className="text-2xl">{currentYear}</span>
              </div>
              <div className="grid grid-cols-7 gap-4 text-center">
                {daysOfWeek.map((day) => (
                  <div key={day} className="font-bold">
                    {day}
                  </div>
                ))}
                {Array(firstDayOfMonth)
                  .fill(null)
                  .map((_, i) => (
                    <div key={{i}} className="p-2"></div>
                  ))}
                {dates.map((day) => (
                  <div
                    key={day}
                    className={`p-2 border rounded-md ${
                      day === currentDate
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="bg-[#FEF3C7] text-gray-700 px-4 py-2 rounded-md mt-4">
                  Register for Event
                </button>
              </div>
              <div className="text-center mt-4">
                <button className="bg-white border border-green-500 px-4 py-2 rounded-md mt-2 text-green-500 hover:bg-green-500 hover:text-white">
                  Learn More
                </button>
              </div>
            </div>
            {/* Pictures */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-2/3">
              <h2 className="text-xl font-bold mb-4">Event Pictures</h2>
              <div className="splide w-full h-full">
                <div className="splide__track w-full ">
                  <ul className="splide__list">
                    <li className="splide__slide ">
                      <img src={img1} alt="Event 1" className="w-full h-full" />
                    </li>
                    <li className="splide__slide">
                      <img src={img2} alt="Event 2" className="w-full h-full" />
                    </li>
                    <li className="splide__slide">
                      <img src={img3} alt="Event 3" className="w-full h-full" />
                    </li>
                    <li className="splide__slide">
                      <img src={img4} alt="Event 4" className="w-full h-full" />
                    </li>
                    <li className="splide__slide">
                      <img src={img5} alt="Event 6" className="w-full h-full" />
                    </li>
                    {/* Add more images here */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-16 flex justify-center">
          <div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-1 md:px-6">
            <div className="event-list">
              {error && <p className="text-red-500">{error}</p>}
              {events.map((event) => (
                <div
                  key={event._id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-1 xl:grid-cols-2 md:px-6 lg:px-4 xl:px-0"
                >
                  <div className="w-full m-10 mx-auto lg:mx-0 md:mx-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-[400px] w-full"
                    />
                  </div>
                  <div className="w-full lg:m-10 md:m-10">
                    <h1 className="text-4xl font-semibold">{event.title}</h1>
                    <h4 className="text-xl text-muted text-slate-700 italic mt-2 leading-8">
                      {event.description}
                    </h4>
                    <div className="text-xl text-muted text-slate-700 italic mt-2 leading-8">
                      <b>Date: </b> <i>{event.date}</i>
                      <br />
                      <b>Time: </b> <i>{event.time}</i>
                      <br />
                      <b>Age: </b> <i>{event.age}</i>
                      <br />
                    </div>
                    <button className="btn btn-primary bg-[#C3E0DC] p-4 rounded-xl text-md font-medium mt-4 hover:bg-[#FFF9B1]">
                      Book your slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

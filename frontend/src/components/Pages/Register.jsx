import { useState } from "react";
import pic from "../../assets/img/abt1.jpg";
import pic2 from "../../assets/img/abt1.png";
import pic3 from "../../assets/img/abt2.png";
import pic4 from "../../assets/img/abt3.png";
import pic5 from "../../assets/img/abt4.png";

const boardGames = [
  {
    title: "Catan",
    players: "4-6 players",
    image: pic2,
    alt: "Catan",
  },
  {
    title: "Ticket to Ride",
    players: "2-5 players",
    image: pic3,
    alt: "Ticket to Ride",
  },
  {
    title: "Codenames",
    players: "4-8 players",
    image: pic4,
    alt: "Codenames",
  },
  {
    title: "Ticket to Ride",
    players: "2-5 players",
    image: pic3,
    alt: "Ticket to Ride",
  },
  {
    title: "Codenames",
    players: "4-8 players",
    image: pic4,
    alt: "Codenames",
  },
  {
    title: "Pandemic",
    players: "2-4 players",
    image: pic5,
    alt: "Pandemic",
  },
  // Add more games as needed
];

export default function Register() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState();

  const handleSubmit = (e) => {
    console.log(guests);
    console.log(time);
    console.log(date);
    // console.log(import.meta.env.VITE_BACKEND_URL);
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  return (
    <>
      <div className="w-full mx-auto mt-10 lg:mt-0 md:mt-0">
        <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col md:flex-row">
          <div className="container px-4 md:px-6 text-center text-primary-foreground w-full md:w-2/5 md:mt-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-5xl lg:text-8xl text-gray-800">
              RESERVE YOUR SPOT AT THE BOARD GAME CAFE
            </h1>
            <button className="inline-flex items-center justify-center mt-4 bg-[#D9D9D9] hover:bg-[#C9C9C9] rounded-full p-4">
              Make a Reservation
            </button>
          </div>
          <div className="w-full md:w-3/5 mt-6 md:mt-0 p-4 md:p-0">
            <img
              src={pic}
              alt="Board Game Cafe"
              className="w-full h-auto  rounded-s-full"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-24 px-6 md:px-6 bg-white">
          <div className="w-full md:w-3/5 lg:w-3/5 mx-auto border-2 p-7 rounded-lg border-yellow-300 bg-yellow-50 shadow-md">
            <div className="space-y-10">
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-yellow-600">
                Reserve Your Spot
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Fill out the form below to secure your reservation at our board game cafe.
              </p>

              {/* Form */}
              <form className="grid gap-4">
                {/* Number of Guests & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="text-sm font-medium text-gray-700">
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      onChange={(e) => setGuests(e.target.value)}
                      className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    >
                      <option value="">Select number of guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      onChange={(e) => setDate(e.target.value)}
                      className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <select
                    id="time"
                    onChange={(e) => setTime(e.target.value)}
                    className="flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                  >
                    <option value="">Select time</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full py-3 px-6 text-lg font-bold text-white bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600 transition-all ease-in-out duration-300"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Reserve Now
                </button>
              </form>
            </div>
          </div>
        </section>


        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-amber-100 bg-green-900 p-5 text-center">
          Popular Board Games
        </h1>
        <div className="w-full flex justify-center bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 mb-10 px-4 lg:px-0">
            {boardGames.map((game, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:border-yellow-500 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center p-6">
                  <img
                    src={game.image}
                    alt={game.alt}
                    className="mb-4 w-64 h-64 object-cover rounded-md"
                  />
                  <div className="font-semibold text-gray-900 text-lg">
                    {game.title}
                  </div>
                  <div className="text-gray-500 text-sm">{game.players}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
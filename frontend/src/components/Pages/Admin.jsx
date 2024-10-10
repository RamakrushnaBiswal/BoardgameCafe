import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
        const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
        // Fetch all events
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/event/all`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },  
                    }
                );
                
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching events:', error);
            }
        };
        useEffect(() => {
            fetchData();
        }, []);

    const Admin = {
        name: "AdminName", 
    };

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ageRange: '',
        startTime: '',
        endTime: '',
        date: '',
    });

    const formatTime = (time) => {
        let [hours, minutes] = time.split(':');
        let period = 'am';
        hours = parseInt(hours, 10);
        if (hours >= 12) {
            period = 'pm';
            if (hours > 12) hours -= 12;
        }
        if (hours === 0) hours = 12;
        return `${hours}:${minutes}${period}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedTime = `${formatTime(formData.startTime)} - ${formatTime(formData.endTime)}`;
        const { title, description, ageRange, date } = formData;
        const event = { title, description, ageRange, date, time: formattedTime };
        console.log(event);
        try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        if (response.ok) {
        message.success('Event added successfully');
        navigate('/admin');
        fetchData();
        }
        console.log(data);
    } catch (error) {
        console.error('Error adding event:', error);
        message.error('Error adding event');
    }
    }; 


    // Delete event function
    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event/delete?id=${eventId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
            message.success('Event deleted successfully');
            navigate('/admin');
            }

            // Filter out the deleted event from the list
            setEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            setError(error.message);
        }
    };

    return (
        <div className="h-fit min-h-screen w-screen flex flex-col items-center justify-start p-12 pt-[10vh]">
            <div className="Header w-full flex flex-col items-center">
                <h1 className='title text-[#323232] font-black text-7xl mb-6'>Hi {Admin.name}!</h1>
                <h1 className='mt-[-2vh] text-[#666] font-semibold text-2xl'>Welcome to Admin Panel</h1>
            </div>

            {/* Add new event form */}
            <div className="w-full h-fit bg-lime-200 flex flex-col  items-center rounded-lg mt-10 p-2">
                <h1 className='Header text-[#323232] font-black text-4xl text-center pt-4'>Add new Events</h1>
                <form className="w-full mx-auto p-4 flex flex-col md:flex-row justify-center  gap-2 bg-lime-100 shadow-md rounded-lg" onSubmit={handleSubmit}>
                    <div className='w-full flex flex-col justify-between'>
                        {/* Title */}
                        <div className="">
                            <label className="block text-gray-700 font-bold" htmlFor="title">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                            <label className="block text-gray-700 font-bold" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='w-full flex flex-col justify-between'>
                        {/* Time (From and To) */}
                        <div className="">
                            <label className="block text-gray-700 font-bold">
                                Time
                            </label>
                            <div className="flex gap-4">
                                <input
                                    type="time"
                                    name="startTime"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="p-2">to</span>
                                <input
                                    type="time"
                                    name="endTime"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="">
                            <label className="block text-gray-700 font-bold" htmlFor="date">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='w-full flex flex-col justify-between'>
                        {/* Age Range */}
                        <div className="">
                            <label className="block text-gray-700 font-bold" htmlFor="ageRange">
                                Age Range
                            </label>
                            <select
                                id="ageRange"
                                name="ageRange"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={formData.ageRange}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Age Range</option>
                                <option value="0-12">0-12</option>
                                <option value="13-17">13-17</option>
                                <option value="18+">18+</option>
                                <option value="All Ages">All Ages</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* See upcoming events */}
            <div className="w-full h-fit bg-lime-200 flex flex-col  items-center rounded-lg mt-10 p-2">
                <h1 className='Header text-[#323232] font-black text-4xl text-center pt-4'>See upcoming events</h1>
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
                                            <b>Age: </b> <i>{event.ageRange}</i>
                                            <br />
                                        </div>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="btn btn-primary bg-[#f81b1b] p-4 rounded-xl text-md font-medium mt-4 hover:scale-110 transition text-white"
                                        >
                                            Remove Event
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Admin

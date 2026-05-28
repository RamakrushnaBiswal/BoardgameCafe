import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Import correction

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        alert("Please sign in to view your profile, reservations, and events.");
        navigate('/login');
        return;
      }

      let userId;
      try {
        const decodedToken = jwtDecode(authToken);
        userId = decodedToken.sub;
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        alert("Invalid token. Please log in again.");
        navigate('/login');
        return;
      }

      try {
        // Fetch Profile Data
        const profileResponse = await fetch(`${API_URL}/api/user/profile`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
          credentials: 'include',
        });

        if (!profileResponse.ok) {
          const profileError = await profileResponse.json();
          console.error("Profile fetch error:", profileError);
          throw new Error(profileError.message || 'Failed to fetch profile data');
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch Reservations Data
        const reservationsResponse = await fetch(`${API_URL}/api/reservation/get/${userId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
          credentials: 'include',
        });

        if (!reservationsResponse.ok) {
          const reservationsError = await reservationsResponse.json();
          console.error("Reservations fetch error:", reservationsError);
          throw new Error(reservationsError.message || 'Failed to fetch reservations');
        }
        const reservationData = await reservationsResponse.json();
        setReservations(reservationData.data || []);
      
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      const authToken = Cookies.get('authToken');
  
      if (!authToken) {
        return;
      }
  
      try {
        const eventsResponse = await fetch(`${API_URL}/api/event/booked-events`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
          credentials: 'include',
        });
  
        if (!eventsResponse.ok) throw new Error('Failed to fetch events');
  
        const eventData = await eventsResponse.json();
        setEvents(eventData.bookedEvents || []);
      } catch (error) {
        // Silently handle
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-4 mt-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Your Profile</h1>

        {error && (
          <p className="text-red-500 text-center" aria-live="assertive">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500 text-center">Loading your profile, reservations, and events...</p>
        ) : (
          <>
            {profile && <ProfileCard profile={profile} />}
            
            <h2 className="text-4xl font-bold mt-10 mb-6 text-center">Your Reservations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservations && reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                  <ReservationCard key={index} reservation={reservation} />
                ))
              ) : (
                <p className="text-gray-500 text-center">No reservations found.</p>
              )}
            </div>

            <h2 className="text-4xl font-bold mt-10 mb-6 text-center">Your Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              ) : (
                <p className="text-gray-500 text-center">No events found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ProfileCard component for displaying user profile information
const ProfileCard = ({ profile }) => (
  <div className="bg-white dark:bg-amber-800 rounded-lg shadow-md p-6 mb-10">
    <h2 className="text-2xl font-semibold mb-4 text-center">Profile Information</h2>
    <p className="text-md mb-2"><strong>Name:</strong> {profile.name}</p>
    <p className="text-md mb-2"><strong>Email:</strong> {profile.email}</p>
    <p className="text-md mb-2"><strong>Role:</strong> {profile.role}</p>
    {profile.bio && <p className="text-md mb-2"><strong>Bio:</strong> {profile.bio}</p>}
  </div>
);

// ReservationCard component for displaying each reservation
const ReservationCard = ({ reservation }) => (
  <div className="bg-white dark:bg-amber-800 rounded-lg shadow-md p-4">
    <h2 className="text-xl font-semibold mb-2">Reservation Details</h2>
    <p className="text-md mb-1"><strong>Guests:</strong> {reservation.guests}</p>
    <p className="text-md mb-1"><strong>Date:</strong> {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(reservation.date))}</p>
    <p className="text-md mb-1"><strong>Time:</strong> {reservation.time}</p>
    <p className="text-md mb-1"><strong>Email:</strong> {reservation.email}</p>
  </div>
);

// EventCard component for displaying each event
const EventCard = ({ event }) => (
  <div className="bg-white dark:bg-amber-800 rounded-lg shadow-md p-4">
    <h2 className="text-xl font-semibold mb-2">Event Details</h2>
    <p className="text-md mb-1"><strong>Title:</strong> {event.title}</p>
    <p className="text-md mb-1"><strong>Date:</strong> {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(event.date))}</p>
    <p className="text-md mb-1"><strong>Location:</strong> {event.location}</p>
    <p className="text-md mb-1"><strong>Description:</strong> {event.description}</p>
  </div>
);


export default Dashboard;

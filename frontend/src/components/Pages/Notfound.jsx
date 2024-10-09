import Notfound from "../../assets/Menu_assets/Notfound.gif"
import React, { useState , useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
       <div>
         <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold mb-8 text-center">404 Not Found</h1>
            <img
                src={Notfound} // Replace with your actual GIF path
                alt="Not Found GIF"
                className="w-full max-w-md"
            />
            <p className="mt-8 text-lg text-gray-700 text-center">
                Sorry, the page you are looking for could not be found.
            </p>
        </div>
       </div>
    );
}

export default NotFound;

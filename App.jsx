import React from 'react';
import useShipDataFromScraper from "./hooks/useShipDataFromScraper";
import useLocationAndWeatherFromLatLong from "./hooks/useLocationAndWeatherFromLatLong";

export default function App() {
    const { shipData, loading, error } = useShipDataFromScraper();
    const { location, loading: locationLoading, error: locationError } = useLocationAndWeatherFromLatLong(shipData.lat, shipData.lon);

    if (loading) return <p>Loading ship data...</p>;
    if (error) return <p>Error: {error}</p>;
    if (locationLoading) return <p>Loading location...</p>;
    if (locationError) return <p>Location error: {locationError}</p>;

    return (
        <div className='flex flex-col justify-between items-center h-screen'>
            <div className="flex justify-between w-full">
                <div>
                    {location?.city ? `${location.city}, ${location.country}` : 'Location unavailable'}
                </div>
                <div>{location?.temp} &deg;C</div>
                <div>Logo</div>
            </div>
            <div>Time</div>
            <div className="flex justify-between w-full">
                <div>Edit Dashboard</div>
                <div>Homecoming</div>
            </div>
        </div>
    );
}

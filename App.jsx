import React from 'react';
import useShipDataFromScraper from "./hooks/useShipDataFromScraper";
import useLocationAndWeatherFromLatLong from "./hooks/useLocationAndWeatherFromLatLong";
import TimeDisplay from './components/TimeDisplay';
import logo from './assets/ahoylove.svg'
import Location from './components/Location';
import EditDashboardButton from './components/EditDashboardButton';

export default function App() {
    const { shipData, loading, error } = useShipDataFromScraper();
    const { location, loading: locationLoading, error: locationError } = useLocationAndWeatherFromLatLong(shipData.lat, shipData.lon);

    if (loading) return <p>Loading ship data...</p>;
    if (error) return <p>Error: {error}</p>;
    if (locationLoading) return <p>Loading location...</p>;
    if (locationError) return <p>Location error: {locationError}</p>;

    return (
        <div className='flex flex-col justify-between items-center h-screen bg-linear-to-b from-slate-950 to-indigo-900 text-white p-8'>
            <div className="flex justify-between w-full">
                <div className='flex flex-col'>
                    <Location city={location?.city} country={location?.country} name='Adi' />
                    <div className='text-2xl pt-2'>{location?.temp} &deg;C</div>
                </div>
                <div><img src={logo} alt='Ahoylove logo' className='w-40'/></div>
            </div>
            <div className='text-9xl'><TimeDisplay timezoneOffsetSeconds={location?.timezone} /></div>
            <div className="flex justify-between w-full">
                <EditDashboardButton />
                <div>Homecoming</div>
            </div>
        </div>
    );
}

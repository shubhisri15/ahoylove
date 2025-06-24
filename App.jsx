import React from 'react';
import { useState } from 'react';
import useShipDataFromScraper from "./hooks/useShipDataFromScraper";
import useLocationAndWeatherFromLatLong from "./hooks/useLocationAndWeatherFromLatLong";
import TimeDisplay from './components/TimeDisplay';
import logo from './assets/ahoylove.svg'
import Location from './components/Location';
import EditDashboardButton from './components/EditDashboardButton';
import Homecoming from './components/Homecoming';
import Weather from './components/Weather';
import SettingsModal from './components/SettingsModal';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userSettings, setUserSettings] = useState(null)

    const { shipData, loading, error } = useShipDataFromScraper(userSettings?.imo || 9692351);
    const { location, loading: locationLoading, error: locationError } = useLocationAndWeatherFromLatLong(shipData.lat, shipData.lon);

    if (loading) return <p>Loading ship data...</p>;
    if (error) return <p>Error: {error}</p>;
    if (locationLoading) return <p>Loading location info...</p>;
    if (locationError) return <p>Location error: {locationError}</p>;

    const handleSave = (data) => {
        setUserSettings(data);
    };

    const partnerNameDisplayed = userSettings?.nickname ? userSettings?.nickname : userSettings?.fullName || 'Your Partner'

    return (
        <div className='flex flex-col justify-between items-center h-screen w-screen bg-linear-to-b from-slate-950 to-indigo-900 text-white md:p-8 p-4'>
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full">
                <img src={logo} alt='Ahoylove logo' className="w-32 mb-4 md:mb-0 md:order-2" />
                <div className="flex flex-col items-center md:items-start md:order-1">
                    <Location destination={shipData?.destinationPort} lastUpdated={shipData?.lastUpdated} name={partnerNameDisplayed} />
                    <Weather temperature={location?.temp} icon={location?.icon}/>
                </div>
            </div>

            <div className='md:text-9xl text-8xl text-center'>
                <TimeDisplay timezoneOffsetSeconds={location?.timezone} displayName={partnerNameDisplayed}/>
            </div>
            <div className="flex justify-center md:justify-between w-full items-end">
                <EditDashboardButton onClick={() => setIsModalOpen(true)}/>
                <Homecoming />
            </div>
            {isModalOpen && <SettingsModal onClose={() => setIsModalOpen(false)} onSave={handleSave}/>}
        </div>
    );
}

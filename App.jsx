import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useShipDataFromScraper from "./hooks/useShipDataFromScraper";
import useLocationAndWeatherFromLatLong from "./hooks/useLocationAndWeatherFromLatLong";
import TimeDisplay from './components/TimeDisplay';
import logo from './assets/ahoylove.svg'
import Location from './components/Location';
import EditDashboardButton from './components/EditDashboardButton';
import Homecoming from './components/Homecoming';
import Weather from './components/Weather';
import SettingsModal from './components/SettingsModal';
import Loading from './components/Loading';


export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userSettings, setUserSettings] = useState(null)

    useEffect(() => {
        chrome.storage.local.get(['userSettings'], (result) => {
            if (result.userSettings) {
            setUserSettings(result.userSettings);
            }
        });
    }, []);

    const prevUserSettingsRef = useRef();

    useEffect(() => {
    // Avoid saving on first mount or if no actual changes
        if (
            userSettings &&
            JSON.stringify(userSettings) !== JSON.stringify(prevUserSettingsRef.current)
        ) {
            chrome.storage.local.set({ userSettings });
            prevUserSettingsRef.current = userSettings;
        }
    }, [userSettings]);

    const { shipData, loading, error } = useShipDataFromScraper(userSettings?.imo);
    const { location, loading: locationLoading, error: locationError } = useLocationAndWeatherFromLatLong(shipData.lat, shipData.lon);

    if (loading && userSettings) return <Loading text='Loading ship data'/>;
    if (error && userSettings) return <p>Error: {error}</p>;
    if (locationLoading && userSettings) return <Loading text='Loading location info'/>;
    if (locationError && userSettings) return <p>Location error: {locationError}</p>;

    const handleSave = (data) => {
        setUserSettings(data);
    };

    const partnerNameDisplayed = userSettings?.nickname ? userSettings?.nickname : userSettings?.fullName || 'Your Partner'

    const landingPage = (
        <div className='flex flex-col justify-center gap-8 items-center h-screen w-screen bg-linear-to-b from-slate-950 to-indigo-900 text-white md:p-8 p-4 relative'>
            <img src={logo} alt='Ahoylove logo' className="w-40 absolute top-6 md:static md:mb-6" />
            <div className='text-center'>
                <h1 className='text-5xl mb-4'>Welcome to AhoyLove</h1>
                <p className='md:text-xl text-md'>We help you stay close to your partner while they're away at sea.</p>
            </div>
            <EditDashboardButton onClick={() => setIsModalOpen(true)} buttonText='Get Started'/>
            {isModalOpen && <SettingsModal onClose={() => setIsModalOpen(false)} onSave={handleSave}/>}
        </div>
    )

    const dashboard = (
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
                <EditDashboardButton onClick={() => setIsModalOpen(true)} buttonText='Edit Dashboard'/>
                <Homecoming />
            </div>
            {isModalOpen && <SettingsModal onClose={() => setIsModalOpen(false)} onSave={handleSave} data={userSettings}/>}
        </div>
    )

    return userSettings ? dashboard : landingPage
}

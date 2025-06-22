import { useEffect, useState } from "react";
import axios from 'axios';

export default function useLocationAndWeatherFromLatLong(lat, lon) {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const [location, setLocation] = useState(
        {
            country: null,
            city: null,
            temp: null,
            icon: null
        }
    )

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (lat === null || lon === null) {
            setLoading(false);
            return;
        }
        getLocation()
    }, [lat, lon])

    async function getLocation() {
            try {
                if (!lat || !lon) {
                    setError('Invalid coordinates');
                    return;
                }
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c9f4237f8c649b4f5882df003fb89f2d`
                );
                
                if (response.data) {
                    const data = response.data;
                    setLocation({
                        country: new Intl.DisplayNames(['en'], { type: 'region' }).of(data.sys.country),
                        city: data.name,
                        temp: data.main.temp,
                        timezone: data.timezone,
                        icon: data.weather.icon
                    });
                } else {
                    setError('Location not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

    return { location, error, loading };
}
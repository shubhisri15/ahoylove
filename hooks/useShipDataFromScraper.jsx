import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useShipDataFromScraper(imo) {
    const [shipData, setShipData] = useState({ 
        lat: null, 
        lon: null,
        lastUpdated: null,
        destinationPort: null
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!imo) return;

        let isCancelled = false;

        async function fetchData() {
            try {
                const url = `https://scrape.abstractapi.com/v1/?api_key=58e2d8e03eef4a3fa28930635d37f271&url=https://www.vesselfinder.com/vessels/details/${imo}`;
                const response = await axios.get(url);

                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(response.data, 'text/html');

                const djsonElement = htmlDoc.getElementById('djson');
                const destinationLabel = Array.from(htmlDoc.querySelectorAll('div.vilabel')).find(
                    el => el.textContent.trim() === 'Destination'
                );

                let destination = null;

                if (destinationLabel) {
                    const destinationElement = destinationLabel.nextElementSibling;
                    destination = destinationElement?.textContent.trim() || null;
                }

                if (!djsonElement) {
                    throw new Error('Element with id "djson" not found');
                }

                const jsonString = djsonElement.getAttribute('data-json');
                if (!jsonString) {
                    throw new Error('No data-json attribute found');
                }

                const data = JSON.parse(jsonString);

                if (!isCancelled) {
                    setShipData({
                        lat: data.ship_lat,
                        lon: data.ship_lon,
                        lastUpdated: data.lrpd,
                        destinationPort: destination
                    });
                    setError(null);
                    setLoading(false);
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 60 * 60 * 1000); // every 60 minutes we refresh

        return () => {
            isCancelled = true;
            clearInterval(interval);
        };
    }, [imo]);

    return { shipData, error, loading };
}

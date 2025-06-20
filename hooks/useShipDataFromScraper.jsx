import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useShipDataFromScraper() {
    const [shipData, setShipData] = useState({ 
        lat: null, 
        lon: null,
        lastUpdated: null
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => fetchData, [])

    async function fetchData() {
        try {
            const url = "https://scrape.abstractapi.com/v1/?api_key=58e2d8e03eef4a3fa28930635d37f271&url=https://www.vesselfinder.com/vessels/details/9692351";
            const response = await axios.get(url);

            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(response.data, 'text/html');
            const djsonElement = htmlDoc.getElementById('djson');

            if (djsonElement) {
            const jsonString = djsonElement.getAttribute('data-json');
            
            if (jsonString) {
                const data = JSON.parse(jsonString);
                setShipData({
                    lat: data.ship_lat,
                    lon: data.ship_lon,
                    lastUpdated: data.lrpd
                });
            } else {
                setError('No data-json attribute found');
            }
            } else {
                setError('Element with id "djson" not found');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { shipData, error, loading };
}
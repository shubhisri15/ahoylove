const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://scrape.abstractapi.com/v1/?api_key=58e2d8e03eef4a3fa28930635d37f271&url=https://www.vesselfinder.com/vessels/details/9692351";

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const djsonElement = $('#djson');
    // Get the data-json attribute value
    const jsonString = djsonElement.attr('data-json');
    
    if (jsonString) {
      // Parse the JSON string
      const shipData = JSON.parse(jsonString);
      
      // Extract latitude and longitude
      const lat = shipData.ship_lat;
      const lon = shipData.ship_lon;
      
      console.log('Ship Position:');
      console.log('Latitude:', lat);
      console.log('Longitude:', lon);
      console.log('Last updated:', shipData.lrpd);
    } else {
      console.log('No data-json attribute found');
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  

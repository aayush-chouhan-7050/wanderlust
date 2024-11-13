const axios = require('axios');
require('dotenv').config({ path: '../.env' });   

const apiKey = process.env.MAP_TOKEN;

if (!apiKey) {
  console.error('API key is missing. Please set MAP_TOKEN in your environment variables.');
  process.exit(1);  
}

axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`)
  .then(response => {
    const data = response.data;
    if (data.results && data.results.length > 0) {
      console.log(data.results[0].geometry); // { lat: ..., lng: ... }
    } else {
      console.error('No results found for the provided address.');
    }
  })
  .catch(error => {
    console.error('Error fetching geocoding data:', error);
  });


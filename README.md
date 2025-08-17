## Usage instructions

- Clone the repository
- Run `node new-server.js` on your terminal
- Access the application on https://localhost:3030 OR https://ahoylove.netlify.app/

## Todos
- Move the server files to a backend service and add a controller layer to fetch and display data from backend server (this will make the app accessible on the Netlify link). 

## About AhoyLove
AhoyLove is a short and sweet way of always being able to feel close to your long distance partner. 
This is a web-app that displays your maritime officer's current location (based on their ship MMSI or IMO number), their timezone, the weather at their location and time left to homecoming. 

## Tech Stack
React.js, TailwindCSS, Javascript, Node.js, HTML+CSS

# In an ideal world, my app design would have looked like this:

- Used the aisstream.io Websocket API to get real time position report for the ship based on its MMSI number
- Can be installed as a chrome extension for instant access no matter what you are doing. (Just click on a little floating widget on the screen and boom you have your partner's info!)

# But because we live in a world where nothing goes according to plan, this is what the LLD looks like:

- Uses the Abstract Web Scraping API to fetch info based on the IMO number
- Uses the OpenWeatherAPI to get the location, weather and timezone information for the given latitude and longitude (obtained from the ship data)

# What were the issues with the initial plan?

- The websocket API does not work as expected, it has some issues in the source code due to which the FiltersByMMSI filter does not work, and it does not catch all MMSIs. All other AIS data APIs are much more accurate in their data transmission, but also extremely expensive to use (not made for personal projects).

- The current scraping logic my app uses sort of violates the Content Security Policy setup by Google for its extensions. This means unfortunately this app cannot be turned into a chrome extension, YET.

## Initial screen designs (Figma):

![Without BG_ HOME PAGE- 12h](https://github.com/user-attachments/assets/91593e69-098f-41ff-a20d-5fd72439a273)

![Without BG_ HOME PAGE- 24h](https://github.com/user-attachments/assets/3a175e50-7dd2-4d01-915e-2f26902ccfdf)

![Without BG_ Settings modal](https://github.com/user-attachments/assets/c729eaf9-e1be-4487-96dd-61f312ee00db)




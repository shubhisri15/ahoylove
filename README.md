This project is still WIP

AhoyLove is a short and sweet way of always being able to feel close to your long distance partner. 
This is a web-app / chrome extension that displays your maritime officer's current location (based on their ship MMSI or IMO number), their timezone, the weather at their location and time left to homecoming. 

- Uses the aisstream.io Websocket API to get real time position report for the ship, and the Abstract Web Scraping API as backup in case the websocket API is unable to fetch info.
  (Not ideal, but hey I am trying to save some serious money!)
- Uses the OpenWeatherAPI to get the location, weather and timezone information for the given latitude and longitude (obtained from the ship data)

Tech stack used: React.js, TailwindCSS, Javascript, Node.js, HTML+CSS
Below are the screen designs for the personal dashboard (with all the info) designed on Figma:

![Without BG_ HOME PAGE- 12h](https://github.com/user-attachments/assets/91593e69-098f-41ff-a20d-5fd72439a273)

![Without BG_ HOME PAGE- 24h](https://github.com/user-attachments/assets/3a175e50-7dd2-4d01-915e-2f26902ccfdf)

![Without BG_ Settings modal](https://github.com/user-attachments/assets/c729eaf9-e1be-4487-96dd-61f312ee00db)



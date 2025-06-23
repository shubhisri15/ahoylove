// marineTrafficScraper.js
const puppeteer = require("puppeteer");

const VESSEL_URL = "https://www.marinetraffic.com/en/vessels/3561565/position";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("⏳ Navigating to vessel page...");
  await page.goto(VESSEL_URL, { waitUntil: "networkidle2", timeout: 0 });

  let found = false;

  page.on("response", async (response) => {
    const url = response.url();

    if (url.includes("/exportvessel/") || url.includes("position") || url.includes("vesseldetails")) {
      try {
        const json = await response.json();

        // Try to extract coordinates from different possible response structures
        const lat = json.LAT || json.lat || json.latitude;
        const lon = json.LON || json.lon || json.longitude;

        if (lat && lon && !found) {
          found = true;
          console.log("✅ Ship Position:");
          console.log(`Latitude: ${lat}`);
          console.log(`Longitude: ${lon}`);
          await browser.close();
        }
      } catch (e) {
        // Not JSON or failed to parse
      }
    }
  });

  // Optional: timeout to avoid running forever
  setTimeout(async () => {
    if (!found) {
      console.log("⚠️ Could not extract coordinates. Try reloading the page or inspecting the API manually.");
      await browser.close();
    }
  }, 40000); // 10 seconds
})();

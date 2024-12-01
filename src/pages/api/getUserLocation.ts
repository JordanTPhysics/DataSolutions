import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    console.log('API Key:', apiKey);
    const { lat, lng } = req.query;
  
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    res.status(200).json(data); // Respond with geocoding results (city, country, etc.)
  }
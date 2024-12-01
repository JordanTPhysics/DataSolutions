import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the path to your JSON file
const filePath = path.join(process.cwd(), 'data', 'userJourneys.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const journeys = JSON.parse(data) as { sessionId: number }[];

    const highestId = journeys.reduce((maxId, journey) => Math.max(maxId, journey.sessionId), 0) ?? 0;
    res.status(200).json({ nextJourneyId: highestId + 1 });
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ nextJourneyId: 1 });
  }
}

// pages/api/logUserJourney.ts
import fs from 'fs';
import path from 'path';
import { UserJourney } from '@/src/lib/UserJourney';

export default function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const data = req.body;
    
    // Define file path in the project’s directory (not public)
    const filePath = path.join(process.cwd(), 'data', 'userJourneys.json');

    // Read current data
    let journeys: UserJourney[] = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      journeys = JSON.parse(fileData);
    }

    // Append new journey data
    journeys.push(data);

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(journeys, null, 2));

    res.status(200).json({ message: 'User journey logged successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

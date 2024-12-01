import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { JourneyStep, UserJourney } from './UserJourney';

interface SessionContextProps {
    userJourney: UserJourney;
    addJourneyStep: (step: JourneyStep, journey: UserJourney) => void;
    getUserJourneys: () => Promise<UserJourney[]>;
}

const fetchNextJourneyId = async () => {
    const response = await fetch('/api/getNextJourneyId');
    const data = await response.json();
    return data.nextJourneyId;
  };

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [userJourney, setUserJourney] = useState<UserJourney | null>(null);
    const [nextJourneyId, setNextJourneyId] = useState<number | null>(null);

    const addJourneyStep = (step: JourneyStep, journey: UserJourney) => {
        journey.addStep(step);
        setUserJourney(journey);
    };

    const logJourney = async () => {
        if (userJourney && userJourney.steps.length > 0) {
            await fetch('/api/logUserJourney', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userJourney),
            });
        }
    };

    const getUserJourneys = async () => {
        const response = await fetch('/api/getUserJourneys');
        const data = await response.json();
        const parsedData = JSON.parse(data) as UserJourney[];

        return parsedData.map(journey => new UserJourney(journey.sessionId, journey.steps, journey.city, journey.country, new Date(journey.startTime)));
    }

    useEffect(() => {
        // Fetch next journey ID only if not already set
        if (nextJourneyId === null) {
            fetchNextJourneyId().then(id => {
                setNextJourneyId(id);
                let city = 'Unknown';
                let country = 'Unknown';
                console.log('Next journey ID:', id);
                if (navigator.geolocation) {
                    console.log('Getting user location...');
                    navigator.geolocation.getCurrentPosition((position) => {
                        console.log('Got user location:', position.coords);
                        fetch(`/api/getUserLocation?lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log('Found user location Data:', data);
                            });
                    });
                }
                setUserJourney(new UserJourney(id, [], city, country));
                console.log('Started user journey:', userJourney);

            });
        }
    }, [nextJourneyId, userJourney]);

    useEffect(() => {
        // Log journey when the page unloads
        window.addEventListener('beforeunload', logJourney);
        return () => window.removeEventListener('beforeunload', logJourney);
    });

    return (
        <SessionContext.Provider value={{ userJourney: userJourney!, addJourneyStep, getUserJourneys }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};

import React, { useState, useEffect } from 'react';

import { useSession } from '../lib/SessionContext';
import { UserJourney, JourneyStep } from '../lib/UserJourney';
import TimeSeriesChart from '../components/charts/TimeSeries';
import BarChart from '../components/charts/BarChart';

const countUserJourneysByDate = (journeys: {startTime: Date}[]): [string[], number[]] => {
    console.log(journeys);

    const countsByDate = journeys.reduce((acc, journey) => {
        const date = new Date(journey.startTime).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        console.log(acc);
        return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(countsByDate);
    const counts = Object.values(countsByDate);

    return [dates, counts];
};

const countUserJourneysByMonth = (journeys: {startTime: Date}[]): [string[], number[]] => {
    const journeyCountByMonth = journeys.reduce((acc, journey) => {
        const date = new Date(journey.startTime);
        const month = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthString = month.toDateString().slice(4, 7);
        if (!acc[monthString]) {
            acc[monthString] = 0;
        }
        acc[monthString]++;
        return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(journeyCountByMonth);
    const counts = Object.values(journeyCountByMonth);

    return [dates, counts];
}

const Tracker: React.FC = () => {

    const { userJourney, getUserJourneys, addJourneyStep } = useSession();
    const [journeys, setJourneys] = useState<UserJourney[]>([]);

    useEffect(() => {
        getUserJourneys().then(data => setJourneys(data));
    });

    const handleChartClick = (e: React.MouseEvent<HTMLElement>) => {
        addJourneyStep({
            timestamp: Date.now(),
            pageUrl: '/tracker',
            action: 'click',
            elementId: (e.target as HTMLElement).id,
        }, userJourney);
    };
    const [dailyDates, dailyCounts] = countUserJourneysByDate(journeys);
    const [monthlyDates, monthlyCounts] = countUserJourneysByMonth(journeys);
    const longestJourney = journeys ? UserJourney.getLongestJourney(journeys) : null;
    const formConversionRate = journeys ? UserJourney.formConversionRate(journeys) : null;

    return (
        <div className='grid lg:grid-cols-6 grid-cols-1 lg:grid-rows-9 text-text font-serif bg-gradient-to-t from-background to-slate-800 border-y-4 border-border text-center'>
            <h2 className='col-span-1 lg:col-span-6 row-span-1 lg:text-5xl'>User Journey Tracker</h2>
            <div className='lg:col-span-2 md:col-span-2 col-span-1 row-span-6 mx-4'>
                <TimeSeriesChart
                    dates={dailyDates}
                    values={dailyCounts}
                    title='Journeys (Daily)'
                    onClick={handleChartClick}
                    id='daily-journeys-chart'
                />
            </div>
            <div className='lg:col-span-3 md:col-span-3 col-span-1 row-span-6 mx-4'>
                <BarChart
                    labels={monthlyDates}
                    values={monthlyCounts}
                    title='Journeys (Monthly)'
                    onClick={handleChartClick}
                    id='monthly-journeys-chart'
                />
            </div>
            <div className='col-span-1 lg:max-h-[20vh] overflow-y-scroll overflow-x-hidden row-span-2 bg-foreground-secondary border-border border-4 rounded-md font-serif my-auto'>
                <h3 className='text-xl border-b-2 border-border'>Current Steps: {userJourney ? userJourney.steps.length : <div>Loading...</div>}</h3>
                <ul className=''>
                    {userJourney ? userJourney.steps.map((step, index) => (
                        <li 
                        key={index}
                        className='border-b-2 border-border p-2 bg-foreground'>
                            {step.action} on {step.elementId}
                             <br/>
                              page: {step.pageUrl.startsWith("/") ? step.pageUrl.slice(1) : step.pageUrl}</li>
                    )) : <div>Loading...</div>}
                </ul>
            </div>

            <div className='col-span-1 row-span-1 bg-foreground-secondary border-border border-4 rounded-md font-serif my-auto'>
                <h3 className='text-xl border-b-2 border-border'>Longest Journey</h3>
                {
                    longestJourney ? (
                        <div>
                            <p>{longestJourney.startTime.toDateString()}</p>
                            <p>{longestJourney.getNumberOfSteps()} steps</p>
                        </div>
                    ) : (
                        <p>No journeys</p>
                    )
                }
            </div>
            <div className='col-span-1 row-span-1 bg-foreground-secondary border-border border-4 rounded-md font-serif my-auto'>
                <h3 className='text-xl border-b-2 border-border'>Form Conversion Rate</h3>
                {
                    formConversionRate ? (
                        <p>{formConversionRate}%</p>
                    ) : (
                        <p>No form data</p>
                    )
                }
            </div>
                <div className='col-span-1 row-span-3 lg:col-span-6 bg-foreground-secondary border-border border-4 rounded-md my-auto'>
                    <h2 className='lg:text-3xl text-lg'>Coming Soon</h2>
                </div>

        </div>
    );
};

export default Tracker;
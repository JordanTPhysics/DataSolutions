import React, { useState, useEffect } from 'react';

import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";

import { useSession } from '../lib/SessionContext';
import { UserJourney, JourneyStep } from '../lib/UserJourney';
import TimeSeriesChart from '../components/charts/TimeSeries';
import BarChart from '../components/charts/BarChart';


const getLastMonth = (today: Date) => today.getMonth() == 0 ? 11 : today.getMonth() - 1
const getLastYearIfJan = (today: Date) => today.getMonth() == 0 ? today.getFullYear() - 1 : today.getFullYear()

const countUserJourneysByDate = (journeys: { startTime: Date }[]): [string[], number[]] => {

    const countsByDate = journeys.reduce((acc, journey) => {
        const date = new Date(journey.startTime).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(countsByDate);
    const counts = Object.values(countsByDate);

    return [dates, counts];
};

const countFormConversionsByDate = (journeys: UserJourney[]): [string[], number[]] => {
    const formConversionsByDate = journeys.reduce((acc, journey: UserJourney) => {
        if (journey.didFormSubmit()) {
            const date = new Date(journey.startTime).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const dates = Object.keys(formConversionsByDate);
    const counts = Object.values(formConversionsByDate);

    return [dates, counts];
};

const countUserJourneysByMonth = (journeys: { startTime: Date }[]): [string[], number[]] => {
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

    const months = Object.keys(journeyCountByMonth);
    const counts = Object.values(journeyCountByMonth);

    return [months, counts];
}

const Tracker: React.FC = () => {

    const { userJourney, journeyData, addJourneyStep } = useSession();

    const handleChartClick = (e: React.MouseEvent<HTMLElement>) => {
        addJourneyStep({
            timestamp: Date.now(),
            pageUrl: '/tracker',
            action: 'click',
            elementId: (e.target as HTMLElement).id,
        }, userJourney);
    };

    const today = new Date();

    const [dailyDates, dailyCounts] = countUserJourneysByDate(journeyData);
    const [dailyFormConversionsDates, dailyFormConversions] = countFormConversionsByDate(journeyData);
    const [monthlyDates, monthlyCounts] = countUserJourneysByMonth(journeyData);
    const longestJourney = journeyData ? UserJourney.getLongestJourney(journeyData) : null;
    const totalConversionRate = UserJourney.formConversionRate(journeyData);
    const thisMonthConversionRate = UserJourney.monthlyConversionRate(journeyData, today.getMonth(), today.getFullYear());
    const lastMonthConversionRate = UserJourney.monthlyConversionRate(journeyData, getLastMonth(today), getLastYearIfJan(today));
    const busiestDay = UserJourney.getBusiestDay(journeyData);

    const journeysThisMonth = UserJourney.getTotalJourneysByMonth(journeyData, today.getMonth(), today.getFullYear());
    const journeysLastMonth = UserJourney.getTotalJourneysByMonth(journeyData, getLastMonth(today), getLastYearIfJan(today));


    return (
        <div className='grid grid-cols-[2fr_7fr_2fr] text-text font-serif bg-slate-800 text-center border-t-4 border-border shadow-xl mt-4'>
            <h2 className='lg:text-5xl text-left p-4 col-span-full'>User Journeys - Overview</h2>
            <div className=' bg-slate-600 mx-1 '>
                <h2 className='text-2xl text-left px-4'>Journey Stats</h2>
                <div className='bg-slate-500 rounded-sm font-serif m-2'>
                    <h3 className='text-xl border-b-2 text-left px-2'>Top Figures</h3>
                    <div className='grid grid-cols-2'>
                        {
                            longestJourney ? (
                                <div>
                                    Longest Journey <br />
                                    <span>{longestJourney.startTime.toISOString().split('T')[0]}</span><br />
                                    <span>{longestJourney.getNumberOfSteps()} steps</span>
                                </div>
                            ) : (
                                <p>No journeys</p>
                            )
                        }
                        {
                            busiestDay ? (
                                <div>
                                    Busiest Day <br />
                                    <span>{busiestDay}</span><br />
                                    <span>{UserJourney.getTotalJourneysByDay(journeyData, new Date(busiestDay))} journeys</span>
                                </div>
                            ) : (
                                <p>No journeys</p>
                            )
                        }
                    </div>
                </div>
                <div className='bg-slate-500 rounded-sm font-serif m-2'>
                    <h3 className='text-xl text-left px-2 border-b-2 border-border'>Page Visits</h3>
                    <ul>
                        <li className='grid grid-cols-[1fr_2fr] items-center py-2'>
                            <span>{today.toLocaleString('default', { month: 'long' })}:</span>
                            <span className='bg-slate-600 rounded-md px-2 border-border border-2 text-2xl mx-auto'>
                                {journeysThisMonth}
                                {(journeysThisMonth - journeysLastMonth) / journeysLastMonth >= 0 ?
                                    <FaRegArrowAltCircleUp color='green' size={20} className='mx-1' /> :
                                    <FaRegArrowAltCircleDown color='red' size={20} className='mx-1' />}
                                <span className='italic text-sm'>
                                    {(100 * (journeysThisMonth - journeysLastMonth) / journeysLastMonth).toFixed()}%
                                    <br />
                                    from previous
                                </span>
                            </span>
                        </li>
                        <li className='grid grid-cols-[1fr_2fr] items-center py-2'>
                            <span>Total:</span>
                            <span className='bg-slate-600 rounded-md px-2 border-border border-2 text-2xl mx-auto'>
                                {journeyData.length} journeys
                            </span>
                        </li>
                    </ul>
                </div>
                <div className='bg-slate-500 rounded-sm font-serif m-2'>
                    <h3 className='text-xl text-left px-2 border-b-2 border-border'>Conversions</h3>
                    <ul>
                        <li className='grid grid-cols-[1fr_2fr] items-center py-2'>
                            <span>{today.toLocaleString('default', { month: 'long' })}:</span>
                            <span className='bg-slate-600 rounded-md px-2 border-border border-2 text-2xl mx-auto flex flex-row items-center'>
                                {thisMonthConversionRate.toFixed()}%
                                {(thisMonthConversionRate - lastMonthConversionRate) / lastMonthConversionRate >= 0
                                    ? <FaRegArrowAltCircleUp color='green' size={20} className='mx-1' />
                                    : <FaRegArrowAltCircleDown color='red' size={20} className='mx-1' />}
                                <span className='italic text-sm '>
                                    {(100 * (thisMonthConversionRate - lastMonthConversionRate) / lastMonthConversionRate).toFixed()}%
                                    <br />
                                    from previous
                                </span>
                            </span>

                        </li>
                        <li className='grid grid-cols-[1fr_2fr] items-center py-2'>
                            <span>Total:</span>
                            <span className='bg-slate-600 rounded-md px-2 border-border border-2 text-2xl mx-auto flex flex-row items-center'>
                                {totalConversionRate.toFixed()}%
                                {(thisMonthConversionRate - totalConversionRate) / totalConversionRate >= 0
                                    ? <FaRegArrowAltCircleUp color='green' size={20} className='mx-1' />
                                    : <FaRegArrowAltCircleDown color='red' size={20} className='mx-1' />}
                                <span className='italic text-sm'>
                                    {(100 * (thisMonthConversionRate - totalConversionRate) / totalConversionRate).toFixed()}%
                                    <br />
                                    from total
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className='grid grid-cols-[2fr_3fr_2fr]'>
                <div className='mx-1 col-span-2'>
                    <TimeSeriesChart
                        dates={dailyDates}
                        valueSet={[dailyCounts, dailyFormConversions]}
                        titles={["Journeys", "Conversions"]}
                        chartName='Daily Journeys'
                        onClick={handleChartClick}
                        id='daily-journeys-chart'
                    />
                </div>
                <div className=' mx-1'>
                    <BarChart
                        labels={monthlyDates}
                        values={monthlyCounts}
                        title='Monthly Journeys'
                        onClick={handleChartClick}
                        id='monthly-journeys-chart'
                    />
                </div>

                <div className='col-span-1 mx-2 text-left'>
                    <h2 className='text-2xl'>Current Journey</h2>
                    <div className=' bg-foreground font-serif m-2 px-2 rounded-sm'>
                        <h3 className='text-xl'>Current Steps: {userJourney ? userJourney.steps.length : <div>Loading...</div>}</h3>
                        <ul className='overflow-y-scroll overflow-x-hidden max-h-60'>
                            {userJourney ? userJourney.steps.map((step, index) => (
                                <li
                                    key={index}
                                    className='p-2 bg-foreground border-t-2 border-border'>
                                    {step.action} on {step.elementId}
                                    <br />
                                    page: {step.pageUrl.startsWith("/") ? step.pageUrl.slice(1) : step.pageUrl}</li>
                            )) : <div>Loading...</div>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
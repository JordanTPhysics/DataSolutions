"use client";

import React, { useEffect, useState } from 'react';
import Chart, { TimeScale } from 'chart.js/auto';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartColors, ChartColors } from '../../lib/themeColours';

Chart.register(
    TimeScale,
    ChartDataLabels
);

type TimeSeriesChartProps = {
    dates: string[],
    values: number[],
    title: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
    id?: string,
};

const CreateDataSet = (dates: string[], values: number[], title: string, chartColours: ChartColors) => {
    const data = dates.map((date, index) => ({
        x: date,
        y: values[index],
    }));

    return {
        label: title,
        data,
        backgroundColor: 'indigo',
        borderColor: 'indigo', // Line color
        borderWidth: 2, // Line thickness
        tension: 0.2, // Controls line smoothness (0 for straight lines)
        showLine: true, // Connect points with a line
        fill: false, // Disable area filling under the line
        fillOpacity: 0.2, // Area fill opacity
        pointRadius: 4, // Point size
    };
};



const TimeSeriesChart = ({ dates, values, title }: TimeSeriesChartProps) => {
    const [chartColours, setChartColours] = useState<ChartColors>(getChartColors());

    useEffect(() => {
        const updateChartColours = () => {
            setChartColours(getChartColors());
        };
        // Update colors initially
        updateChartColours();
        // Observe changes to the 'dark' class on the <html> element
        const observer = new MutationObserver(() => updateChartColours());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const options: ChartOptions<'scatter'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 24,
                    family: 'Serif',
                },
                color: chartColours.text,
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        return `${label} ${context.parsed.y.toFixed(2)}`;
                    },
                    title: (context) => {
                        return `${new Date(context[0].parsed.x).toDateString()}`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    parser: 'YYYY-MM-DD',
                    tooltipFormat: 'DD/MM/YYYY',
                    displayFormats: {
                        day: 'MM-DD'
                    },
                },
                title: {
                    display: true,
                    text: 'Date',
                    color: 'white',
                    font: {
                        size: 18,
                        family: 'Serif',
                    },
                },
                ticks: {
                    color: chartColours.text,
                    font: {
                        size: 14,
                        family: 'Serif',
                    },
                },
            },
            y: {
                title: {
                    display: false,
                    text: title,
                    color: chartColours.text,
                },
                max: Math.max(...values) + 1,
                min: 0,

                ticks: {
                    color: chartColours.text,
                    font: {
                        size: 14,
                        family: 'Serif',
                    },
                },
            },
        },

    };

    const chartData = {
        datasets: [
            CreateDataSet(dates, values, title, chartColours),
        ],
    };

    return dates ? <div className="w-full min-h-[400px] max-h-full bg-foreground rounded-lg border-4 border-border m-1 p-1 hover:scale-105 duration-200 ease-linear">  <Scatter data={chartData} options={options} /> </div> : "Loading...";
};

export default TimeSeriesChart;

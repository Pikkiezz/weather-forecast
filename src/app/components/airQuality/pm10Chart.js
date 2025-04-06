"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import dynamic from 'next/dynamic';
import Loading from "@/app/svg/loading";


const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-full"><Loading /></div>
});

export default function pm10Chart() {
    const { location } = useWeather();
    const airQualityData = location?.airQualityData?.hourly;   

    if (!airQualityData?.time) {
        return <div>Loading...</div>;
    }

   
    const chartData = {
        options: {
            chart: {
                type: 'line',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            xaxis: {
                categories: airQualityData.time.slice(0, 24).map(time => 
                    new Date(time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: location.weatherData.timezone
                    })
                ),
                labels: {
                    style: {
                        colors: '#666'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'PM 10 (µg/m³)'
                },
                labels: {
                    formatter: (value) => `${Math.round(value)} µg/m³`
                }
            },
            title: {
                text: '24-Hour PM 10 Forecast',
                align: 'left',
                style: {
                    fontSize: '16px'
                }
            },
            grid: {
                borderColor: '#f1f1f1'
            },
            tooltip: {
                y: {
                    formatter: (value) => `${Math.round(value)}°C`
                }
            },
            theme: {
                palette: 'palette1'
            }
        },
        series: [{
            name: 'PM 10',
            data: airQualityData.pm10.slice(0, 24)
        }]
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-lg">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
}

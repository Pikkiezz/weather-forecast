"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import dynamic from 'next/dynamic';
import Loading from "@/app/svg/loading";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-full"><Loading /></div>
});

export default function HourlyChart() {
    const { location } = useWeather();
    const hourlyData = location?.weatherData?.hourly;   

    if (!hourlyData?.time) {
        return <div className="flex justify-center items-center h-full"><Loading /></div>;
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
                categories: hourlyData.time.slice(0, 24).map(time => 
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
                    text: 'Temperature (°C)'
                },
                labels: {
                    formatter: (value) => `${Math.round(value)}°C`
                }
            },
            title: {
                text: '24-Hour Temperature Forecast',
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
            name: 'Temperature',
            data: hourlyData.temperature_2m.slice(0, 24)
        }]
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
}

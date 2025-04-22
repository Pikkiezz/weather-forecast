"use client";

import { useWeather } from "@/app/Context/WeatherContext";
import dynamic from 'next/dynamic';
import Loading from "@/app/svg/loading";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    loading: () => <div className="flex justify-center items-center h-full"><Loading /></div>
});

export default function DailyChart() {
    const { location } = useWeather();
    const dailyData = location?.weatherData?.daily;

    if (!dailyData?.time) {
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
                categories: dailyData.time.slice(0, 7).map(time => 
                    new Date(time).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
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
                text: '7-Days Temperature Forecast',
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
            data: dailyData.temperature_2m_max.slice(0, 7)
        }]
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md" 
             style={{ 
                 overscrollBehavior: 'none',
                 WebkitOverflowScrolling: 'touch'
             }}>
            <ReactApexChart
                options={{
                    ...chartData.options,
                    chart: {
                        ...chartData.options.chart,
                        zoom: {
                            enabled: false
                        },
                        pan: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    }
                }}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
}

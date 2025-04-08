const airQualityLevels = {
    
    pm10: {
        good: { range: "0-20", description: "Good level of PM10" },
        moderate: { range: "20-50", description: "Moderate level of PM10" },
        unhealthy: { range: "50-100", description: "Unhealthy level of PM10" },
        hazardous: { range: ">100", description: "Hazardous level of PM10" }
    },
    pm2_5: {
        good: { range: "0-10", description: "Good level of PM2.5" },
        moderate: { range: "10-25", description: "Moderate level of PM2.5" },
        unhealthy: { range: "25-50", description: "Unhealthy level of PM2.5" },
        hazardous: { range: ">50", description: "Hazardous level of PM2.5" }
    },
    carbon_monoxide: {
        good: { range: "0-4.4", description: "Good level - Normal conditions", color: "#4CAF50" },
        moderate: { range: "4.5-9.4", description: "Moderate level - Acceptable", color: "#FFC107" },
        unhealthy_sensitive: { range: "9.5-12.4", description: "Unhealthy for sensitive groups", color: "#FF9800" },
        unhealthy: { range: "12.5-15.4", description: "Unhealthy - Health effects", color: "#F44336" },
        very_unhealthy: { range: "15.5-30.4", description: "Very unhealthy - Health alert", color: "#9C27B0" },
        hazardous: { range: ">30.5", description: "Hazardous - Emergency conditions", color: "#880E4F" }
    }
};

export const getQualityLevel = (value, type) => {
    if (value === 'N/A') return { level: 'N/A', color: '#666' };

    switch(type) {
        case 'pm10':
            if (value <= 20) return { level: airQualityLevels.pm10.good.description, color: '#4CAF50' };
            if (value <= 50) return { level: airQualityLevels.pm10.moderate.description, color: '#FFC107' };
            if (value <= 100) return { level: airQualityLevels.pm10.unhealthy.description, color: '#F44336' };
            return { level: airQualityLevels.pm10.hazardous.description, color: '#880E4F' };

        case 'pm2_5':
            if (value <= 10) return { level: airQualityLevels.pm2_5.good.description, color: '#4CAF50' };
            if (value <= 25) return { level: airQualityLevels.pm2_5.moderate.description, color: '#FFC107' };
            if (value <= 50) return { level: airQualityLevels.pm2_5.unhealthy.description, color: '#F44336' };
            return { level: airQualityLevels.pm2_5.hazardous.description, color: '#880E4F' };

        case 'carbon_monoxide':
            if (value <= 4.4) return { level: airQualityLevels.carbon_monoxide.good.description, color: airQualityLevels.carbon_monoxide.good.color };
            if (value <= 9.4) return { level: airQualityLevels.carbon_monoxide.moderate.description, color: airQualityLevels.carbon_monoxide.moderate.color };
            if (value <= 12.4) return { level: airQualityLevels.carbon_monoxide.unhealthy_sensitive.description, color: airQualityLevels.carbon_monoxide.unhealthy_sensitive.color };
            if (value <= 15.4) return { level: airQualityLevels.carbon_monoxide.unhealthy.description, color: airQualityLevels.carbon_monoxide.unhealthy.color };
            if (value <= 30.4) return { level: airQualityLevels.carbon_monoxide.very_unhealthy.description, color: airQualityLevels.carbon_monoxide.very_unhealthy.color };
            return { level: airQualityLevels.carbon_monoxide.hazardous.description, color: airQualityLevels.carbon_monoxide.hazardous.color };

        default:
            return { level: 'Unknown', color: '#666' };
    }
};


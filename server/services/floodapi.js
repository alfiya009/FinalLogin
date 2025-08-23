// server/services/floodApi.js

// Dummy data to simulate an external API call
const dummyFloodData = {
    'Andheri East': 'low',
    'Andheri West': 'high',
    'Bandra East': 'moderate',
    'Bandra West': 'low',
    'Borivali East': 'high',
    'Borivali West': 'moderate',
    'Colaba': 'high',
    'Dadar East': 'low',
    'Dadar West': 'high',
    'Fort': 'low',
    'Ghatkopar East': 'moderate',
    'Ghatkopar West': 'high',
    'Juhu': 'low',
    'Kandivali East': 'high',
    'Kandivali West': 'moderate',
    'Kurla East': 'high',
    'Kurla West': 'high',
    'Lower Parel': 'moderate',
    'Malad East': 'low',
    'Malad West': 'high',
    'Marine Lines': 'low',
    'Powai': 'moderate',
    'Santa Cruz East': 'low',
    'Santa Cruz West': 'moderate',
    'Thane West': 'low',
    'Versova': 'high',
    'Vikhroli East': 'low',
    'Vikhroli West': 'moderate',
    'Worli': 'high'
};

exports.getFloodRiskByCity = (city) => {

    const risk = dummyFloodData[city] || 'low';
    return risk;
};
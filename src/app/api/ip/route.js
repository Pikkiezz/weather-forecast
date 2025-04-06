import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = await fetch('https://api.db-ip.com/v2/free/self');
    const data = await response.json();
    
    console.log('IP API Response:', data);

    return Response.json({
      ip: data.ipAddress,
      city: data.city,
      province: data.stateProv,
      country: data.countryName
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to fetch IP' }, { status: 500 });
  }
}
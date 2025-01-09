import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Set CORS headers
  const allowedOrigins = ['https://www.belbullets.run']; // Add more origins if necessary
  const origin = request.headers.get('origin') || ''; // Default to empty string if null
  
  // Ensure the origin is valid
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  // Handle OPTIONS request for preflight checks
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }

  try {
    const { refreshToken } = await request.json();

    const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strava API error:', errorText);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to refresh token' }),
        { status: 400, headers }
      );
    }

    const tokens = await response.json();
    return new NextResponse(JSON.stringify(tokens), { headers });
  } catch (error) {
    console.error('Token refresh error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    );
  }
}

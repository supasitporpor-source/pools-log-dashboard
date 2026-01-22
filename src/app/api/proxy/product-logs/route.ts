import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Proxying request to external API...');
    
    const response = await fetch('https://por-vibecode.vercel.app/api/product-logs', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Proxy/1.0',
      },
      cache: 'no-store', // Disable caching for real-time data
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('External API response:', data);

    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch data from external API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
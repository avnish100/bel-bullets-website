const STRAVA_CLIENT_ID = "125102"
const STRAVA_CLIENT_SECRET = "baf7f62b9ccc8636309d04404f9673f3c8bc9f95"
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/strava/callback`

export async function getStravaAuthUrl(state: string) {
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}`
    const scope = 'read,activity:read'
    
    return `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}&state=${state}`
  }
  
  export async function exchangeStravaCode(code: string) {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    })
  
    if (!response.ok) {
      throw new Error('Failed to exchange Strava code')
    }
  
    return response.json()
  }
  
  
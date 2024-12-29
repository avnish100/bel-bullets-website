const STRAVA_CLUB_ID = 'belbullets' // Replace with your actual Strava club ID

export async function fetchClubActivities() {
  const response = await fetch(`https://www.strava.com/api/v3/clubs/${STRAVA_CLUB_ID}/activities?per_page=200`, {
    headers: {
      'Authorization': 'Bearer ' + process.env.STRAVA_ACCESS_TOKEN
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch club activities')
  }

  return response.json()
}


export type Profile = {
    id: string
    email: string
    strava_access_token: string | null
    strava_refresh_token: string | null
    strava_token_expires_at: number | null
  }
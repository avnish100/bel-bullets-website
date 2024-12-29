// types/strava-auth.ts
export interface StravaTokens {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    token_type: string;
    athlete?: {
      id: number;
      firstname: string;
      lastname: string;
    };
  }
  
  export interface StravaProfile {
    id: string;
    strava_access_token: string | null;
    strava_refresh_token: string | null;
    strava_token_expires_at: number | null;
    strava_athlete_id: number | null;
  }
  
  export type TokenStatus = {
    isValid: boolean;
    accessToken: string;
  };
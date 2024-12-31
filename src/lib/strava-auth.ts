import { createClient } from '@/utils/supabase/client';
import type { StravaTokens, TokenStatus } from '@/types/strava-auth';

export class StravaAuthService {
  private static instance: StravaAuthService;
  private supabase;

  private constructor() {
    this.supabase = createClient();
  }

  public static getInstance(): StravaAuthService {
    if (!StravaAuthService.instance) {
      StravaAuthService.instance = new StravaAuthService();
    }
    return StravaAuthService.instance;
  }

  private async refreshToken(refreshToken: string): Promise<StravaTokens> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to refresh Strava token');
    }

    return response.json();
  }

  private async updateTokens(userId: string, tokens: StravaTokens): Promise<void> {
    const { error } = await this.supabase
      .from('profiles')
      .update({
        strava_access_token: tokens.access_token,
        strava_refresh_token: tokens.refresh_token,
        strava_token_expires_at: tokens.expires_at,
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to update tokens: ${error.message}`);
    }
  }

  public async getValidToken(userId: string): Promise<TokenStatus> {
    try {
      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('strava_access_token, strava_refresh_token, strava_token_expires_at')
        .eq('id', userId)
        .single();

      if (error || !profile.strava_access_token || !profile.strava_refresh_token) {
        console.error('Profile data error:', error);
        console.error('Access token:', profile?.strava_access_token);
        console.error('Refresh token:', profile?.strava_refresh_token);
        throw new Error('No valid Strava credentials found');
      }

      const now = Math.floor(Date.now() / 1000);
      
      // If token is still valid, return it
      if (profile.strava_token_expires_at && profile.strava_token_expires_at > now) {
        return {
          isValid: true,
          accessToken: profile.strava_access_token,
        };
      }

      // Token has expired, refresh it
      const newTokens = await this.refreshToken(profile.strava_refresh_token);
      await this.updateTokens(userId, newTokens);

      return {
        isValid: true,
        accessToken: newTokens.access_token,
      };
    } catch (error) {
      console.error('Error getting valid token:', error);
      return {
        isValid: false,
        accessToken: '',
      };
    }
  }

  public async saveInitialTokens(userId: string, tokens: StravaTokens): Promise<void> {
    const { error } = await this.supabase
      .from('profiles')
      .update({
        strava_access_token: tokens.access_token,
        strava_refresh_token: tokens.refresh_token,
        strava_token_expires_at: tokens.expires_at,
        strava_athlete_id: tokens.athlete?.id,
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to save initial tokens: ${error.message}`);
    }
  }
}

export const getStravaAuth = () => StravaAuthService.getInstance();
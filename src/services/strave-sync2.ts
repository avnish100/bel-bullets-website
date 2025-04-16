import { createClient } from '@/utils/supabase/client';
import { getStravaAuth } from '@/lib/strava-auth';

// SAME AS ABOVE FILE BUT TRYING TO CAPTURE DETAILS FOR ACTIVITIES ALONG WITH RUNNING TO CREATE OTHER CHALLENGES 
export class StravaSyncService {
  private supabase;
  private stravaAuth;

  constructor() {
    this.supabase = createClient();
    this.stravaAuth = getStravaAuth();
  }

  async syncActivities(userId: string) {
    try {
      const { isValid, accessToken } = await this.stravaAuth.getValidToken(userId);
      
      if (!isValid) {
        throw new Error('Invalid Strava token');
      }

      // Get activities for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const response = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${Math.floor(startOfMonth.getTime() / 1000)}&per_page=100`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch activities from Strava');
      }

      const activities = await response.json();

      // Process and store each activity
      for (const activity of activities) {
        if (activity.type !== 'Run' ) continue;

        const { error } = await this.supabase
          .from('activities')
          .upsert({
            user_id: userId,
            activity_id: activity.id.toString(),
            name: activity.name,
            elapsed_time: activity.elapsed_time,
            type: activity.type,
            start_date: activity.start_date
          }, {
            onConflict: 'user_id,activity_id'
          });

        if (error) {
          console.error('Error inserting activity:', error);
        }
      }

      // Update sync status
      await this.supabase
        .from('profiles')
        .update({
          last_sync_time: new Date().toISOString(),
          last_sync_status: 'success'
        })
        .eq('id', userId);

    } catch (error) {
      console.error('Error syncing activities:', error);
      
      await this.supabase
        .from('profiles')
        .update({
          last_sync_time: new Date().toISOString(),
          last_sync_status: 'error'
        })
        .eq('id', userId);

      throw error;
    }
  }
}
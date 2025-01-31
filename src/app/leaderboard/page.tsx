'use client'

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { StravaSyncService } from '@/services/strava-sync';
import { Activity, Award, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from '@/components/ui/progress';
import CircularProgress from '@/components/circularProgress';
import router, { useRouter } from 'next/navigation';
import StravaAuth from '@/components/StravaAuth';
import { Button } from '@/components/ui/button';
import { useLeaderboard } from './LeaderboardContext';
import { client } from '@/sanity/lib/client'
import { SponsorshipBanner } from '@/components/sponsorship-banner';


interface LeaderboardEntry {
  rank: number;
  user_id: string;
  first_name: string;
  last_name: string;
  total_distance: number;
  total_time: number;
}

interface ActivityData {
  id: string
  start_date: string
  distance: number
  moving_time: number
}

interface CachedData {
  timestamp: number;
  data: any;
}

interface Cache {
  leaderboard?: CachedData;
  activities?: CachedData;
  userStats?: CachedData;
  rankedStats?: CachedData;
}

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  description: string;
  color: string;
}

const CACHE_DURATION = 5 * 60 * 1000; 

const cacheUtils = {
  get: (key: string): CachedData | null => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(`leaderboard_${key}`);
    if (!cached) return null;
    
    const parsedCache = JSON.parse(cached);
    if (Date.now() - parsedCache.timestamp > CACHE_DURATION) {
      localStorage.removeItem(`leaderboard_${key}`);
      return null;
    }
    return parsedCache;
  },

  set: (key: string, data: any) => {
    if (typeof window === 'undefined') return;
    const cacheData: CachedData = {
      timestamp: Date.now(),
      data: data
    };
    localStorage.setItem(`leaderboard_${key}`, JSON.stringify(cacheData));
  },

  getCacheKey: (userId: string, type: string) => {
    const date = new Date();
    return `${userId}_${type}_${date.getMonth()}_${date.getFullYear()}`;
  }
};

const fullRankings = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  user_id: `user_${i + 1}`,
  first_name: `First${i + 1}`,
  last_name: `Last${i + 1}`,
  total_distance: 150.5 - i,
  total_time: 54000 - i * 100,
}));

export default function Leaderboard() {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [topRunners, setTopRunners] = useState<LeaderboardEntry[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [hasStravaToken, setHasStravaToken] = useState<boolean>(false);
  const { setFullRankings } = useLeaderboard();
  const [cache, setCache] = useState<Cache>({});
  const [userStats, setUserStats] = useState<{
    rank: number;
    distance: number;
    time: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const monthlyDistanceGoal = 100;
  const router = useRouter();

  async function fetchLeaderboardData() {
    if (!userId) return;

    try {
      const cacheKey = cacheUtils.getCacheKey(userId, 'leaderboard');
      const cachedData = cacheUtils.get(cacheKey);

      if (cachedData) {
        setTopRunners(cachedData.data.topRunners);
        setUserStats(cachedData.data.userStats);
        setFullRankings(cachedData.data.rankedStats);
        return;
      }

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      const syncService = new StravaSyncService();
      await syncService.syncActivities(userId);

      const { data: stats, error: statsError } = await supabase
        .from('monthly_stats')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .order('total_distance', { ascending: false });

      if (statsError) throw statsError;

      const userIds = stats?.map(stat => stat.user_id) || [];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      const rankedStats = stats.map((stat, index) => {
        const profile = profiles.find(p => p.id === stat.user_id);
        return {
          rank: index + 1,
          user_id: stat.user_id,
          first_name: profile?.first_name || 'Unknown',
          last_name: profile?.last_name || 'User',
          total_distance: stat.total_distance,
          total_time: stat.total_time
        };
      });

      const topRunnersData = rankedStats.slice(0, 5);
      const userRank = rankedStats.findIndex(stat => stat.user_id === userId);
      const userStatsData = userRank !== -1 ? {
        rank: userRank + 1,
        distance: rankedStats[userRank].total_distance,
        time: rankedStats[userRank].total_time
      } : null;

      // Cache the data
      cacheUtils.set(cacheKey, {
        topRunners: topRunnersData,
        userStats: userStatsData,
        rankedStats: rankedStats
      });

      setTopRunners(topRunnersData);
      setUserStats(userStatsData);
      setFullRankings(rankedStats);

    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  }

  async function fetchRecentActivities() {
    if (!userId) return;

    try {
      const cacheKey = cacheUtils.getCacheKey(userId, 'activities');
      const cachedData = cacheUtils.get(cacheKey);

      if (cachedData) {
        setActivities(cachedData.data);
        return;
      }

      const { data, error } = await supabase
        .from('activities')
        .select('id, start_date, distance, moving_time')
        .eq('user_id', userId)
        .order('start_date', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Cache the data
      cacheUtils.set(cacheKey, data);
      setActivities(data);

    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  }
  
  useEffect(() => {
    async function fetchSponsor() {
      const query = `*[_type == "sponsor"][0]{
        name,
        "logo": logo.asset->url,
        url,
        description,
        color
      }`;
      const data = await client.fetch(query);

      if (data) {
        console.log("data", data);
        setSponsor(data);
      } else {
        console.error('Error fetching sponsor data from Sanity');
      }
    }

    fetchSponsor();
  }, []);
  useEffect(() => {
    async function getSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      if (session?.user?.id) {
        setUserId(session.user.id);
      }else {
        router.push('/login'); // Redirect to login if no user is found
      }
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    async function checkStravaToken() {
      if (!userId) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('strava_access_token')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        setHasStravaToken(!!data?.strava_access_token);

      } catch (error) {
        console.error('Error checking Strava token:', error);
      }
    }

    checkStravaToken();
  }, [userId, supabase]);

  useEffect(() => {
    if (userId && hasStravaToken === true) {
      setLoading(true);
      Promise.all([
        fetchLeaderboardData(),
        fetchRecentActivities()
      ]).finally(() => {
        setLoading(false);
      });
    } 
  }, [userId, hasStravaToken]);

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0'); // Ensures two-digit day
    const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    const year = String(date.getUTCFullYear()).slice(-2); // Extract last two digits of year

    return `${day} ${month} ${year}`;
  };

  if (!userId) {
    return (
      <div className="container py-12 mt-10 mx-auto">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please sign in to view the leaderboard
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-12 mt-10 mx-auto">
        <Card>
          <CardContent className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

if (!hasStravaToken) {
    return (
      <div className="container py-12 mt-10 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Strava Account</CardTitle>
            <CardDescription>
              Please connect your Strava account to view the leaderboard and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-8">
            <StravaAuth />
          </CardContent>
        </Card>
      </div>
    );
  }
  function getRankSuffix(rank: number): React.ReactNode {
    const j = rank % 10,
          k = rank % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  }

  return (
    <div className="container py-12 dark mt-10 mx-auto">
      {sponsor && (
        <SponsorshipBanner name={sponsor.name} logo={sponsor.logo} url={sponsor.url} />
      )}
      <div className="grid gap-8 md:grid-cols-3 box-shadow-md">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-6 w-6 text-primary" />
                    Top Runners
                  </CardTitle>
                  <CardDescription>This month's top 5 runners</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Distance (km)</TableHead>
                        <TableHead className="text-right">Total Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topRunners.map((runner) => (
                        <TableRow key={runner.user_id}>
                          <TableCell className="font-medium">{runner.rank}</TableCell>
                          <TableCell>{`${runner.first_name} ${runner.last_name}`}</TableCell>
                          <TableCell>{runner.total_distance.toFixed(1)}</TableCell>
                          <TableCell className="text-right">{formatTime(runner.total_time)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => router.push('/leaderboard/full-rankings')}
                      variant="outline"
                    >
                      View Full Rankings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-6 w-6 text-primary" />
                    Your Position
                  </CardTitle>
                  <CardDescription>See how you compare to other runners</CardDescription>
                </CardHeader>
                <CardContent>
                  {userStats ? (
                    <div className="text-center">
                       <p className="text-6xl font-bold text-primary mb-2">{userStats.rank}<span className="text-2xl">{getRankSuffix(userStats.rank)}</span></p>
                      <p className="text-xl mb-4">
                        {userStats.rank <= 10 ? "Great job! You're in the top 10!" : "Keep pushing!"}
                      </p>
                      <p>Distance: {userStats.distance.toFixed(1)} km</p>
                      <p>Total Time: {formatTime(userStats.time)}</p>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No activities recorded this month
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
              Monthly Goal Progress
            </CardTitle>
            <CardDescription>Track your progress towards your monthly goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
            
              <CircularProgress progress={((userStats?.distance ?? 1) / monthlyDistanceGoal) * 100} size={200}/>
              <p className="text-center text-xl font-semibold">
                {userStats?.distance.toFixed(0)} / {monthlyDistanceGoal} km
              </p>
              <p className="text-center text-muted-foreground">
                {((userStats?.distance ?? 1) / monthlyDistanceGoal * 100).toFixed(0)}% completed keep pushing !
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-6 w-6 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>Your latest running sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Distance (km)</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Pace (min/km)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{formatDate(activity.start_date)}</TableCell>
                    <TableCell>{activity.distance.toFixed(1)}</TableCell>
                    <TableCell>{formatTime(activity.moving_time)}</TableCell>
                    <TableCell className="text-right">
                      {formatTime(Math.round(activity.moving_time / activity.distance))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


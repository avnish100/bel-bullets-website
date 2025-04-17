'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  first_name: string;
  last_name: string;
  activity_count: number;
  total_time: number;
}

interface LeaderboardContextType {
  fullRankings: LeaderboardEntry[];
  setFullRankings: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export function LeaderboardProvider({ children }: { children: ReactNode }) {
  const [fullRankings, setFullRankings] = useState<LeaderboardEntry[]>([]);

  return (
    <LeaderboardContext.Provider value={{ fullRankings, setFullRankings }}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
}


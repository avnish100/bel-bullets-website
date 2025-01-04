import { LeaderboardProvider } from './LeaderboardContext';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LeaderboardProvider>{children}</LeaderboardProvider>
}


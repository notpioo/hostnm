export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'member' | 'admin';
  createdAt: Date;
  gamesPlayed: number;
  wins: number;
  rankPoints: number;
}

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  winRate: number;
  rankPoints: number;
}

export interface Activity {
  id: string;
  userId: string;
  description: string;
  game: string;
  points: number;
  timestamp: Date;
}

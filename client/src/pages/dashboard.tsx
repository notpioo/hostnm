import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  Target, 
  Star, 
  Clock, 
  Gamepad,
  TrendingUp,
  Award,
  Zap,
  Calendar,
  UserCheck,
  MessageCircle,
  User
} from "lucide-react";

export default function Dashboard() {
  const { userProfile, logout } = useAuth();

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loading-spinner h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Mock data - in a real app, this would come from your backend/Firebase
  const stats = {
    gamesPlayed: 127,
    winRate: 73,
    rank: "Gold II",
    points: 2450,
    level: 42,
    wins: 93,
    tournaments: 12,
    friends: 156
  };

  const recentActivities = [
    {
      id: 1,
      type: "tournament_win",
      title: "Won Tournament: Friday Night Fight",
      time: "2 hours ago",
      points: "+500 pts",
      icon: Trophy,
      color: "text-yellow-400"
    },
    {
      id: 2,
      type: "friend_added",
      title: "New friend added: GamerPro_2023",
      time: "5 hours ago",
      points: null,
      icon: UserCheck,
      color: "text-blue-400"
    },
    {
      id: 3,
      type: "level_up",
      title: "Level Up! Reached Level 42",
      time: "1 day ago",
      points: "+200 pts",
      icon: TrendingUp,
      color: "text-green-400"
    }
  ];

  const activeTournaments = [
    {
      id: 1,
      name: "Weekend Warriors",
      prize: "$500",
      timeLeft: "24h left",
      participants: 128
    },
    {
      id: 2,
      name: "Midnight Madness",
      prize: "$1000",
      timeLeft: "3d left",
      participants: 256
    }
  ];

  const onlineFriends = [
    {
      id: 1,
      username: "ProGamer_X",
      status: "Playing Valorant",
      avatar: "PG"
    },
    {
      id: 2,
      username: "EliteSniper",
      status: "In Tournament",
      avatar: "ES"
    },
    {
      id: 3,
      username: "SkillzMaster",
      status: "Playing CS:GO",
      avatar: "SM"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-muted to-card border-b border-border px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{userProfile.fullName}</h1>
                <p className="text-muted-foreground">@{userProfile.username}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{stats.rank}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{stats.points} pts</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="gaming-card">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stats.wins}</div>
                  <div className="text-sm text-muted-foreground">Wins</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stats.tournaments}</div>
                  <div className="text-sm text-muted-foreground">Tournaments</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stats.friends}</div>
                  <div className="text-sm text-muted-foreground">Friends</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stats.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-primary/20 hover:bg-primary/30 text-primary p-6 h-auto flex-col space-y-2 border border-primary/20">
                    <Gamepad className="h-6 w-6" />
                    <span className="text-sm font-medium">Quick Match</span>
                  </Button>
                  <Button className="bg-primary/20 hover:bg-primary/30 text-primary p-6 h-auto flex-col space-y-2 border border-primary/20">
                    <Trophy className="h-6 w-6" />
                    <span className="text-sm font-medium">Tournaments</span>
                  </Button>
                  <Button className="bg-primary/20 hover:bg-primary/30 text-primary p-6 h-auto flex-col space-y-2 border border-primary/20">
                    <Users className="h-6 w-6" />
                    <span className="text-sm font-medium">Find Team</span>
                  </Button>
                  <Button className="bg-primary/20 hover:bg-primary/30 text-primary p-6 h-auto flex-col space-y-2 border border-primary/20">
                    <Target className="h-6 w-6" />
                    <span className="text-sm font-medium">Practice</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg border border-border">
                      <div className={`w-10 h-10 bg-background rounded-full flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.points && (
                        <div className="text-primary font-semibold">{activity.points}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Active Tournaments */}
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  Active Tournaments
                  <Badge variant="secondary" className="ml-auto bg-primary text-primary-foreground">
                    {activeTournaments.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTournaments.map((tournament) => (
                    <div key={tournament.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <h3 className="font-medium mb-2 text-foreground">{tournament.name}</h3>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                        <span>Prize: {tournament.prize}</span>
                        <span>{tournament.timeLeft}</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-muted-foreground">{tournament.participants} players</span>
                      </div>
                      <Button className="btn-primary w-full" size="sm">
                        Join Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Friends Online */}
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  Friends Online
                  <Badge variant="secondary" className="ml-auto bg-green-500 text-white">
                    {onlineFriends.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {onlineFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">{friend.avatar}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-card"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{friend.username}</p>
                        <p className="text-xs text-muted-foreground">{friend.status}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-primary hover:text-primary/80">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Latest Achievement */}
            <Card className="gaming-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  Latest Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="font-medium mb-2 text-foreground">Headshot Master</div>
                  <div className="text-sm text-muted-foreground">Get 100 headshots in competitive matches</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

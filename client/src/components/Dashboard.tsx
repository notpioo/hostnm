import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  const recentActivity = [
    {
      id: '1',
      description: 'Won a ranked match in Mobile Legends',
      game: 'ML',
      points: 25,
      timestamp: '2 hours ago',
      color: 'bg-nomercy-orange',
    },
    {
      id: '2',
      description: 'Completed daily quest in Roblox',
      game: 'RB',
      points: 10,
      timestamp: '5 hours ago',
      color: 'bg-blue-600',
    },
    {
      id: '3',
      description: 'Built new world in Growtopia',
      game: 'GT',
      points: 50,
      timestamp: '1 day ago',
      color: 'bg-green-600',
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'ML Tournament Finals',
      date: 'March 15, 2024',
      status: 'Registered',
      statusColor: 'bg-nomercy-orange',
    },
    {
      id: '2',
      title: 'Roblox Build Contest',
      date: 'March 20, 2024',
      status: 'Open',
      statusColor: 'bg-gray-500',
    },
  ];

  const winRate = user.gamesPlayed > 0 ? Math.round((user.wins / user.gamesPlayed) * 100) : 0;

  return (
    <div className="min-h-screen pt-16 bg-nomercy-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 orbitron">
              Welcome back, <span className="text-nomercy-orange">{user.fullName}</span>!
            </h1>
            <p className="text-gray-400">Ready to dominate your games today?</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                user.role === 'admin' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {user.role === 'admin' ? 'Admin' : 'Member'}
              </span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:text-white hover:border-nomercy-orange"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="gaming-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Games Played</p>
                <p className="text-2xl font-bold text-white orbitron">{user.gamesPlayed}</p>
              </div>
              <div className="w-12 h-12 gaming-gradient rounded-lg flex items-center justify-center text-xl">🎮</div>
            </div>
          </div>
          
          <div className="gaming-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Wins</p>
                <p className="text-2xl font-bold text-white orbitron">{user.wins}</p>
              </div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-xl">🏆</div>
            </div>
          </div>
          
          <div className="gaming-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white orbitron">{winRate}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-xl">📊</div>
            </div>
          </div>
          
          <div className="gaming-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rank Points</p>
                <p className="text-2xl font-bold text-white orbitron">{user.rankPoints}</p>
              </div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-xl">⭐</div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="gaming-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 orbitron">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-nomercy-gray-dark rounded-lg">
                    <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center text-sm font-bold`}>
                      {activity.game}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.description}</p>
                      <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                    </div>
                    <div className="text-nomercy-orange font-medium">+{activity.points} XP</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Admin Panel */}
            {user.role === 'admin' && (
              <div className="gaming-card rounded-xl p-6 mt-8 border border-nomercy-orange">
                <h3 className="text-xl font-bold text-nomercy-orange mb-6 orbitron">Admin Panel</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="bg-nomercy-gray-dark hover:bg-nomercy-orange/20 p-4 h-auto text-left justify-start">
                    <div>
                      <div className="text-nomercy-orange mb-2">👥</div>
                      <div className="font-medium">Manage Users</div>
                      <div className="text-sm text-gray-400">View and moderate community members</div>
                    </div>
                  </Button>
                  <Button className="bg-nomercy-gray-dark hover:bg-nomercy-orange/20 p-4 h-auto text-left justify-start">
                    <div>
                      <div className="text-nomercy-orange mb-2">🏆</div>
                      <div className="font-medium">Tournaments</div>
                      <div className="text-sm text-gray-400">Create and manage tournaments</div>
                    </div>
                  </Button>
                  <Button className="bg-nomercy-gray-dark hover:bg-nomercy-orange/20 p-4 h-auto text-left justify-start">
                    <div>
                      <div className="text-nomercy-orange mb-2">📊</div>
                      <div className="font-medium">Analytics</div>
                      <div className="text-sm text-gray-400">View community statistics</div>
                    </div>
                  </Button>
                  <Button className="bg-nomercy-gray-dark hover:bg-nomercy-orange/20 p-4 h-auto text-left justify-start">
                    <div>
                      <div className="text-nomercy-orange mb-2">📢</div>
                      <div className="font-medium">Announcements</div>
                      <div className="text-sm text-gray-400">Post community updates</div>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="gaming-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 orbitron">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start text-white bg-nomercy-gray-dark hover:bg-nomercy-orange/20">
                  📱 Find Teammates
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white bg-nomercy-gray-dark hover:bg-nomercy-orange/20">
                  🏆 Join Tournament
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white bg-nomercy-gray-dark hover:bg-nomercy-orange/20">
                  💬 Community Chat
                </Button>
                <Button variant="ghost" className="w-full justify-start text-white bg-nomercy-gray-dark hover:bg-nomercy-orange/20">
                  ⚙️ Settings
                </Button>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="gaming-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 orbitron">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-nomercy-gray-dark rounded-lg p-4">
                    <div className="font-medium mb-1 text-white">{event.title}</div>
                    <div className="text-sm text-gray-400 mb-2">{event.date}</div>
                    <div className={`text-xs ${event.statusColor} px-2 py-1 rounded-full inline-block text-white`}>
                      {event.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

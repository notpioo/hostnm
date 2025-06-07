import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onShowAuth: (mode: 'login' | 'register') => void;
  onInstallPWA?: () => void;
  canInstall?: boolean;
}

export default function LandingPage({ onShowAuth, onInstallPWA, canInstall = false }: LandingPageProps) {
  const supportedGames = [
    {
      name: 'Mobile Legends',
      description: 'MOBA battles with strategic gameplay',
      memberCount: '234 members',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    },
    {
      name: 'Roblox',
      description: 'Creative multiplayer experiences',
      memberCount: '189 members',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    },
    {
      name: 'Growtopia',
      description: 'Sandbox world building adventure',
      memberCount: '156 members',
      image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    },
    {
      name: 'Honor of Kings',
      description: 'Epic MOBA championships',
      memberCount: '198 members',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    },
  ];

  const stats = {
    activeMembers: '1,247',
    gamesSupported: '8',
    tournamentsHeld: '156',
  };

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-nomercy-gray-bg via-nomercy-gray-dark to-nomercy-gray" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 gaming-gradient rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-20 w-48 h-48 bg-nomercy-orange rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-nomercy-orange rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-slide-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-nomercy-orange/10 border border-nomercy-orange/20 mb-6">
                <span className="text-nomercy-orange text-sm font-medium">🎮 Gaming Community</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 orbitron">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-nomercy-orange to-yellow-500 bg-clip-text text-transparent">NoMercy</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join the ultimate gaming community where players unite across Mobile Legends, Roblox, Growtopia, Honor of Kings, and more. 
                <span className="text-nomercy-orange font-medium"> No mercy, just victory!</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => onShowAuth('register')}
                  size="lg"
                  className="gaming-gradient hover:opacity-90 transform hover:scale-105 transition-all duration-200 text-lg px-8 py-4"
                >
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-nomercy-orange text-nomercy-orange hover:bg-nomercy-orange hover:text-white text-lg px-8 py-4"
                >
                  Explore Games
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-nomercy-orange orbitron">{stats.activeMembers}</div>
                  <div className="text-sm text-gray-400">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nomercy-orange orbitron">{stats.gamesSupported}</div>
                  <div className="text-sm text-gray-400">Games Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nomercy-orange orbitron">{stats.tournamentsHeld}</div>
                  <div className="text-sm text-gray-400">Tournaments</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="lg:pl-12 animate-slide-in">
              <div className="relative">
                <div className="gaming-card rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="aspect-square bg-gradient-to-br from-nomercy-orange/20 to-yellow-500/10 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl">🎮</div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-4 bg-nomercy-orange/30 rounded w-3/4" />
                    <div className="h-3 bg-gray-600 rounded w-1/2" />
                    <div className="h-3 bg-gray-600 rounded w-5/6" />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 gaming-gradient rounded-full flex items-center justify-center text-2xl animate-bounce">
                  🏆
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-lg animate-pulse">
                  ⚡
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 bg-gradient-to-b from-nomercy-gray-bg to-nomercy-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 orbitron">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Supported</span>
              <span className="bg-gradient-to-r from-nomercy-orange to-yellow-500 bg-clip-text text-transparent"> Games</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with fellow gamers across your favorite titles. Join tournaments, share strategies, and dominate together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportedGames.map((game, index) => (
              <div
                key={index}
                className="gaming-card rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-nomercy-orange/20"
              >
                <img
                  src={game.image}
                  alt={`${game.name} Gaming`}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-nomercy-orange font-medium text-sm">{game.memberCount}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="gaming-gradient hover:opacity-90 transition-opacity text-lg px-8 py-4"
            >
              View All Games
            </Button>
          </div>
        </div>
      </section>

      {/* Floating PWA Install Button */}
      {canInstall && onInstallPWA && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={onInstallPWA}
            size="lg"
            className="gaming-gradient hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-2xl rounded-full p-4"
            title="Install NoMercy App"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8l-8-8-8 8" />
            </svg>
            Install App
          </Button>
        </div>
      )}
    </main>
  );
}

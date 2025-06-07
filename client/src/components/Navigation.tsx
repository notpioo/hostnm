import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onShowAuth: (mode: 'login' | 'register') => void;
  onInstallPWA?: () => void;
  canInstall?: boolean;
}

export default function Navigation({ onShowAuth, onInstallPWA, canInstall = true }: NavigationProps) {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="glass-effect fixed w-full top-0 z-50 border-b border-nomercy-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gaming-gradient rounded-lg flex items-center justify-center font-bold text-white orbitron">
              NM
            </div>
            <span className="text-xl font-bold text-white orbitron">NoMercy</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-nomercy-orange hover:text-nomercy-orange transition-colors">Home</a>
            <a href="#games" className="text-gray-300 hover:text-white transition-colors">Games</a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors">Community</a>
            <a href="#events" className="text-gray-300 hover:text-white transition-colors">Events</a>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* PWA Install Button */}
            {canInstall && (
              <Button
                onClick={onInstallPWA}
                variant="outline"
                size="sm"
                className="border-nomercy-orange text-nomercy-orange hover:bg-nomercy-orange hover:text-white"
                title="Install NoMercy App"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8l-8-8-8 8" />
                </svg>
                Install App
              </Button>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white">{user.fullName}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Member'}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-nomercy-orange"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => onShowAuth('login')}
                  variant="outline"
                  size="sm"
                  className="border-nomercy-orange text-nomercy-orange hover:bg-nomercy-orange hover:text-white"
                >
                  Login
                </Button>
                <Button
                  onClick={() => onShowAuth('register')}
                  size="sm"
                  className="gaming-gradient hover:opacity-90"
                >
                  Join Now
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-nomercy-gray"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-nomercy-orange/20">
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block text-nomercy-orange font-medium">Home</a>
              <a href="#games" className="block text-gray-300 hover:text-white">Games</a>
              <a href="#community" className="block text-gray-300 hover:text-white">Community</a>
              <a href="#events" className="block text-gray-300 hover:text-white">Events</a>
              <div className="pt-4 space-y-3">
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300"
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => onShowAuth('login')}
                      variant="outline"
                      className="w-full border-nomercy-orange text-nomercy-orange"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => onShowAuth('register')}
                      className="w-full gaming-gradient"
                    >
                      Join Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

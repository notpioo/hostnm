import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/useAuth";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [canInstall, setCanInstall] = useState(true);

  useEffect(() => {
    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
      setCanInstall(true);
    };

    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone) {
        setCanInstall(false);
      } else {
        setCanInstall(true);
        // Show install banner after a delay for better UX
        setTimeout(() => setShowInstallBanner(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setCanInstall(false);
      setShowInstallBanner(false);
    });
    
    checkInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleShowAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted PWA install');
      }
      
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } else {
      // For iOS Safari and other browsers
      alert('To install this app:\n\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add"');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-nomercy-gray-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-nomercy-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nomercy-gray-bg text-white">
      <Navigation 
        onShowAuth={handleShowAuth} 
        onInstallPWA={handleInstallPWA}
        canInstall={canInstall}
      />
      
      {user ? <Dashboard /> : <LandingPage 
        onShowAuth={handleShowAuth} 
        onInstallPWA={handleInstallPWA}
        canInstall={canInstall}
      />}
      
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={setAuthMode}
        />
      )}

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-4 left-4 right-4 gaming-card rounded-xl p-4 z-50 animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gaming-gradient rounded-lg flex items-center justify-center font-bold text-white text-sm">
                NM
              </div>
              <div>
                <p className="text-white font-medium">Install NoMercy App</p>
                <p className="text-gray-400 text-sm">Get the full gaming experience</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleInstallPWA}
                className="px-4 py-2 text-sm font-medium text-white gaming-gradient rounded-lg hover:opacity-90 transition-opacity"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

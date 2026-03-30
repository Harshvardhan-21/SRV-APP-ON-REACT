import { useState } from 'react';
import { Home, Star, User, ScanQrCode, ChevronRight, Bell, TrendingUp, Gift, Users, History, Settings, Zap, Award, Wallet, Package } from 'lucide-react';
import { Home as HomeScreen } from './components/HomeScreen';
import { ScanScreen } from './components/ScanScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ProductScreen } from './components/ProductScreen';
import { WalletScreen } from './components/WalletScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet'>('onboarding');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [screenKey, setScreenKey] = useState(0);

  const handleGetStarted = () => {
    setShowOnboarding(false);
    setCurrentScreen('home');
    setScreenKey(k => k + 1);
  };

  const navigate = (screen: typeof currentScreen) => {
    setCurrentScreen(screen);
    setScreenKey(k => k + 1);
  };

  if (showOnboarding && currentScreen === 'onboarding') {
    return <OnboardingScreen onGetStarted={handleGetStarted} />;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'product', label: 'Product', icon: Package },
    { id: 'scan', label: 'SCAN', icon: ScanQrCode, isScan: true },
    { id: 'rewards', label: 'Gift Store', icon: Gift },
    { id: 'profile', label: 'More', icon: null, isMore: true },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col max-w-md mx-auto relative">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div key={screenKey} className="page-enter">
          {currentScreen === 'home' && <HomeScreen onNavigate={navigate} />}
          {currentScreen === 'scan' && <ScanScreen onNavigate={navigate} />}
          {currentScreen === 'rewards' && <RewardsScreen onNavigate={navigate} />}
          {currentScreen === 'profile' && <ProfileScreen onNavigate={navigate} />}
          {currentScreen === 'product' && <ProductScreen onNavigate={navigate} />}
          {currentScreen === 'wallet' && <WalletScreen onNavigate={navigate} />}
        </div>
      </div>

      {/* Enhanced Bottom Navigation with Elevated Scan Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-[#EDEDF5] px-2 pt-2 pb-3 rounded-t-3xl shadow-lg animate-slide-in-bottom">
        <div className="flex items-end justify-around relative">
          {/* Home */}
          <button
            onClick={() => navigate('home')}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90 ripple-container"
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              currentScreen === 'home' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'
            }`}>
              <Home
                className={`w-5 h-5 transition-all duration-300 ${currentScreen === 'home' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}
                strokeWidth={1.8}
              />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
              currentScreen === 'home' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'
            }`}>
              Home
            </span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'home' ? 'w-5 opacity-100 animate-nav-dot' : 'w-0 opacity-0'}`}></div>
          </button>

          {/* Product */}
          <button
            onClick={() => navigate('product')}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90 ripple-container"
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              currentScreen === 'product' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'
            }`}>
              <Package
                className={`w-5 h-5 transition-all duration-300 ${currentScreen === 'product' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}
                strokeWidth={1.8}
              />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
              currentScreen === 'product' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'
            }`}>
              Product
            </span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'product' ? 'w-5 opacity-100 animate-nav-dot' : 'w-0 opacity-0'}`}></div>
          </button>

          {/* Scan Button - Elevated & Centered */}
          <button
            onClick={() => navigate('scan')}
            className="relative -mt-8 mx-2 flex flex-col items-center gap-1 transition-transform active:scale-90"
          >
            <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl transition-all duration-300 animate-glow-pulse ${
              currentScreen === 'scan'
                ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] scale-110'
                : 'bg-gradient-to-br from-[#FF6B6B] to-[#FF5252]'
            }`}>
              <ScanQrCode className="w-7 h-7 text-white animate-sparkle" strokeWidth={2} />
              <div className="absolute inset-0 rounded-2xl bg-[#FF6B6B] opacity-25 animate-ping"></div>
            </div>
            <span className="text-[10px] font-bold text-[#FF6B6B] tracking-wide mt-1">
              SCAN
            </span>
          </button>

          {/* Gift Store */}
          <button
            onClick={() => navigate('rewards')}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90 ripple-container"
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              currentScreen === 'rewards' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'
            }`}>
              <Gift
                className={`w-5 h-5 transition-all duration-300 ${currentScreen === 'rewards' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}
                strokeWidth={1.8}
              />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
              currentScreen === 'rewards' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'
            }`}>
              Gift Store
            </span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'rewards' ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}></div>
          </button>

          {/* More (Profile) */}
          <button
            onClick={() => navigate('profile')}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90 ripple-container"
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${
              currentScreen === 'profile' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'
            }`}>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                </div>
                <div className="flex gap-0.5">
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                </div>
                <div className="flex gap-0.5">
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                  <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`}></div>
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
              currentScreen === 'profile' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'
            }`}>
              More
            </span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'profile' ? 'w-4 opacity-100' : 'w-0 opacity-0'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
}

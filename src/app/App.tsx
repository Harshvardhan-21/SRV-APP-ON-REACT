import { useState } from 'react';
import { Gift, Home, Package, ScanQrCode } from 'lucide-react';
import { Home as HomeScreen } from './components/HomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ProductScreen } from './components/ProductScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ScanScreen } from './components/ScanScreen';
import { WalletScreen } from './components/WalletScreen';

type Screen = 'onboarding' | 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet';
export type UserRole = 'dealer' | 'electrician';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [screenKey, setScreenKey] = useState(0);
  const [currentRole, setCurrentRole] = useState<UserRole>('electrician');

  const handleGetStarted = (role: UserRole) => {
    setCurrentRole(role);
    setShowOnboarding(false);
    setCurrentScreen('home');
    setScreenKey((value) => value + 1);
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setScreenKey((value) => value + 1);
  };

  if (showOnboarding && currentScreen === 'onboarding') {
    return <OnboardingScreen onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-[#F8F7FF]">
      <div className="flex-1 overflow-y-auto pb-24">
        <div key={screenKey} className="page-enter">
          {currentScreen === 'home' && <HomeScreen onNavigate={navigate} role={currentRole} />}
          {currentScreen === 'scan' && <ScanScreen onNavigate={navigate} />}
          {currentScreen === 'rewards' && <RewardsScreen onNavigate={navigate} />}
          {currentScreen === 'profile' && <ProfileScreen onNavigate={navigate} />}
          {currentScreen === 'product' && <ProductScreen onNavigate={navigate} />}
          {currentScreen === 'wallet' && <WalletScreen onNavigate={navigate} />}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-3xl border-t border-[#EDEDF5] bg-white px-2 pb-3 pt-2 shadow-lg animate-slide-in-bottom">
        <div className="relative flex items-end justify-around">
          <button
            onClick={() => navigate('home')}
            className="ripple-container flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${currentScreen === 'home' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'}`}>
              <Home className={`h-5 w-5 transition-all duration-300 ${currentScreen === 'home' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`} strokeWidth={1.8} />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${currentScreen === 'home' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}>Home</span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'home' ? 'w-5 opacity-100 animate-nav-dot' : 'w-0 opacity-0'}`} />
          </button>

          <button
            onClick={() => navigate('product')}
            className="ripple-container flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${currentScreen === 'product' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'}`}>
              <Package className={`h-5 w-5 transition-all duration-300 ${currentScreen === 'product' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`} strokeWidth={1.8} />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${currentScreen === 'product' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}>Product</span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'product' ? 'w-5 opacity-100 animate-nav-dot' : 'w-0 opacity-0'}`} />
          </button>

          <button
            onClick={() => navigate('scan')}
            className="relative -mt-8 mx-2 flex flex-col items-center gap-1 transition-transform active:scale-90"
          >
            <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 animate-glow-pulse ${currentScreen === 'scan' ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8787] scale-110' : 'bg-gradient-to-br from-[#FF6B6B] to-[#FF5252]'}`}>
              <ScanQrCode className="h-7 w-7 animate-sparkle text-white" strokeWidth={2} />
              <div className="absolute inset-0 rounded-2xl bg-[#FF6B6B] opacity-25 animate-ping" />
            </div>
            <span className="mt-1 text-[10px] font-bold tracking-wide text-[#FF6B6B]">SCAN</span>
          </button>

          <button
            onClick={() => navigate('rewards')}
            className="ripple-container flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${currentScreen === 'rewards' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'}`}>
              <Gift className={`h-5 w-5 transition-all duration-300 ${currentScreen === 'rewards' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`} strokeWidth={1.8} />
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${currentScreen === 'rewards' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}>Gift Store</span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'rewards' ? 'w-4 opacity-100' : 'w-0 opacity-0'}`} />
          </button>

          <button
            onClick={() => navigate('profile')}
            className="ripple-container flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all active:scale-90"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${currentScreen === 'profile' ? 'bg-[#FFF0F0] scale-110' : 'bg-transparent'}`}>
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-0.5">
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                </div>
                <div className="flex gap-0.5">
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                </div>
                <div className="flex gap-0.5">
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                  <div className={`h-1 w-1 rounded-full ${currentScreen === 'profile' ? 'bg-[#FF6B6B]' : 'bg-[#B0B0C0]'}`} />
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-semibold tracking-wide transition-colors duration-300 ${currentScreen === 'profile' ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}`}>More</span>
            <div className={`h-1 rounded-full bg-[#FF6B6B] transition-all duration-300 ${currentScreen === 'profile' ? 'w-4 opacity-100' : 'w-0 opacity-0'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

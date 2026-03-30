import { Check, ScanQrCode, Gift, Zap } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col max-w-md mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] px-5 py-8 flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] rounded-3xl flex items-center justify-center shadow-xl animate-bounce-in animate-glow-pulse">
          <Zap className="w-10 h-10 text-white animate-sparkle" fill="white" />
        </div>

        <div className="text-center animate-fade-in-up delay-200">
          <h1 className="text-white font-bold text-lg tracking-wide">SRV Electricals</h1>
          <p className="text-white/50 text-xs tracking-wide mt-1">Your Smart Rewards Platform</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 w-full mt-2">
          {[
            { icon: <Check className="w-4 h-4 text-white" strokeWidth={3} />, label: 'Buy', sub: 'SRV product', delay: 'delay-300' },
            { icon: <ScanQrCode className="w-4 h-4 text-white" strokeWidth={2.5} />, label: 'Scan', sub: 'QR on box', delay: 'delay-400' },
            { icon: <Gift className="w-4 h-4 text-white" strokeWidth={2.5} />, label: 'Win', sub: 'Rewards', delay: 'delay-500' },
          ].map((step, i) => (
            <>
              {i > 0 && <div key={`arrow-${i}`} className="text-white/25 text-lg animate-fade-in-up delay-350">›</div>}
              <div key={step.label} className={`flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 animate-fade-in-up ${step.delay} hover-lift`}>
                <div className="w-8 h-8 bg-[#FF6B6B] rounded-xl flex items-center justify-center animate-glow-pulse">
                  {step.icon}
                </div>
                <div className="text-white text-[10px] font-semibold">{step.label}</div>
                <div className="text-white/40 text-[9px]">{step.sub}</div>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-5 flex flex-col">
        <h2 className="text-[#2D3561] font-bold mb-2 animate-fade-in-up delay-200">Buy. Scan. Get rewarded.</h2>
        <p className="text-[#9090A8] text-xs leading-relaxed mb-6 animate-fade-in-up delay-300">
          Every SRV product has a hidden QR code. Scan it to earn points and unlock cashback, gifts & vouchers.
        </p>

        <div className="mt-auto space-y-3">
          <button
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 animate-fade-in-up delay-400 ripple-container animate-glow-pulse"
          >
            Get Started →
          </button>
          <button className="w-full border-2 border-[#E0DFEF] text-[#2D3561] font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all animate-fade-in-up delay-500 ripple-container">
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

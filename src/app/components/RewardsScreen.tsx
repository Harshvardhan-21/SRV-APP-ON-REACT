import { Star, Gift, Wallet, Zap, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface RewardsScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

export function RewardsScreen({ onNavigate }: RewardsScreenProps) {
  const [activeTab, setActiveTab] = useState('all');

  const rewards = [
    { icon: <Wallet className="w-7 h-7 text-[#FF6B6B]" />, name: '₹100 Cashback', description: 'Direct UPI / bank transfer', points: 500,  progress: 85, color: 'bg-[#FFF0F0]' },
    { icon: <Gift  className="w-7 h-7 text-[#06D6A0]" />, name: 'Amazon Voucher',  description: '₹200 gift card code',     points: 1000, progress: 42, color: 'bg-[#E6FDF5]' },
    { icon: <Star  className="w-7 h-7 text-[#378ADD]" />, name: 'SRV Product Bundle', description: 'Free kit worth ₹500',  points: 2000, progress: 60, color: 'bg-[#EFF4FF]' },
    { icon: <CreditCard className="w-7 h-7 text-[#F59E0B]" />, name: 'Paytm Voucher', description: '₹150 wallet credit',  points: 750,  progress: 70, color: 'bg-[#FFF8E1]' },
    { icon: <Zap   className="w-7 h-7 text-[#FF6B6B]" />, name: 'Premium Toolkit', description: 'Professional electrician kit', points: 3000, progress: 35, color: 'bg-[#FFF0F0]' },
    { icon: <Gift  className="w-7 h-7 text-[#06D6A0]" />, name: 'Flipkart Voucher', description: '₹300 shopping voucher', points: 1500, progress: 50, color: 'bg-[#E6FDF5]' },
  ];

  const barColors = ['bg-[#FF6B6B]', 'bg-[#06D6A0]', 'bg-[#378ADD]'];

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-0 border-b border-[#F0F0F8] animate-fade-in-down">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[#2D3561] font-bold text-base">Rewards Store</h1>
          <div className="bg-[#E6FDF5] border-2 border-[#06D6A0] rounded-xl px-3 py-1.5 flex items-center gap-1.5 animate-pop-in delay-100 hover-lift">
            <Star className="w-4 h-4 text-[#06D6A0] animate-sparkle" fill="#06D6A0" />
            <span className="text-[#047857] text-xs font-bold">4,250 pts</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 pb-3">
          {['all', 'cashback', 'gifts', 'more'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ripple-container active:scale-95 animate-fade-in-up capitalize`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className={activeTab === tab ? 'text-[#FF6B6B]' : 'text-[#B0B0C0]'}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
              <div className={`mt-1 h-0.5 rounded-full bg-[#FF6B6B] transition-all duration-300 ${activeTab === tab ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <div className="px-3 py-4 space-y-3">
        {rewards.map((reward, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden flex hover:shadow-lg transition-all hover-lift animate-fade-in-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Icon Side */}
            <div className={`w-20 ${reward.color} flex items-center justify-center flex-shrink-0`}>
              <span className="animate-float-y inline-block" style={{ animationDelay: `${idx * 0.3}s` }}>
                {reward.icon}
              </span>
            </div>

            {/* Info Side */}
            <div className="flex-1 p-3">
              <div className="text-[#2D3561] text-sm font-bold mb-0.5">{reward.name}</div>
              <div className="text-[#B0B0C0] text-xs leading-snug mb-2">{reward.description}</div>
              <div className="flex justify-between items-center">
                <div className="text-[#2D3561] text-sm font-bold">{reward.points} pts</div>
                <button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all active:scale-95 ripple-container animate-glow-pulse">
                  Redeem
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5">
                <div className="h-1.5 bg-[#F0F0F8] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full progress-bar-fill ${barColors[idx % 3]}`}
                    style={{ width: `${reward.progress}%` }}
                  />
                </div>
                <div className="text-[#C0C0D0] text-[10px] mt-1">{reward.progress}% to unlock</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Banner */}
      <div className="px-3 pb-6 animate-fade-in-up delay-600">
        <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] rounded-2xl p-5 text-white shadow-xl hover-lift relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-20 pointer-events-none"></div>
          <div className="flex items-start gap-4 relative">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1">Mega Rewards Event! 🎉</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-3">Earn 2x points on all scans this week. Limited time offer!</p>
              <button className="bg-white text-[#FF6B6B] font-bold text-xs px-5 py-2 rounded-xl hover:shadow-lg transition-all active:scale-95 ripple-container">
                Learn More
              </button>
            </div>
            <div className="text-5xl animate-float-y">🎁</div>
          </div>
        </div>
      </div>
    </div>
  );
}

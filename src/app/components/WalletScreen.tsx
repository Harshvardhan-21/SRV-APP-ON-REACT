import { ArrowDownUp, ShoppingBag, Building2, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface WalletScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

export function WalletScreen({ onNavigate }: WalletScreenProps) {
  const [startDate] = useState('01 Mar 2026');
  const [endDate] = useState('31 Mar 2026');

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-[#F0F0F8] animate-fade-in-down">
        <h1 className="text-[#2D3561] font-bold text-lg text-center">Wallet History</h1>
      </div>

      <div className="px-3 py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Redeem Product', value: '0', delay: 'delay-100' },
            { label: 'Lifetime Redeem', value: '0', delay: 'delay-200' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white border-2 border-[#EDEDF5] rounded-2xl p-4 hover-lift animate-fade-in-up ${stat.delay}`}>
              <div className="text-[#FF6B6B] text-xs font-bold mb-1">{stat.label}</div>
              <div className="text-[#2D3561] font-bold text-3xl animate-count-up">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Points Card */}
        <div className="bg-white border-2 border-[#EDEDF5] rounded-2xl p-4 mb-4 hover-lift animate-fade-in-up delay-200">
          <div className="mb-4">
            <div className="text-[#2D3561] font-bold text-2xl mb-0.5 animate-count-up delay-300">0 Points</div>
            <div className="text-[#FF6B6B] text-xs font-bold">Redeemable Points</div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <ShoppingBag className="w-6 h-6 text-[#6366F1]" strokeWidth={1.5} />, label: 'Buy Schemes', bg: 'bg-[#F0EFFF] hover:bg-[#E5E4FF]', delay: 'delay-300' },
              { icon: <Building2 className="w-6 h-6 text-[#F59E0B]" strokeWidth={1.5} />, label: 'Bank Transfer', bg: 'bg-[#FFF8E1] hover:bg-[#FFF3CD]', delay: 'delay-350' },
              { icon: <ArrowDownUp className="w-6 h-6 text-[#06D6A0]" strokeWidth={1.5} />, label: 'Transfer Point', bg: 'bg-[#E6FDF5] hover:bg-[#CCFBEF]', delay: 'delay-400' },
            ].map((btn, i) => (
              <button key={i} className={`${btn.bg} rounded-2xl p-3 flex flex-col items-center gap-2 transition-all active:scale-90 hover-lift ripple-container animate-fade-in-up ${btn.delay}`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <span className="animate-float-y inline-block" style={{ animationDelay: `${i * 0.3}s` }}>{btn.icon}</span>
                </div>
                <div className="text-[#2D3561] text-xs font-bold text-center">{btn.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter */}
        <div className="bg-white border-2 border-[#EDEDF5] rounded-2xl p-4 mb-4 flex items-center justify-between hover-lift animate-fade-in-up delay-400">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#B0B0C0]" />
            <div className="flex items-center gap-2">
              <span className="text-[#2D3561] text-sm font-semibold">{startDate}</span>
              <span className="text-[#B0B0C0]">|</span>
              <span className="text-[#2D3561] text-sm font-semibold">{endDate}</span>
            </div>
          </div>
          <button className="w-10 h-10 bg-[#FF6B6B] rounded-xl flex items-center justify-center hover:bg-[#FF5252] transition-all active:scale-90 ripple-container animate-glow-pulse">
            <CheckCircle className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Empty State */}
        <div className="mb-4 animate-fade-in-up delay-500">
          <h3 className="text-[#2D3561] font-bold text-base mb-3">Redeem Point History</h3>
          <div className="bg-white border-2 border-[#EDEDF5] rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4 animate-float-y">📋</div>
            <div className="text-[#FF6B6B] font-bold text-lg mb-2">NO DATA</div>
            <p className="text-[#B0B0C0] text-sm text-center">No redemption history found for the selected period</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-[#06D6A0] to-[#04B887] rounded-2xl p-4 text-white shadow-lg hover-lift animate-fade-in-up delay-600 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-20 pointer-events-none"></div>
          <div className="flex items-start gap-3 relative">
            <div className="text-3xl animate-float-y">💰</div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Start Earning Points!</h3>
              <p className="text-white/90 text-xs leading-relaxed">Scan SRV products to earn points. Redeem them for cashback, vouchers, and exciting rewards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

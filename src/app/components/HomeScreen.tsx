import { useState, useEffect } from 'react';
import { Bell, TrendingUp, ScanQrCode, History, Star, User, ChevronRight, MessageCircle, Wallet } from 'lucide-react';
import type { UserRole } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
  role: UserRole;
}

const BANNER_SLIDES = [
  {
    bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
    tag: 'New Arrival',
    emoji: '+',
    title: 'AUTOMATIC',
    sub: 'CHANGE OVER SWITCH',
    link: 'https://srvelectricals.com',
  },
  {
    bg: 'linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 60%,rgba(229,62,62,0.18) 100%)',
    tag: 'Best Seller',
    emoji: '+',
    title: 'MODULAR',
    sub: 'SWITCH PLATES',
    link: 'https://srvelectricals.com',
  },
  {
    bg: 'linear-gradient(135deg,#1a0005 0%,#2d0000 60%,rgba(229,62,62,0.22) 100%)',
    tag: 'Premium',
    emoji: '+',
    title: 'JUNCTION',
    sub: 'BOX SERIES',
    link: 'https://srvelectricals.com',
  },
  {
    bg: 'linear-gradient(135deg,#001a05 0%,#0a2a0a 60%,rgba(34,197,94,0.18) 100%)',
    tag: 'Popular',
    emoji: '+',
    title: 'FAN BOX',
    sub: 'CONCEALED RANGE',
    link: 'https://srvelectricals.com',
  },
];

const products = [
  { name: 'Fan Box 3" Range', description: 'F8/FC/FDB 18/40 PC', img: 'https://srvelectricals.com/cdn/shop/files/F8_3_18-40.png?v=1757426631&width=240', price: 'Rs 89', points: 10, color: 'from-orange-50 to-amber-100' },
  { name: 'Concealed Box 3"', description: 'CRD PL 3" Precision', img: 'https://srvelectricals.com/cdn/shop/files/CRD_PL_3.png?v=1757426566&width=240', price: 'Rs 120', points: 15, color: 'from-blue-50 to-indigo-100' },
  { name: 'Module Box Platinum', description: 'Platinum Range', img: 'https://srvelectricals.com/cdn/shop/files/3x3_679e5d30-ecf2-446e-9452-354bbf4c4a26.png?v=1757426377&width=240', price: 'Rs 245', points: 25, color: 'from-violet-50 to-purple-100' },
  { name: 'Kitchen Fan Royal', description: 'Premium Ventilation', img: 'https://srvelectricals.com/cdn/shop/files/Kitchen-Fan-Royal.png?v=1741846906&width=240', price: 'Rs 599', points: 45, color: 'from-rose-50 to-red-100' },
];

export function Home({ onNavigate }: HomeScreenProps) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % BANNER_SLIDES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/918837684004?text=Hello%20SRV%20Electricals%2C%20I%20need%20support', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <style>{`
        @keyframes bannerSlide{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:scale(1)}}
        @keyframes dotGrow{from{width:6px}to{width:20px}}
        @keyframes waPulse{0%,100%{box-shadow:0 4px 18px rgba(34,197,94,0.4)}50%{box-shadow:0 4px 28px rgba(34,197,94,0.65)}}
        .banner-inner{animation:bannerSlide 0.55s ease both}
        .dot-active{animation:dotGrow 0.3s ease both}
        .wa-pulse{animation:waPulse 2.5s ease-in-out infinite}
      `}</style>

      <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] px-4 pb-8 pt-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4 animate-fade-in-down">
          <div>
            <p className="text-white/55 text-xs mb-0.5">Good morning,</p>
            <h1 className="text-white font-bold flex items-center gap-1.5">
              Harsh Vardhan <span className="text-lg animate-float-y inline-block">+</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('wallet')}
              className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
              title="Wallet"
            >
              <Wallet className="w-5 h-5 text-white" strokeWidth={1.8} />
            </button>

            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center relative hover:bg-white/20 transition-all active:scale-90">
              <Bell className="w-5 h-5 text-white" strokeWidth={1.8} />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B6B] rounded-full animate-ping" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B6B] rounded-full" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg animate-scale-in delay-100 hover-lift gold-shine">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#B0B0C0] text-[10px] font-semibold tracking-wider mb-1">TOTAL POINTS</p>
              <div className="text-[#2D3561] font-bold text-3xl animate-points-pop delay-200">4,250</div>
              <div className="flex items-center gap-1 text-[#06D6A0] text-xs font-semibold mt-1">
                <TrendingUp className="w-3.5 h-3.5" />+120 pts this week
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-[#FFF8E1] border-2 border-[#FFD54F] rounded-xl px-3 py-1.5 flex items-center gap-1.5 animate-pop-in delay-300">
                <div className="w-2 h-2 bg-[#FFD54F] rounded-full animate-ping" />
                <span className="text-[#B8860B] text-xs font-bold">Gold</span>
              </div>
              <div className="text-[#D0D0E0] text-[9px] font-semibold">750 pts to Platinum</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[9px] text-[#B0B0C0] font-semibold mb-1">
              <span>Gold</span><span>Platinum at 5,000 pts</span>
            </div>
            <div className="h-1.5 bg-[#F0F0F8] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FFD54F] to-[#FFA000] rounded-full progress-bar-fill animate-fade-in-left delay-500" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-4">
        <div style={{ marginBottom: 18, borderRadius: 20, overflow: 'hidden', position: 'relative', boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}>
          <div key={slide} className="banner-inner" style={{ background: BANNER_SLIDES[slide].bg, padding: '22px 20px 18px', minHeight: 160, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', top: -60, right: -40, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,107,107,0.22)', border: '1px solid rgba(255,107,107,0.35)', borderRadius: 20, padding: '3px 11px', fontSize: 10.5, fontWeight: 700, color: '#ff9090', width: 'fit-content', letterSpacing: 0.5 }}>
                {BANNER_SLIDES[slide].tag}
              </span>
              <div style={{ fontSize: 36, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))' }}>
                {BANNER_SLIDES[slide].emoji}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                  <span style={{ color: '#FF6B6B', fontWeight: 900, fontSize: 11, letterSpacing: 2 }}>SRV</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase' }}>ELECTRICALS</span>
                </div>
                <div style={{ color: 'white', fontWeight: 900, fontSize: 26, letterSpacing: 1, lineHeight: 1 }}>{BANNER_SLIDES[slide].title}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 3 }}>{BANNER_SLIDES[slide].sub}</div>
              </div>
            </div>

            <a
              href={BANNER_SLIDES[slide].link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 14,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: 20,
                padding: '8px 18px',
                color: 'white',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.2s',
              }}
            >
              Shop Now +
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '10px 0 6px', background: 'rgba(0,0,0,0.06)' }}>
            {BANNER_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                style={{
                  height: 6,
                  width: i === slide ? 20 : 6,
                  borderRadius: 3,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === slide ? '#FF6B6B' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-[#B0B0C0] text-[10px] font-bold tracking-wider mb-2.5 animate-fade-in-left delay-200">QUICK ACTIONS</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { screen: 'scan' as const, icon: <ScanQrCode className="w-5 h-5 text-[#FF6B6B]" strokeWidth={2} />, bg: 'bg-[#FFF0F0]', title: 'Scan QR', sub: 'Earn points', delay: 'delay-200' },
              { screen: 'home' as const, icon: <MessageCircle className="w-5 h-5 text-[#22c55e]" strokeWidth={2} />, bg: 'bg-[#e6fdf0]', title: 'WhatsApp', sub: 'Support', delay: 'delay-250', isWA: true },
              { screen: 'rewards' as const, icon: <Star className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />, bg: 'bg-[#FFF8E1]', title: 'Rewards', sub: '4 new', delay: 'delay-300' },
              { screen: 'profile' as const, icon: <User className="w-5 h-5 text-[#378ADD]" strokeWidth={2} />, bg: 'bg-[#EFF4FF]', title: 'Profile', sub: 'Level 3', delay: 'delay-350' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.isWA ? handleWhatsApp : () => onNavigate(item.screen)}
                className={`bg-white border border-[#EDEDF5] rounded-2xl p-3 hover:shadow-md transition-all active:scale-95 hover-lift ripple-container animate-fade-in-up ${item.delay}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center`}>{item.icon}</div>
                  {item.isWA && <span style={{ fontSize: 8, background: '#22c55e', color: 'white', borderRadius: 6, padding: '2px 5px', fontWeight: 700 }}>LIVE</span>}
                </div>
                <div className="text-[#2D3561] text-sm font-bold">{item.title}</div>
                <div className="text-[#B0B0C0] text-xs">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div
          className="wa-pulse"
          onClick={handleWhatsApp}
          style={{
            margin: '0 0 20px',
            background: 'linear-gradient(135deg,#e6fff2,#dcfce7)',
            border: '1px solid #bbf7d0',
            borderRadius: 18,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, background: '#22c55e', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(34,197,94,0.4)', flexShrink: 0 }}>
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 800, color: '#15803d' }}>Got a Query?</p>
              <p style={{ margin: '2px 0 0', fontSize: 11.5, color: '#16a34a' }}>Reach out to us on WhatsApp</p>
            </div>
          </div>
          <div style={{ background: '#22c55e', color: 'white', borderRadius: 20, padding: '8px 15px', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(34,197,94,0.38)', flexShrink: 0 }}>
            Chat Now
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-2.5 animate-fade-in-left delay-300">
            <h3 className="text-[#B0B0C0] text-[10px] font-bold tracking-wider">FEATURED PRODUCTS</h3>
            <button onClick={() => onNavigate('product')} className="text-[#FF6B6B] text-xs font-semibold flex items-center gap-0.5 active:scale-90 transition-transform">
              View All<ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {products.map((product, idx) => (
              <div key={idx} className={`bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden hover:shadow-lg transition-all hover-lift ripple-container animate-fade-in-up ${idx === 0 ? 'delay-300' : idx === 1 ? 'delay-350' : idx === 2 ? 'delay-400' : 'delay-450'}`}>
                <div className={`h-24 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden group`}>
                  <img src={product.img} alt={product.name} className="h-20 w-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />
                </div>
                <div className="p-3">
                  <div className="text-[#2D3561] text-sm font-bold mb-0.5">{product.name}</div>
                  <div className="text-[#B0B0C0] text-xs mb-2">{product.description}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#2D3561] font-bold">{product.price}</span>
                    <span className="bg-[#E6FDF5] text-[#06D6A0] text-xs font-bold px-2 py-1 rounded-lg">+{product.points} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[#B0B0C0] text-[10px] font-bold tracking-wider mb-2.5 animate-fade-in-left delay-500">RECENT ACTIVITY</h3>
          <div className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden animate-fade-in-up delay-500">
            {[
              { icon: <ScanQrCode className="w-4 h-4 text-[#FF6B6B]" />, bg: 'bg-[#FFF0F0]', label: 'SRV Switch 16A scanned', time: 'Today, 10:23 AM', amount: '+50', color: 'text-[#06D6A0]', border: true },
              { icon: <History className="w-4 h-4 text-[#06D6A0]" />, bg: 'bg-[#E6FDF5]', label: 'Cashback redeemed', time: 'Yesterday', amount: '-200', color: 'text-[#FF6B6B]', border: true },
              { icon: <Star className="w-4 h-4 text-[#F59E0B]" />, bg: 'bg-[#FFF8E1]', label: 'Referral bonus earned', time: '2 days ago', amount: '+100', color: 'text-[#06D6A0]', border: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 ${item.border ? 'border-b border-[#F5F5FB]' : ''} hover:bg-[#FAFAFA] transition-colors animate-fade-in-left`} style={{ animationDelay: `${550 + i * 80}ms` }}>
                <div className={`w-7 h-7 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                <div className="flex-1">
                  <div className="text-[#3D3D5C] text-xs">{item.label}</div>
                  <div className="text-[#C0C0D0] text-[10px]">{item.time}</div>
                </div>
                <div className={`${item.color} text-sm font-bold`}>{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

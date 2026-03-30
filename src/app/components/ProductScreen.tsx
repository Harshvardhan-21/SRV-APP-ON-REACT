import { useState } from 'react';
import { Search, ScanQrCode, ChevronRight } from 'lucide-react';

interface ProductScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

const categories = [
  { id: 'fanbox',       label: 'Fan Box',       emoji: '🔌', color: 'from-orange-400 to-amber-500'  },
  { id: 'concealedbox', label: 'Concealed Box', emoji: '📦', color: 'from-blue-400 to-indigo-500'   },
  { id: 'modularbox',   label: 'Modular Box',   emoji: '🗃️', color: 'from-violet-400 to-purple-500' },
  { id: 'appliances',   label: 'Appliances',    emoji: '⚡', color: 'from-rose-400 to-red-500'      },
  { id: 'junctionbox',  label: 'Junction Box',  emoji: '🔧', color: 'from-teal-400 to-green-500'    },
  { id: 'accessories',  label: 'Accessories',   emoji: '🔩', color: 'from-yellow-400 to-orange-500' },
];

const badgeColors: Record<string, string> = {
  'Popular':    'bg-[#FF6B6B] text-white',
  'Best Seller':'bg-[#F59E0B] text-white',
  'New':        'bg-[#06D6A0] text-white',
  'Premium':    'bg-[#7C3AED] text-white',
  'Hot':        'bg-[#EF4444] text-white',
};

const products = [
  { id:1,  name:'FAN BOX 3" RANGE',       sub:'F8/FC/FDB — 18/40, 22/28 PC',      category:'fanbox',       img:'https://srvelectricals.com/cdn/shop/files/F8_3_18-40.png?v=1757426631&width=240',                                                                                             points:10, color:'from-orange-50 to-amber-50',   badge:'Popular' },
  { id:2,  name:'FAN BOX 4" RANGE',       sub:'FC 4" — 17/30, 20/40 PC',          category:'fanbox',       img:'https://srvelectricals.com/cdn/shop/files/FC_4_17-30.png?v=1757426626&width=240',                                                                                           points:12, color:'from-orange-50 to-amber-50',   badge:null },
  { id:3,  name:'FAN BOX 2.5" RANGE',     sub:'FC 2.5" — 20/50 PC',               category:'fanbox',       img:'https://srvelectricals.com/cdn/shop/files/FC_2.5_20-50.png?v=1757426609&width=240',                                                                                         points:8,  color:'from-orange-50 to-amber-50',   badge:null },
  { id:4,  name:'CONCEALED BOX 3"',       sub:'CRD PL 3" — Precision engineered', category:'concealedbox', img:'https://srvelectricals.com/cdn/shop/files/CRD_PL_3.png?v=1757426566&width=240',                                                                                             points:15, color:'from-blue-50 to-indigo-50',    badge:'Best Seller' },
  { id:5,  name:'CONCEALED BOX 4.5"',     sub:'CC PL 4.5" — 24/60 PC',            category:'concealedbox', img:'https://srvelectricals.com/cdn/shop/files/CC_PL_4.5_24-60.png?v=1757426598&width=240',                                                                                     points:18, color:'from-blue-50 to-indigo-50',    badge:null },
  { id:6,  name:'CONCEALED BOX 4"',       sub:'CC PL 4" — 12/60 PC',              category:'concealedbox', img:'https://srvelectricals.com/cdn/shop/files/CC_PL_4_12-60_ea42ec15-5e02-42db-af42-35c479b579f2.png?v=1757426586&width=240',                                                  points:16, color:'from-blue-50 to-indigo-50',    badge:null },
  { id:7,  name:'CONCEALED BOX 2.5"',     sub:'CC PL 2.5" — 10/60 PC',            category:'concealedbox', img:'https://srvelectricals.com/cdn/shop/files/CC_PL_2.5_10-60.png?v=1757426554&width=240',                                                                                     points:10, color:'from-blue-50 to-indigo-50',    badge:null },
  { id:8,  name:'MODULE BOX DRAW GP',     sub:'GP Range — Heavy duty',             category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3_2a9180ab-d4c3-44f8-a771-bb558ea8a40e.png?v=1757426645&width=240',                                                            points:20, color:'from-violet-50 to-purple-50',  badge:'New' },
  { id:9,  name:'MODULE BOX DRAWN RANGE', sub:'Deep drawn — Industrial grade',     category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3_021c11f8-0018-42c5-b784-66aee90b7469.png?v=1757426338&width=240',                                                            points:20, color:'from-violet-50 to-purple-50',  badge:null },
  { id:10, name:'MODULE BOX PLATINUM',    sub:'Platinum Range — Premium',          category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3_679e5d30-ecf2-446e-9452-354bbf4c4a26.png?v=1757426377&width=240',                                                            points:25, color:'from-violet-50 to-purple-50',  badge:'Premium' },
  { id:11, name:'MODULE BOX SUPER',       sub:'Super Range — Versatile',           category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3.png?v=1757426357&width=240',                                                                                                 points:22, color:'from-violet-50 to-purple-50',  badge:null },
  { id:12, name:'MODULE BOX ECO BR',      sub:'Eco BR Range — Budget friendly',    category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3_BR.png?v=1756461409&width=240',                                                                                              points:15, color:'from-violet-50 to-purple-50',  badge:null },
  { id:13, name:'MODULE BOX ECO MS',      sub:'Eco MS Range — Mild steel',         category:'modularbox',   img:'https://srvelectricals.com/cdn/shop/files/3x3_MS.png?v=1756461391&width=240',                                                                                              points:15, color:'from-violet-50 to-purple-50',  badge:null },
  { id:14, name:'HEAT BLOWER O2',         sub:'Home heater blower — O2 series',    category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/Home-Heater-O2-Blower.png?v=1741846484&width=240',                                                                               points:50, color:'from-rose-50 to-red-50',       badge:'Hot' },
  { id:15, name:'VERTICAL HEATER',        sub:'Room warming — Vertical series',    category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/Vertical-Heater.png?v=1741846510&width=240',                                                                                     points:60, color:'from-rose-50 to-red-50',       badge:null },
  { id:16, name:'ROOM WARMER Q2',         sub:'Q2 model — Efficient heating',      category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/Room-Warmer-Q2.png?v=1741846461&width=240',                                                                                      points:55, color:'from-rose-50 to-red-50',       badge:null },
  { id:17, name:'KITCHEN FAN TURTLE',     sub:'Ventilation — Turtle series',       category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/AP-Turtle-Fan.webp?v=1747938680&width=240',                                                                                      points:40, color:'from-rose-50 to-red-50',       badge:null },
  { id:18, name:'KITCHEN FAN ROYAL',      sub:'Premium kitchen ventilation',       category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/Kitchen-Fan-Royal.png?v=1741846906&width=240',                                                                                   points:45, color:'from-rose-50 to-red-50',       badge:'Popular' },
  { id:19, name:'AXIAL FAN',              sub:'Industrial axial ventilation',      category:'appliances',   img:'https://srvelectricals.com/cdn/shop/files/Axial-Fan.png?v=1741846453&width=240',                                                                                           points:35, color:'from-rose-50 to-red-50',       badge:null },
  { id:20, name:'JUNCTION BOX CNG',       sub:'CNG type — Multi-purpose',          category:'junctionbox',  img:'https://srvelectricals.com/cdn/shop/files/Junction_Box_CNG.png?v=1757426491&width=240',                                                                                    points:12, color:'from-teal-50 to-green-50',     badge:null },
  { id:21, name:'2-PIN PLUG',             sub:'Girish series — Premium quality',   category:'accessories',  img:'https://srvelectricals.com/cdn/shop/files/2-Pin-Girish.png?v=1756461334&width=240',                                                                                        points:5,  color:'from-yellow-50 to-orange-50',  badge:null },
  { id:22, name:'PUMP STARTER ABS',       sub:'Domestic water pump starter',       category:'accessories',  img:'https://srvelectricals.com/cdn/shop/files/ABS-Pump-Starter.png?v=1741846666&width=240',                                                                                    points:30, color:'from-yellow-50 to-orange-50',  badge:null },
  { id:23, name:'DOOR BELL',              sub:'Tring Trong — Melodious chime',     category:'accessories',  img:'https://srvelectricals.com/cdn/shop/files/Door_Bell_Tring_Trong.png?v=1757426728&width=240',                                                                               points:8,  color:'from-yellow-50 to-orange-50',  badge:null },
  { id:24, name:'ENSHIELD BLOCK 32A',     sub:'Block set — Safety rated',          category:'accessories',  img:'https://cdn.shopify.com/s/files/1/0651/4583/1466/files/Enshield-32A.png?v=1757426477',                                                                                    points:20, color:'from-yellow-50 to-orange-50',  badge:'New' },
];

export function ProductScreen({ onNavigate }: ProductScreenProps) {
  const [activeCategory, setActiveCategory] = useState('fanbox');
  const [search, setSearch] = useState('');

  const activeCat = categories.find(c => c.id === activeCategory);
  const filtered = products.filter(p =>
    p.category === activeCategory &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-3 border-b border-[#F0F0F8] animate-fade-in-down">
        <h1 className="text-[#2D3561] font-bold text-lg text-center mb-3">All Products</h1>

        {/* Search bar */}
        <div className="relative mb-3 animate-scale-in delay-100">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0B0C0]" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#F8F7FF] rounded-xl text-sm text-[#2D3561] placeholder:text-[#C0C0D0] outline-none border border-[#EDEDF5] focus:border-[#FF6B6B] transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSearch(''); }}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 animate-fade-in-up ${
                activeCategory === cat.id
                  ? 'bg-[#FF6B6B] text-white shadow-md scale-105'
                  : 'bg-[#F5F5FB] text-[#2D3561] hover:bg-[#FFE8E8]'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Banner */}
      {activeCat && (
        <div className={`mx-3 mt-3 bg-gradient-to-r ${activeCat.color} rounded-2xl p-3.5 flex items-center gap-3 animate-scale-in shadow-md`}>
          <span className="text-3xl animate-float-y inline-block">{activeCat.emoji}</span>
          <div>
            <div className="text-white font-bold text-sm">{activeCat.label}</div>
            <div className="text-white/80 text-xs">{filtered.length} products • Scan to earn points</div>
          </div>
          <div className="ml-auto bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <span className="text-white text-xs font-bold">Scan & Earn</span>
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="px-3 py-3 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[#B0B0C0] animate-fade-in-up">
            <div className="text-4xl mb-2">🔍</div>
            <div className="text-sm font-semibold">No products found</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden hover:shadow-xl transition-all hover-lift ripple-container animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                {/* Image area */}
                <div className={`h-36 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-28 w-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${idx * 0.25}s` }}
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      if (el.nextSibling) (el.nextSibling as HTMLElement).style.display = 'block';
                    }}
                  />
                  <span style={{display:'none'}} className="text-4xl">📦</span>
                  <div className="absolute inset-0 shimmer opacity-20 pointer-events-none"></div>

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pop-in ${badgeColors[product.badge] ?? 'bg-[#FF6B6B] text-white'}`}
                      style={{ animationDelay: `${0.2 + idx * 0.07}s` }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Points badge */}
                  <div
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 animate-pop-in shadow-sm"
                    style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
                  >
                    <div className="text-[#FF6B6B] text-[10px] font-bold">+{product.points} pts</div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="text-[#2D3561] text-xs font-bold mb-0.5 leading-tight">{product.name}</div>
                  <div className="text-[#B0B0C0] text-[10px] leading-snug mb-2">{product.sub}</div>
                  <button
                    onClick={() => onNavigate('scan')}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#FFF0F0] text-[#FF6B6B] text-[10px] font-bold rounded-lg hover:bg-[#FF6B6B] hover:text-white transition-all active:scale-95 duration-200"
                  >
                    <ScanQrCode className="w-3 h-3" />
                    Scan to Earn
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer banner */}
      <div className="px-3 pb-6 animate-fade-in-up delay-500">
        <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] rounded-2xl p-4 text-white hover-lift shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
          <div className="flex items-center gap-3 relative">
            <div className="text-2xl animate-float-y inline-block">🏭</div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-0.5">North India's Largest Manufacturer</h3>
              <p className="text-white/70 text-xs leading-relaxed">SRV Electricals — trusted since 2000. Scan any product QR to earn reward points!</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

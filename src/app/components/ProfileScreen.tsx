import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ScanQrCode, Gift, Users, Bell, Settings, ChevronRight, Star, LogOut, ShoppingBag, CreditCard, ArrowDownUp, HelpCircle, Tag, Phone, Camera, Edit3, X, Check, User, MapPin, Mail } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  initials: string;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Harshvardhan',
    phone: '9162038214',
    email: 'harshvardhan@email.com',
    city: 'New Delhi',
    initials: 'HK',
  });
  const [editDraft, setEditDraft] = useState<UserProfile>(profile);

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showEditModal]);

  const handleSave = () => {
    const initials = editDraft.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    setProfile({ ...editDraft, initials });
    setShowEditModal(false);
  };

  const menuItems = [
    { icon: <Gift className="w-5 h-5 text-[#FF6B6B]" />,       bg: 'bg-[#FFF0F0]', label: 'My Redemption',    action: () => onNavigate('wallet') },
    { icon: <ArrowDownUp className="w-5 h-5 text-[#FF6B6B]" />, bg: 'bg-[#FFF0F0]', label: 'Transfer Points',  action: () => {} },
    { icon: <ShoppingBag className="w-5 h-5 text-[#FF6B6B]" />, bg: 'bg-[#FFF0F0]', label: 'My Orders',        action: () => {} },
    { icon: <CreditCard className="w-5 h-5 text-[#F59E0B]" />,  bg: 'bg-[#FFF8E1]', label: 'Bank Details',     action: () => {} },
    { icon: <Users className="w-5 h-5 text-[#378ADD]" />,        bg: 'bg-[#EFF4FF]', label: 'Refer To A Friend',action: () => {} },
    { icon: <HelpCircle className="w-5 h-5 text-[#06D6A0]" />,  bg: 'bg-[#E6FDF5]', label: 'Need Help',        action: () => {} },
    { icon: <Tag className="w-5 h-5 text-[#F59E0B]" />,          bg: 'bg-[#FFF8E1]', label: 'Offers',           action: () => {} },
  ];

  const settingsItems = [
    { icon: <Bell className="w-5 h-5 text-[#F59E0B]" />,       bg: 'bg-[#FFF8E1]', label: 'Notifications',   badge: true  },
    { icon: <Settings className="w-5 h-5 text-[#888]" />,      bg: 'bg-[#F5F5FB]', label: 'App Settings',    badge: false },
    { icon: <ScanQrCode className="w-5 h-5 text-[#378ADD]" />, bg: 'bg-[#EFF4FF]', label: 'Scan History',    badge: false },
    { icon: <Phone className="w-5 h-5 text-[#06D6A0]" />,      bg: 'bg-[#E6FDF5]', label: 'Contact Support', badge: false },
  ];

  const stats = [
    { value: '24',    label: 'Scans',   color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10' },
    { value: '4,250', label: 'Points',  color: 'text-[#FFD54F]', bg: 'bg-white/10'      },
    { value: '6',     label: 'Rewards', color: 'text-[#06D6A0]', bg: 'bg-[#06D6A0]/10' },
  ];

  const editModal = (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setShowEditModal(false)}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Bottom Sheet */}
      <div
        className="animate-slide-in-bottom"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '448px',
          background: '#ffffff',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
          padding: '16px 16px 32px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 10,
        }}
      >
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: '#E0E0F0', borderRadius: 99, margin: '0 auto 16px' }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#2D3561] font-black text-base">Edit Profile</h2>
          <button
            onClick={() => setShowEditModal(false)}
            className="w-8 h-8 bg-[#F5F5FB] rounded-full flex items-center justify-center hover:bg-[#FFE5E5] transition-colors active:scale-90"
          >
            <X className="w-4 h-4 text-[#888]" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF4444] flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-black">
                {editDraft.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-md hover:bg-[#FF5252] transition-colors active:scale-90 border-2 border-white">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          {[
            { icon: <User className="w-4 h-4 text-[#FF6B6B]" />,   label: 'Full Name',    key: 'name',  type: 'text',  placeholder: 'Your full name' },
            { icon: <Phone className="w-4 h-4 text-[#FF6B6B]" />,  label: 'Phone Number', key: 'phone', type: 'tel',   placeholder: 'Mobile number'  },
            { icon: <Mail className="w-4 h-4 text-[#FF6B6B]" />,   label: 'Email',        key: 'email', type: 'email', placeholder: 'Email address'  },
            { icon: <MapPin className="w-4 h-4 text-[#FF6B6B]" />, label: 'City',         key: 'city',  type: 'text',  placeholder: 'Your city'      },
          ].map(field => (
            <div key={field.key}>
              <label className="text-[#B0B0C0] text-xs font-semibold mb-1.5 block">{field.label}</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</div>
                <input
                  type={field.type}
                  value={(editDraft as any)[field.key]}
                  onChange={e => setEditDraft({ ...editDraft, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full pl-9 pr-4 py-3 bg-[#F8F7FF] rounded-xl text-sm text-[#2D3561] placeholder:text-[#C0C0D0] outline-none border border-[#EDEDF5] focus:border-[#FF6B6B] transition-colors font-medium"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-5 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          <Check className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] relative">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-[#F0F0F8] animate-fade-in-down">
        <h1 className="text-[#2D3561] font-bold text-lg text-center">More</h1>
      </div>

      <div className="px-3 py-4">
        {/* Profile Card */}
        <div className="bg-white border border-[#EDEDF5] rounded-3xl p-4 mb-4 hover-lift animate-scale-in delay-100 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] via-white to-[#F8F7FF] pointer-events-none"></div>

          <div className="relative flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF4444] flex items-center justify-center shadow-lg animate-glow-pulse">
                <span className="text-white text-2xl font-black tracking-tight">{profile.initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFD54F] rounded-full flex items-center justify-center shadow-md border-2 border-white animate-pop-in delay-200">
                <span className="text-[#B8860B] text-[9px] font-black">L3</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-[#2D3561] font-black text-base truncate">{profile.name}</h2>
              <p className="text-[#B0B0C0] text-sm mb-1">{profile.phone}</p>
              <div className="flex items-center gap-1 text-[#B0B0C0] text-xs">
                <MapPin className="w-3 h-3" />
                <span>{profile.city}</span>
              </div>
            </div>

            <button
              onClick={() => { setEditDraft(profile); setShowEditModal(true); }}
              className="w-10 h-10 bg-[#FFF0F0] hover:bg-[#FF6B6B] rounded-xl flex items-center justify-center transition-all active:scale-90 group shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-[#FF6B6B] group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Gold tier strip */}
          <div className="relative mt-3 flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] rounded-xl px-3 py-2 border border-[#FFD54F]/30">
            <div className="w-2 h-2 bg-[#FFD54F] rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-[#FFD54F] rounded-full absolute left-3"></div>
            <Star className="w-4 h-4 text-[#F59E0B] ml-1 animate-sparkle" fill="#F59E0B" />
            <span className="text-[#B8860B] text-xs font-bold">Gold Member</span>
            <span className="ml-auto text-[#B8860B] text-[10px]">750 pts to Platinum →</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden mb-4 animate-fade-in-up delay-200 shadow-sm">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${i < menuItems.length - 1 ? 'border-b border-[#F5F5FB]' : ''} hover:bg-[#FAFAFA] transition-all active:scale-[0.99] ripple-container group`}
              style={{ animationDelay: `${200 + i * 40}ms` }}
            >
              <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <span className="text-[#2D3561] text-sm font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-[#D0D0E0] group-hover:text-[#FF6B6B] group-hover:translate-x-0.5 transition-all duration-200" />
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="mb-4 animate-fade-in-up delay-400">
          <h3 className="text-[#2D3561] font-bold text-sm mb-2 px-1">Settings</h3>
          <div className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden shadow-sm">
            {settingsItems.map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-3 px-4 py-3.5 ${i < settingsItems.length - 1 ? 'border-b border-[#F5F5FB]' : ''} hover:bg-[#FAFAFA] transition-all active:scale-[0.99] ripple-container relative group`}
              >
                <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  {item.icon}
                </div>
                <span className="text-[#2D3561] text-sm font-semibold flex-1 text-left">{item.label}</span>
                {item.badge && <div className="absolute top-3.5 left-[52px] w-2 h-2 bg-[#FF6B6B] rounded-full animate-ping opacity-75"></div>}
                {item.badge && <div className="absolute top-3.5 left-[52px] w-2 h-2 bg-[#FF6B6B] rounded-full"></div>}
                <ChevronRight className="w-4 h-4 text-[#D0D0E0] group-hover:text-[#FF6B6B] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] rounded-2xl p-4 mb-4 text-white shadow-xl hover-lift animate-fade-in-up delay-500 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-3 relative">
            <Star className="w-5 h-5 text-[#FFD54F] animate-sparkle" fill="#FFD54F" />
            <span className="text-sm font-bold">Your Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-2 relative">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`${stat.bg} backdrop-blur-sm rounded-xl p-3 text-center hover-lift animate-fade-in-up border border-white/10`}
                style={{ animationDelay: `${600 + i * 80}ms` }}
              >
                <div className={`${stat.color} font-black text-xl animate-count-up`} style={{ animationDelay: `${700 + i * 80}ms` }}>{stat.value}</div>
                <div className="text-white/60 text-[10px] mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[#FFE5E5] text-[#FF6B6B] font-bold text-sm hover:bg-red-50 rounded-2xl transition-all active:scale-95 ripple-container animate-fade-in-up delay-600 shadow-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Portal Modal — renders directly into document.body */}
      {showEditModal && createPortal(editModal, document.body)}
    </div>
  );
}
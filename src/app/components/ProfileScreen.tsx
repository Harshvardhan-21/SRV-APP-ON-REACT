import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ScanQrCode, Gift, Users, Bell, Settings, ChevronRight, Star, LogOut,
  ShoppingBag, CreditCard, ArrowDownUp, HelpCircle, Tag, Phone, Camera,
  Edit3, X, Check, User, MapPin, Mail, FileText, Hash, Building2, Save
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  gstHolderName: string;
  panHolderName: string;
  gstNumber: string;
  panNumber: string;
  dealerCode: string;
  initials: string;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Harshvardhan',
    phone: '9162038214',
    email: '',
    city: 'Mansa',
    state: 'Punjab',
    pincode: '151505',
    address: 'X9HR+PC8, Green Valley Colony, Mansa, Punjab 151505, India',
    gstHolderName: 'Harshvardhan',
    panHolderName: '',
    gstNumber: 'BIBPB7675A',
    panNumber: '',
    dealerCode: '215548',
    initials: 'HV',
  });
  const [editDraft, setEditDraft] = useState<UserProfile>(profile);

  useEffect(() => {
    document.body.style.overflow = showEditModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showEditModal]);

  const handleSave = () => {
    const parts = editDraft.name.trim().split(' ');
    const initials = parts.map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'HV';
    setProfile({ ...editDraft, initials });
    setShowEditModal(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const menuItems = [
    { icon:<Gift className="w-5 h-5 text-[#FF6B6B]"/>,       bg:'bg-[#FFF0F0]', label:'My Redemption',    action:()=>onNavigate('wallet') },
    { icon:<ArrowDownUp className="w-5 h-5 text-[#FF6B6B]"/>, bg:'bg-[#FFF0F0]', label:'Transfer Points',  action:()=>{} },
    { icon:<ShoppingBag className="w-5 h-5 text-[#FF6B6B]"/>, bg:'bg-[#FFF0F0]', label:'My Orders',        action:()=>{} },
    { icon:<CreditCard className="w-5 h-5 text-[#F59E0B]"/>,  bg:'bg-[#FFF8E1]', label:'Bank Details',     action:()=>{} },
    { icon:<Users className="w-5 h-5 text-[#378ADD]"/>,        bg:'bg-[#EFF4FF]', label:'Refer To A Friend',action:()=>{} },
    { icon:<HelpCircle className="w-5 h-5 text-[#06D6A0]"/>,  bg:'bg-[#E6FDF5]', label:'Need Help',        action:()=>{} },
    { icon:<Tag className="w-5 h-5 text-[#F59E0B]"/>,          bg:'bg-[#FFF8E1]', label:'Offers',           action:()=>{} },
  ];
  const settingsItems = [
    { icon:<Bell className="w-5 h-5 text-[#F59E0B]"/>,       bg:'bg-[#FFF8E1]', label:'Notifications',  badge:true  },
    { icon:<Settings className="w-5 h-5 text-[#888]"/>,      bg:'bg-[#F5F5FB]', label:'App Settings',   badge:false },
    { icon:<ScanQrCode className="w-5 h-5 text-[#378ADD]"/>, bg:'bg-[#EFF4FF]', label:'Scan History',   badge:false },
    { icon:<Phone className="w-5 h-5 text-[#06D6A0]"/>,      bg:'bg-[#E6FDF5]', label:'Contact Support',badge:false },
  ];
  const stats = [
    { value:'24',    label:'Scans',   color:'text-[#FF6B6B]', bg:'bg-[#FF6B6B]/10' },
    { value:'4,250', label:'Points',  color:'text-[#FFD54F]', bg:'bg-white/10'      },
    { value:'6',     label:'Rewards', color:'text-[#06D6A0]', bg:'bg-[#06D6A0]/10' },
  ];

  // Edit modal fields config
  const editSections = [
    {
      title: 'Personal Info',
      fields: [
        { icon:<User className="w-4 h-4 text-[#FF6B6B]"/>,   label:'Full Name',    key:'name',  type:'text',  placeholder:'Your full name' },
        { icon:<Phone className="w-4 h-4 text-[#FF6B6B]"/>,  label:'Phone Number', key:'phone', type:'tel',   placeholder:'Mobile number'  },
        { icon:<Mail className="w-4 h-4 text-[#FF6B6B]"/>,   label:'Email',        key:'email', type:'email', placeholder:'Email address'  },
        { icon:<MapPin className="w-4 h-4 text-[#378ADD]"/>, label:'City',         key:'city',  type:'text',  placeholder:'Your city'      },
        { icon:<MapPin className="w-4 h-4 text-[#378ADD]"/>, label:'State',        key:'state', type:'text',  placeholder:'Your state'     },
        { icon:<Hash className="w-4 h-4 text-[#378ADD]"/>,   label:'Pincode',      key:'pincode',type:'text', placeholder:'6-digit pincode'},
        { icon:<MapPin className="w-4 h-4 text-[#378ADD]"/>, label:'Address',      key:'address',type:'text', placeholder:'Full address'   },
      ]
    },
    {
      title: 'Business Info',
      fields: [
        { icon:<Building2 className="w-4 h-4 text-[#F59E0B]"/>, label:'GST Holder Name', key:'gstHolderName', type:'text', placeholder:'Name on GST'         },
        { icon:<FileText className="w-4 h-4 text-[#F59E0B]"/>,  label:'GST Number',      key:'gstNumber',     type:'text', placeholder:'e.g. 29AAAAA0000A1Z5' },
        { icon:<User className="w-4 h-4 text-[#6366f1]"/>,      label:'PAN Holder Name', key:'panHolderName', type:'text', placeholder:'Name on PAN card'    },
        { icon:<CreditCard className="w-4 h-4 text-[#6366f1]"/>,label:'PAN Number',      key:'panNumber',     type:'text', placeholder:'e.g. ABCDE1234F'     },
        { icon:<Hash className="w-4 h-4 text-[#06D6A0]"/>,      label:'Dealer Code',     key:'dealerCode',    type:'text', placeholder:'Your dealer code'    },
      ]
    },
  ];

  const ProfileInfoRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ padding:'10px 0', borderBottom:'1px solid #f5f5fb', display:'flex', alignItems:'flex-start', gap:8 }}>
      <span style={{ color:'#b0b0c0', fontSize:12, minWidth:130, paddingTop:1 }}>{label}</span>
      <span style={{ color: value ? '#2D3561' : '#d0d0e0', fontSize:13, fontWeight: value ? 600 : 400, fontStyle: value ? 'normal' : 'italic', flex:1, wordBreak:'break-word' }}>
        {value || 'Not provided'}
      </span>
    </div>
  );

  const editModal = (
    <div style={{ position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:99999,display:'flex',alignItems:'flex-end',justifyContent:'center' }}>
      <div onClick={()=>setShowEditModal(false)} style={{ position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(4px)' }}/>
      <div className="animate-slide-in-bottom" style={{ position:'relative',width:'100%',maxWidth:448,background:'#fff',borderRadius:'24px 24px 0 0',boxShadow:'0 -8px 40px rgba(0,0,0,0.18)',padding:'16px 16px 36px',maxHeight:'92vh',overflowY:'auto',zIndex:10 }}>
        <div style={{ width:40,height:4,background:'#E0E0F0',borderRadius:99,margin:'0 auto 16px' }}/>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#2D3561] font-black text-base">Edit Profile</h2>
          <button onClick={()=>setShowEditModal(false)} className="w-8 h-8 bg-[#F5F5FB] rounded-full flex items-center justify-center hover:bg-[#FFE5E5] transition-colors active:scale-90">
            <X className="w-4 h-4 text-[#888]"/>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF4444] flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-black">{editDraft.initials}</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Camera className="w-3.5 h-3.5 text-white"/>
            </button>
          </div>
        </div>

        {editSections.map(section => (
          <div key={section.title} style={{ marginBottom:20 }}>
            <div style={{ fontSize:11,fontWeight:800,color:'#b0b0c0',textTransform:'uppercase',letterSpacing:1.5,marginBottom:12,padding:'0 2px' }}>
              {section.title}
            </div>
            <div className="space-y-3">
              {section.fields.map(field => (
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
          </div>
        ))}

        <button onClick={handleSave} className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 transition-all">
          <Save className="w-4 h-4"/>
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F7FF] relative">

      {/* Saved Toast */}
      {savedToast && (
        <div style={{ position:'fixed',top:18,left:'50%',transform:'translateX(-50%)',background:'#15803d',color:'white',padding:'10px 22px',borderRadius:22,fontSize:13,fontWeight:700,zIndex:100000,boxShadow:'0 4px 18px rgba(21,128,61,0.35)',animation:'slideDown 0.3s ease',whiteSpace:'nowrap' }}>
          ✅ Profile saved successfully!
        </div>
      )}

      <div className="bg-white px-4 pt-6 pb-4 border-b border-[#F0F0F8] animate-fade-in-down">
        <h1 className="text-[#2D3561] font-bold text-lg text-center">More</h1>
      </div>

      <div className="px-3 py-4">

        {/* Profile Card */}
        <div className="bg-white border border-[#EDEDF5] rounded-3xl p-4 mb-4 hover-lift animate-scale-in delay-100 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] via-white to-[#F8F7FF] pointer-events-none"/>
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
              {profile.dealerCode && (
                <div className="flex items-center gap-1 text-[#B0B0C0] text-xs">
                  <Hash className="w-3 h-3"/>
                  <span>Dealer: {profile.dealerCode}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-[#B0B0C0] text-xs mt-0.5">
                <MapPin className="w-3 h-3"/>
                <span>{profile.city}{profile.state ? `, ${profile.state}` : ''}</span>
              </div>
            </div>
            <button
              onClick={()=>{ setEditDraft(profile); setShowEditModal(true); }}
              className="w-10 h-10 bg-[#FFF0F0] hover:bg-[#FF6B6B] rounded-xl flex items-center justify-center transition-all active:scale-90 group shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-[#FF6B6B] group-hover:text-white transition-colors"/>
            </button>
          </div>

          {/* Gold strip */}
          <div className="relative mt-3 flex items-center gap-2 bg-gradient-to-r from-[#FFF8E1] to-[#FFFDE7] rounded-xl px-3 py-2 border border-[#FFD54F]/30">
            <div className="w-2 h-2 bg-[#FFD54F] rounded-full animate-ping"/>
            <div className="w-2 h-2 bg-[#FFD54F] rounded-full absolute left-3"/>
            <Star className="w-4 h-4 text-[#F59E0B] ml-1 animate-sparkle" fill="#F59E0B"/>
            <span className="text-[#B8860B] text-xs font-bold">Gold Member</span>
            <span className="ml-auto text-[#B8860B] text-[10px]">750 pts to Platinum →</span>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white border border-[#EDEDF5] rounded-2xl px-4 py-3 mb-4 shadow-sm animate-fade-in-up delay-150">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#2D3561] font-bold text-sm">Profile Details</h3>
            <button
              onClick={()=>{ setEditDraft(profile); setShowEditModal(true); }}
              style={{ display:'flex',alignItems:'center',gap:5,color:'#FF6B6B',fontSize:12,fontWeight:700,background:'rgba(255,107,107,0.08)',border:'none',borderRadius:8,padding:'5px 10px',cursor:'pointer' }}
            >
              <Edit3 style={{ width:12,height:12 }}/>Edit
            </button>
          </div>

          {/* KYC Warning */}
          {(!profile.panNumber || !profile.gstNumber) && (
            <div style={{ background:'#fffbeb',border:'1px solid #fcd34d',borderRadius:10,padding:'9px 13px',marginBottom:12,display:'flex',alignItems:'flex-start',gap:8,fontSize:12 }}>
              <span style={{ fontSize:15,flexShrink:0 }}>⚠️</span>
              <div>
                <p style={{ margin:0,fontWeight:700,color:'#92400e',fontSize:12 }}>Complete KYC to unlock all features</p>
                <p style={{ margin:'2px 0 0',color:'#b45309',fontSize:11 }}>Add PAN & GST details to get verified</p>
              </div>
            </div>
          )}
          {profile.panNumber && profile.gstNumber && (
            <div style={{ background:'#f0fff4',border:'1px solid #bbf7d0',borderRadius:10,padding:'9px 13px',marginBottom:12,display:'flex',alignItems:'center',gap:8,fontSize:12 }}>
              <span style={{ fontSize:15 }}>✅</span>
              <p style={{ margin:0,fontWeight:700,color:'#15803d',fontSize:12 }}>KYC Verified — Profile Complete</p>
            </div>
          )}

          <ProfileInfoRow label="Mobile Number" value={profile.phone}/>
          <ProfileInfoRow label="Email ID" value={profile.email}/>
          <ProfileInfoRow label="State" value={profile.state}/>
          <ProfileInfoRow label="City" value={profile.city}/>
          <ProfileInfoRow label="Pincode" value={profile.pincode}/>
          <ProfileInfoRow label="Address" value={profile.address}/>
          <ProfileInfoRow label="GST Holder Name" value={profile.gstHolderName}/>
          <ProfileInfoRow label="GST Number" value={profile.gstNumber}/>
          <ProfileInfoRow label="PAN Holder Name" value={profile.panHolderName}/>
          <ProfileInfoRow label="PAN Number" value={profile.panNumber}/>
          <div style={{ padding:'10px 0', display:'flex', alignItems:'flex-start', gap:8 }}>
            <span style={{ color:'#b0b0c0', fontSize:12, minWidth:130, paddingTop:1 }}>Dealer Code</span>
            <span style={{ color: profile.dealerCode ? '#2D3561' : '#d0d0e0', fontSize:13, fontWeight: profile.dealerCode ? 600 : 400, flex:1 }}>
              {profile.dealerCode || 'Not provided'}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden mb-4 animate-fade-in-up delay-200 shadow-sm">
          {menuItems.map((item,i)=>(
            <button key={i} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-3.5 ${i<menuItems.length-1?'border-b border-[#F5F5FB]':''} hover:bg-[#FAFAFA] transition-all active:scale-[0.99] ripple-container group`}>
              <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>{item.icon}</div>
              <span className="text-[#2D3561] text-sm font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-[#D0D0E0] group-hover:text-[#FF6B6B] group-hover:translate-x-0.5 transition-all"/>
            </button>
          ))}
        </div>

        {/* Settings */}
        <div className="mb-4 animate-fade-in-up delay-400">
          <h3 className="text-[#2D3561] font-bold text-sm mb-2 px-1">Settings</h3>
          <div className="bg-white border border-[#EDEDF5] rounded-2xl overflow-hidden shadow-sm">
            {settingsItems.map((item,i)=>(
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3.5 ${i<settingsItems.length-1?'border-b border-[#F5F5FB]':''} hover:bg-[#FAFAFA] transition-all active:scale-[0.99] ripple-container relative group`}>
                <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                <span className="text-[#2D3561] text-sm font-semibold flex-1 text-left">{item.label}</span>
                {item.badge&&<><div className="absolute top-3.5 left-[52px] w-2 h-2 bg-[#FF6B6B] rounded-full animate-ping opacity-75"/><div className="absolute top-3.5 left-[52px] w-2 h-2 bg-[#FF6B6B] rounded-full"/></>}
                <ChevronRight className="w-4 h-4 text-[#D0D0E0] group-hover:text-[#FF6B6B] transition-colors"/>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] rounded-2xl p-4 mb-4 text-white shadow-xl hover-lift animate-fade-in-up delay-500 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-10 pointer-events-none"/>
          <div className="flex items-center gap-2 mb-3 relative">
            <Star className="w-5 h-5 text-[#FFD54F] animate-sparkle" fill="#FFD54F"/>
            <span className="text-sm font-bold">Your Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-2 relative">
            {stats.map((stat,i)=>(
              <div key={i} className={`${stat.bg} backdrop-blur-sm rounded-xl p-3 text-center hover-lift animate-fade-in-up border border-white/10`} style={{animationDelay:`${600+i*80}ms`}}>
                <div className={`${stat.color} font-black text-xl`}>{stat.value}</div>
                <div className="text-white/60 text-[10px] mt-0.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-[#FFE5E5] text-[#FF6B6B] font-bold text-sm hover:bg-red-50 rounded-2xl transition-all active:scale-95 ripple-container animate-fade-in-up delay-600 shadow-sm">
          <LogOut className="w-4 h-4"/>Sign Out
        </button>
      </div>

      {showEditModal && createPortal(editModal, document.body)}
    </div>
  );
}

import { useState } from 'react';
import { Zap, Check, ScanQrCode, Gift } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const [step, setStep] = useState<'landing' | 'login'>('landing');
  const [userType, setUserType] = useState<'electrician' | 'dealer'>('electrician');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGetStarted();
    }, 1400);
  };

  if (step === 'login') {
    return (
      <div
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          maxWidth: 448, margin: '0 auto', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
          fontFamily: 'inherit',
        }}
      >
        <style>{`
          @keyframes blobFloat1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(15px,-20px) scale(1.05)}66%{transform:translate(-8px,12px) scale(0.95)}}
          @keyframes blobFloat2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-12px,18px) scale(1.08)}70%{transform:translate(10px,-10px) scale(0.92)}}
          @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
          @keyframes fadeInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
          @keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
          @keyframes spinR{to{transform:rotate(360deg)}}
          @keyframes shimmerPass{from{left:-100%}to{left:150%}}
          .login-anim{animation:slideUp 0.55s cubic-bezier(0.34,1.4,0.64,1) both}
          .f1{animation:fadeInUp 0.45s ease both 0.08s}
          .f2{animation:fadeInUp 0.45s ease both 0.16s}
          .f3{animation:fadeInUp 0.45s ease both 0.24s}
          .f4{animation:fadeInUp 0.45s ease both 0.32s}
          .f5{animation:fadeInUp 0.45s ease both 0.40s}
          .f6{animation:fadeInUp 0.45s ease both 0.48s}
          .chk{animation:popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both}
          .spin-el{width:20px;height:20px;border:2.5px solid rgba(255,255,255,0.25);border-top-color:white;border-radius:50%;animation:spinR 0.75s linear infinite}
          .toggle-btn{transition:all 0.25s cubic-bezier(0.34,1.2,0.64,1)}
          .cont-btn{position:relative;overflow:hidden;transition:all 0.3s ease}
          .cont-btn::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:shimmerPass 2s ease infinite 1s}
        `}</style>

        {/* Blobs */}
        <div style={{position:'absolute',width:320,height:320,background:'radial-gradient(circle,rgba(255,107,107,0.18) 0%,transparent 70%)',top:-80,right:-80,borderRadius:'50%',animation:'blobFloat1 8s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',width:250,height:250,background:'radial-gradient(circle,rgba(255,82,82,0.12) 0%,transparent 70%)',bottom:40,left:-60,borderRadius:'50%',animation:'blobFloat2 11s ease-in-out infinite',pointerEvents:'none'}}/>

        {/* Back */}
        <button
          onClick={() => setStep('landing')}
          style={{position:'absolute',top:22,left:18,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:12,width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.8)',fontSize:19,cursor:'pointer',zIndex:10,fontFamily:'inherit'}}
        >←</button>

        <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',flex:1,justifyContent:'center',padding:'72px 24px 32px'}}>

          {/* Logo */}
          <div className="login-anim" style={{display:'flex',alignItems:'center',gap:14,marginBottom:32}}>
            <div style={{width:54,height:54,background:'linear-gradient(135deg,#FF6B6B,#FF5252)',borderRadius:17,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 28px rgba(255,107,107,0.45)',flexShrink:0}}>
              <Zap className="w-7 h-7 text-white" fill="white"/>
            </div>
            <div>
              <div style={{color:'white',fontWeight:900,fontSize:22,letterSpacing:3}}>SRV</div>
              <div style={{color:'rgba(255,255,255,0.38)',fontSize:10,letterSpacing:2,textTransform:'uppercase',marginTop:1}}>Electricals</div>
            </div>
          </div>

          {/* Heading */}
          <div className="f1" style={{marginBottom:28}}>
            <h1 style={{color:'white',fontSize:27,fontWeight:800,margin:'0 0 7px',letterSpacing:-0.3}}>Welcome Back 👋</h1>
            <p style={{color:'rgba(255,255,255,0.42)',fontSize:13.5,margin:0,lineHeight:1.5}}>Sign in to your smart rewards account</p>
          </div>

          {/* Label */}
          <div className="f2" style={{color:'rgba(255,255,255,0.35)',fontSize:10.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1.8,marginBottom:10}}>Login As</div>

          {/* Toggle */}
          <div className="f2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
            {(['electrician','dealer'] as const).map(type => (
              <button
                key={type}
                className="toggle-btn"
                onClick={() => setUserType(type)}
                style={{
                  padding:'13px 12px',borderRadius:14,
                  border: userType===type ? '1.5px solid #FF6B6B' : '1.5px solid rgba(255,255,255,0.1)',
                  background: userType===type ? 'linear-gradient(135deg,#FF6B6B,#FF5252)' : 'rgba(255,255,255,0.04)',
                  color: userType===type ? 'white' : 'rgba(255,255,255,0.42)',
                  fontWeight:700,fontSize:13.5,cursor:'pointer',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  boxShadow: userType===type ? '0 6px 22px rgba(255,107,107,0.42)' : 'none',
                  transform: userType===type ? 'translateY(-2px)' : 'none',
                  fontFamily:'inherit',
                }}
              >
                <span style={{fontSize:18}}>{type==='electrician' ? '⚡' : '🏪'}</span>
                <span>{type==='electrician' ? 'Electrician' : 'Dealer'}</span>
              </button>
            ))}
          </div>

          {/* Role badge */}
          <div className="f3" style={{
            padding:'10px 14px',borderRadius:12,marginBottom:22,
            background: userType==='electrician' ? 'rgba(255,107,107,0.1)' : 'rgba(59,130,246,0.1)',
            border: userType==='electrician' ? '1px solid rgba(255,107,107,0.22)' : '1px solid rgba(59,130,246,0.22)',
            color: userType==='electrician' ? 'rgba(255,185,185,0.9)' : 'rgba(147,197,253,0.9)',
            fontSize:12.5,lineHeight:1.55,transition:'all 0.35s ease',
          }}>
            {userType==='electrician'
              ? '👷 Scan QR codes on SRV products and earn rewards instantly'
              : '🏪 Manage your dealership, track orders and grow your business'}
          </div>

          {/* Phone input */}
          <div className="f4" style={{marginBottom:8}}>
            <div style={{
              display:'flex',alignItems:'center',
              background:'rgba(255,255,255,0.06)',
              border: `1.5px solid ${phone.length>0 ? '#FF6B6B' : 'rgba(255,255,255,0.12)'}`,
              borderRadius:14,padding:'0 16px',
              boxShadow: phone.length>0 ? '0 0 0 4px rgba(255,107,107,0.12)' : 'none',
              transition:'all 0.3s ease',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:7,color:'rgba(255,255,255,0.72)',fontSize:14,fontWeight:600,whiteSpace:'nowrap',padding:'14px 0',flexShrink:0}}>
                <span style={{fontSize:19}}>🇮🇳</span>
                <span>+91</span>
                <span style={{color:'rgba(255,255,255,0.15)',margin:'0 4px',fontWeight:300,fontSize:18}}>|</span>
              </div>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g,'').slice(0,10))}
                maxLength={10}
                style={{
                  flex:1,background:'transparent',border:'none',outline:'none',
                  color:'white',fontSize:15.5,fontFamily:'inherit',fontWeight:500,
                  padding:'14px 8px',letterSpacing:1.5,
                }}
              />
              {phone.length===10 && (
                <span className="chk" style={{color:'#4ade80',fontSize:19,fontWeight:700}}>✓</span>
              )}
            </div>
            <p style={{color:'rgba(255,255,255,0.25)',fontSize:11.5,margin:'8px 4px 0'}}>
              We'll send an OTP to verify your number
            </p>
          </div>

          {/* Continue */}
          <button
            className="f5 cont-btn"
            onClick={handleContinue}
            disabled={phone.length<10||loading}
            style={{
              width:'100%',padding:'16px',borderRadius:14,border:'none',
              background: phone.length===10 ? 'linear-gradient(135deg,#FF6B6B,#FF5252)' : 'rgba(255,255,255,0.07)',
              color:'white',fontSize:15,fontWeight:700,fontFamily:'inherit',
              cursor: phone.length===10 ? 'pointer' : 'not-allowed',
              display:'flex',alignItems:'center',justifyContent:'center',gap:10,
              boxShadow: phone.length===10 ? '0 10px 30px rgba(255,107,107,0.42)' : 'none',
              transform: phone.length===10 ? 'translateY(-1px)' : 'none',
              marginBottom:18,marginTop:10,
            }}
          >
            {loading ? <span className="spin-el"/> : <><span>Continue</span><span style={{fontSize:19}}>→</span></>}
          </button>

          <p className="f6" style={{textAlign:'center',color:'rgba(255,255,255,0.22)',fontSize:11.5,lineHeight:1.7,margin:0}}>
            By continuing you agree to our{' '}
            <span style={{color:'rgba(255,107,107,0.75)',cursor:'pointer'}}>Terms of Service</span> &{' '}
            <span style={{color:'rgba(255,107,107,0.75)',cursor:'pointer'}}>Privacy Policy</span>
          </p>
        </div>
      </div>
    );
  }

  // ─── Landing ───
  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col max-w-md mx-auto">
      <div className="bg-gradient-to-br from-[#2D3561] to-[#3D4575] px-5 py-8 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#FF5252] rounded-3xl flex items-center justify-center shadow-xl animate-bounce-in animate-glow-pulse">
          <Zap className="w-10 h-10 text-white animate-sparkle" fill="white"/>
        </div>
        <div className="text-center animate-fade-in-up delay-200">
          <h1 className="text-white font-bold text-lg tracking-wide">SRV Electricals</h1>
          <p className="text-white/50 text-xs tracking-wide mt-1">Your Smart Rewards Platform</p>
        </div>
        <div className="flex items-center gap-2 w-full mt-2">
          {[
            {icon:<Check className="w-4 h-4 text-white" strokeWidth={3}/>,label:'Buy',sub:'SRV product',delay:'delay-300'},
            {icon:<ScanQrCode className="w-4 h-4 text-white" strokeWidth={2.5}/>,label:'Scan',sub:'QR on box',delay:'delay-400'},
            {icon:<Gift className="w-4 h-4 text-white" strokeWidth={2.5}/>,label:'Win',sub:'Rewards',delay:'delay-500'},
          ].map((step,i)=>(
            <>
              {i>0&&<div key={`a${i}`} className="text-white/25 text-lg">›</div>}
              <div key={step.label} className={`flex-1 bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 animate-fade-in-up ${step.delay} hover-lift`}>
                <div className="w-8 h-8 bg-[#FF6B6B] rounded-xl flex items-center justify-center">{step.icon}</div>
                <div className="text-white text-[10px] font-semibold">{step.label}</div>
                <div className="text-white/40 text-[9px]">{step.sub}</div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="flex-1 px-4 py-5 flex flex-col">
        <h2 className="text-[#2D3561] font-bold mb-2 animate-fade-in-up delay-200">Buy. Scan. Get rewarded.</h2>
        <p className="text-[#9090A8] text-xs leading-relaxed mb-6 animate-fade-in-up delay-300">
          Every SRV product has a hidden QR code. Scan it to earn points and unlock cashback, gifts & vouchers.
        </p>
        <div className="mt-auto space-y-3">
          <button onClick={()=>setStep('login')} className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 animate-fade-in-up delay-400 ripple-container animate-glow-pulse">
            Get Started →
          </button>
          <button onClick={()=>setStep('login')} className="w-full border-2 border-[#E0DFEF] text-[#2D3561] font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all animate-fade-in-up delay-500 ripple-container">
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

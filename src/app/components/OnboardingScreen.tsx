import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, CheckCircle2, LockKeyhole, UserRound } from 'lucide-react';
import type { UserRole } from '../App';
import srvLogo from '../../srv-logo.png';

interface OnboardingScreenProps {
  onGetStarted: (role: UserRole) => void;
}

const DEALER_DIRECTORY: Record<string, { dealerName: string; city: string }> = {
  '9876543210': { dealerName: 'Shree Ganesh Electrical Traders', city: 'Jaipur' },
  '9810012345': { dealerName: 'Mahalaxmi Power House', city: 'Delhi' },
  '9001122334': { dealerName: 'Shiv Shakti Distributors', city: 'Lucknow' },
};

const ROLE_THEME: Record<UserRole, {
  accent: string;
  badge: string;
  button: string;
  field: string;
  hero: string;
  panel: string;
  selected: string;
  selectedIcon: string;
}> = {
  electrician: {
    accent: 'text-[#C64537]',
    badge: 'bg-[#FFE7E2] text-[#CC4A38]',
    button: 'bg-gradient-to-r from-[#FF695A] via-[#FF7E45] to-[#FFB347]',
    field: 'border-[#FFD8D1] focus-within:border-[#FF8D73] focus-within:ring-[#FFE2DA]',
    hero: 'from-[#E7A334] via-[#6D2E12] to-[#0A0A10]',
    panel: 'from-[#FFF1EC] to-[#FFE4DA]',
    selected: 'border-[#FF8C73] bg-gradient-to-br from-[#FFF0EC] to-[#FFE7DE] shadow-[0_14px_30px_rgba(255,105,90,0.16)]',
    selectedIcon: 'bg-[#FF695A] text-white',
  },
  dealer: {
    accent: 'text-[#35538E]',
    badge: 'bg-[#E7F0FF] text-[#3C5F9A]',
    button: 'bg-gradient-to-r from-[#3B5C98] via-[#4D74B9] to-[#7DA0E8]',
    field: 'border-[#D6E1F8] focus-within:border-[#7DA0E8] focus-within:ring-[#E8F0FF]',
    hero: 'from-[#D5AB5B] via-[#2C416F] to-[#090A12]',
    panel: 'from-[#EEF4FF] to-[#E1EAFF]',
    selected: 'border-[#89A7E6] bg-gradient-to-br from-[#EEF4FF] to-[#E3EBFF] shadow-[0_14px_30px_rgba(77,116,185,0.16)]',
    selectedIcon: 'bg-[#4D74B9] text-white',
  },
};

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<UserRole>('electrician');
  const [roleLocked, setRoleLocked] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [password, setPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupOtp, setSignupOtp] = useState('');
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [dealerPhone, setDealerPhone] = useState('');
  const [dealerVerified, setDealerVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDealer = userType === 'dealer';
  const theme = ROLE_THEME[userType];
  const matchedDealer = dealerPhone.length === 10 ? DEALER_DIRECTORY[dealerPhone] : undefined;
  const roleHeading = 'Welcome to SRV';
  const roleDescription = isDealer
    ? 'Dealer-focused access for business onboarding, secure login, and verified registration.'
    : 'Electrician-focused access for secure login, QR rewards onboarding, and verified registration.';
  useEffect(() => {
    if (loginPhone.length === 10) {
      setLoginOtpSent(true);
    } else {
      setLoginOtpSent(false);
      setLoginOtp('');
    }
  }, [loginPhone]);

  useEffect(() => {
    if (signupPhone.length === 10) {
      setSignupOtpSent(true);
    } else {
      setSignupOtpSent(false);
      setSignupOtp('');
    }
  }, [signupPhone]);

  const canContinue = useMemo(() => {
    if (mode === 'login') {
      return loginPhone.length === 10 && loginOtp.length === 4 && password.trim().length >= 6;
    }

    if (fullName.trim().length < 3 || signupPhone.length !== 10 || signupOtp.length !== 4) {
      return false;
    }

    if (isDealer) {
      return businessName.trim().length >= 3;
    }

    return dealerPhone.length === 10;
  }, [businessName, dealerPhone.length, fullName, isDealer, loginOtp.length, loginPhone.length, mode, password, signupOtp.length, signupPhone.length]);

  const handleVerifyDealer = () => {
    setDealerVerified(Boolean(matchedDealer));
  };

  const handleContinue = () => {
    if (!canContinue) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGetStarted(userType);
    }, 1200);
  };

  const fieldClass = `w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm text-[#221D29] outline-none transition ${theme.field}`;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-[#F8F7FF] px-4 py-5">
      <style>{`
        @keyframes floatLogo {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes plateRotate {
          0%,100% { transform: rotate(-10deg) translateY(0px); }
          50% { transform: rotate(-7deg) translateY(4px); }
        }
        .logo-float { animation: floatLogo 4.8s ease-in-out infinite; }
        .plate-rotate { animation: plateRotate 4.8s ease-in-out infinite; }
      `}</style>

      <div className="overflow-hidden rounded-[34px] border border-[#E7E4F1] bg-white shadow-[0_28px_60px_rgba(61,74,118,0.10)]">
        <div className={`relative overflow-hidden bg-gradient-to-br ${theme.hero} px-5 pb-7 pt-4 text-white`}>
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),transparent_45%,rgba(0,0,0,0.20))]" />
          <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(255,188,122,0.22),_transparent_70%)] blur-3xl" />
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.10),_transparent_70%)] blur-3xl" />

          <div className="relative z-10 text-center">
            {roleLocked && (
              <button
                onClick={() => setRoleLocked(false)}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
                Back
              </button>
            )}
            <h1 className="mt-2 text-[27px] font-black leading-8 tracking-[-0.04em]">{roleHeading}</h1>
            <p className="mt-1.5 text-center text-[14px] font-semibold text-white/92">{isDealer ? 'Dealer' : 'Electrician'}</p>
            <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-5 text-white/80">{roleDescription}</p>

            <div className="relative mx-auto mt-4 h-[156px] w-[210px]">
              <div className="absolute bottom-0 left-1/2 h-10 w-[170px] -translate-x-1/2 rounded-full bg-black/35 blur-xl" />
              <div className="plate-rotate absolute bottom-4 left-1/2 h-[72px] w-[156px] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] backdrop-blur-md" />
              <div className="absolute bottom-7 left-1/2 h-[88px] w-[170px] -translate-x-1/2 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] backdrop-blur-md rotate-[11deg]" />
              <div className="absolute bottom-8 left-1/2 h-[88px] w-[170px] -translate-x-1/2 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] backdrop-blur-md -rotate-[11deg]" />
              <div className={`absolute left-1/2 top-6 h-[96px] w-[96px] -translate-x-1/2 rounded-full blur-md ${isDealer ? 'bg-[radial-gradient(circle,_rgba(125,160,232,0.95)_0%,_rgba(77,116,185,0.42)_36%,_transparent_72%)]' : 'bg-[radial-gradient(circle,_rgba(255,196,117,0.95)_0%,_rgba(255,118,69,0.42)_36%,_transparent_72%)]'}`} />
              <div className="logo-float absolute inset-x-0 top-0 flex justify-center">
                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] px-5 py-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_45px_rgba(0,0,0,0.24)]">
                  <img src={srvLogo} alt="SRV logo" className="h-auto w-[150px] object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t border-white/10 bg-gradient-to-br ${theme.panel} p-4`}>
          <div className="mx-auto flex max-w-[92%] items-center rounded-2xl bg-white/70 p-1 shadow-sm">
            {(['login', 'signup'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                  mode === tab
                    ? 'bg-white text-[#2D3561] shadow-sm'
                    : 'text-[#8B88A3] hover:bg-white/70 hover:text-[#5E5A78]'
                }`}
              >
                {tab === 'login' ? 'Login' : 'Create Account'}
              </button>
            ))}
          </div>

          {!roleLocked && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {([
              { id: 'dealer', title: 'Dealer', sub: 'Business access', icon: <Building2 className="h-4.5 w-4.5" strokeWidth={2.2} /> },
              { id: 'electrician', title: 'Electrician', sub: 'Rewards access', icon: <UserRound className="h-4.5 w-4.5" strokeWidth={2.2} /> },
            ] as const)
              .filter((item) => !roleLocked || item.id === userType)
              .map((item) => {
              const selected = userType === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setUserType(item.id);
                    setRoleLocked(true);
                    setDealerPhone('');
                    setDealerVerified(false);
                  }}
                  className={`rounded-[20px] border px-3.5 py-3.5 text-left transition-all ${selected ? theme.selected : 'border-[#ECE9F7] bg-white/75'}`}
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${selected ? theme.selectedIcon : 'bg-[#F4F2FB] text-[#8D86A8]'}`}>
                    {item.icon}
                  </div>
                  <p className="mt-2 text-[15px] font-bold text-[#2E2230]">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#8D88A0]">{item.sub}</p>
                </button>
                );
              })}
          </div>
          )}

          <div className="mt-5 rounded-[24px] border border-[#ECE9F7] bg-white/86 p-4 backdrop-blur-sm">
            <div className="space-y-3">
              {mode === 'signup' && (
                <>
                  <label className="block">
                    <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Full name</span>
                    <input
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder={isDealer ? 'Owner or manager name' : 'Enter your full name'}
                      className={fieldClass}
                    />
                  </label>

                  {isDealer ? (
                    <label className="block">
                      <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Business name</span>
                      <input
                        value={businessName}
                        onChange={(event) => setBusinessName(event.target.value)}
                        placeholder="Enter shop or firm name"
                        className={fieldClass}
                      />
                    </label>
                  ) : (
                    <div className="rounded-[18px] border border-[#ECE9F7] bg-white p-3">
                      <div className="flex items-end gap-2">
                        <label className="block flex-1">
                          <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Dealer phone</span>
                          <input
                            value={dealerPhone}
                            onChange={(event) => {
                              setDealerPhone(event.target.value.replace(/\D/g, '').slice(0, 10));
                              setDealerVerified(false);
                            }}
                            placeholder="Enter dealer mobile number"
                            className={fieldClass}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleVerifyDealer}
                          disabled={dealerPhone.length !== 10}
                          className={`rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                            dealerPhone.length === 10 ? 'bg-[#2D3561] text-white' : 'bg-[#E7E5F1] text-[#9E9BB0]'
                          }`}
                        >
                          Verify
                        </button>
                      </div>

                      <div className="mt-2 min-h-[42px] rounded-2xl bg-[#F8F7FF] px-3 py-2">
                        {matchedDealer ? (
                          <div className="flex items-start gap-2 text-[#207A43]">
                            <CheckCircle2 className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-xs font-bold">{dealerVerified ? 'Dealer matched' : 'Dealer found'}</p>
                              <p className="text-[11px] text-[#5C6A62]">{matchedDealer.dealerName}, {matchedDealer.city}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[11px] text-[#8C7B82]">Enter a 10-digit dealer number.</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {mode === 'login' ? (
                <>
                  <label className="block">
                    <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Mobile number</span>
                    <div className={`flex items-center rounded-2xl border-2 bg-white px-4 shadow-[0_8px_20px_rgba(61,74,118,0.06)] ${theme.field}`}>
                      <span className="pr-3 text-sm font-bold text-[#7F7A99]">+91</span>
                      <div className="mr-3 h-6 w-px bg-[#E5E1F0]" />
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(event) => setLoginPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter mobile number"
                        className="w-full bg-transparent py-3.5 text-[15px] font-medium tracking-[0.08em] text-[#2E2230] outline-none"
                      />
                      {loginPhone.length === 10 && <BadgeCheck className="h-5 w-5 text-[#22C55E]" strokeWidth={2.2} />}
                    </div>
                  </label>

                  {loginOtpSent && (
                    <div className="rounded-[18px] border border-[#ECE9F7] bg-white p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-[#7D7891]">OTP sent to +91 {loginPhone}</p>
                        <button
                          type="button"
                          onClick={() => loginPhone.length === 10 && setLoginOtpSent(true)}
                          disabled={loginPhone.length !== 10}
                          className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                            loginPhone.length === 10 ? 'bg-[#2D3561] text-white' : 'bg-[#E7E5F1] text-[#9E9BB0]'
                          }`}
                        >
                          Resend OTP
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                        <input
                          value={loginOtp}
                          onChange={(event) => setLoginOtp(event.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="Enter 4-digit OTP"
                          className={fieldClass}
                        />
                        {loginOtp.length === 4 && (
                          <div className="flex items-center rounded-2xl bg-[#EFFFF2] px-3 text-[#207A43]">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <label className="block">
                    <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Password</span>
                    <div className={`flex items-center rounded-2xl border-2 bg-white px-4 shadow-[0_8px_20px_rgba(61,74,118,0.06)] ${theme.field}`}>
                      <LockKeyhole className="mr-3 h-4.5 w-4.5 text-[#8D88A0]" />
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-transparent py-3.5 text-[15px] font-medium text-[#2E2230] outline-none"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <label className="block">
                    <span className={`mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>Mobile number</span>
                    <div className={`flex items-center rounded-2xl border-2 bg-white px-4 shadow-[0_8px_20px_rgba(61,74,118,0.06)] ${theme.field}`}>
                      <span className="pr-3 text-sm font-bold text-[#7F7A99]">+91</span>
                      <div className="mr-3 h-6 w-px bg-[#E5E1F0]" />
                      <input
                        type="tel"
                        value={signupPhone}
                        onChange={(event) => setSignupPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter mobile number"
                        className="w-full bg-transparent py-3.5 text-[15px] font-medium tracking-[0.08em] text-[#2E2230] outline-none"
                      />
                      {signupPhone.length === 10 && <BadgeCheck className="h-5 w-5 text-[#22C55E]" strokeWidth={2.2} />}
                    </div>
                  </label>

                  {signupOtpSent && (
                    <div className="rounded-[18px] border border-[#ECE9F7] bg-white p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-[#7D7891]">OTP sent to +91 {signupPhone}</p>
                        <button
                          type="button"
                          onClick={() => signupPhone.length === 10 && setSignupOtpSent(true)}
                          disabled={signupPhone.length !== 10}
                          className={`rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                            signupPhone.length === 10 ? 'bg-[#2D3561] text-white' : 'bg-[#E7E5F1] text-[#9E9BB0]'
                          }`}
                        >
                          Resend OTP
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                        <input
                          value={signupOtp}
                          onChange={(event) => setSignupOtp(event.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="Enter 4-digit OTP"
                          className={fieldClass}
                        />
                        {signupOtp.length === 4 && (
                          <div className="flex items-center rounded-2xl bg-[#EFFFF2] px-3 text-[#207A43]">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={!canContinue || loading}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-[20px] px-4 py-3.5 text-sm font-bold text-white transition-all ${
                canContinue && !loading ? `${theme.button} active:scale-[0.99]` : 'bg-[#E7E5F1] text-[#9E9BB0]'
              }`}
            >
              {loading ? 'Opening dashboard...' : mode === 'login' ? 'Continue to dashboard' : 'Complete registration'}
              {!loading && <ArrowRight className="h-4 w-4" strokeWidth={2.4} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

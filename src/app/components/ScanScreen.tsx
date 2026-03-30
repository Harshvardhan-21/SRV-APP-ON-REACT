import { ArrowLeft, CheckCircle, Flashlight, Image, ScanQrCode } from 'lucide-react';
import { useState } from 'react';

interface ScanScreenProps {
  onNavigate: (screen: 'home' | 'scan' | 'rewards' | 'profile' | 'product' | 'wallet') => void;
}

export function ScanScreen({ onNavigate }: ScanScreenProps) {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(true);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanned(true);
      setScanning(false);
    }, 1500);
  };

  const handleClaim = () => onNavigate('home');

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-[#F0F0F8] animate-fade-in-down">
        <button
          onClick={() => onNavigate('home')}
          className="w-9 h-9 bg-[#F5F5FB] rounded-xl flex items-center justify-center active:scale-90 transition-transform ripple-container"
        >
          <ArrowLeft className="w-5 h-5 text-[#2D3561]" strokeWidth={2} />
        </button>
        <h1 className="text-[#2D3561] font-bold flex-1 text-center">Scan QR Code</h1>
        <div className="w-9"></div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center px-4 py-6">
        <p className="text-[#B0B0C0] text-xs text-center leading-relaxed mb-6 animate-fade-in-up delay-100">
          Point camera at the QR sticker<br />on any SRV product box
        </p>

        {/* Scanner Viewfinder */}
        <div className="relative w-56 h-56 mb-5 animate-scale-in delay-100">
          <div className="w-full h-full bg-gradient-to-br from-[#F0EFFF] to-[#E8E7FF] rounded-3xl flex items-center justify-center overflow-hidden">
            {/* QR Code Mock */}
            <div className="grid grid-cols-6 gap-1 w-28">
              {[1,1,0,1,0,1, 1,0,1,1,1,0, 0,1,0,1,0,1, 1,1,1,0,1,1, 0,1,0,1,0,0, 1,0,1,1,1,1].map((cell, i) => (
                <div key={i} className={`h-4 rounded-sm transition-all ${cell ? 'bg-[#2D3561]' : 'bg-[#2D3561]/5'}`} />
              ))}
            </div>
          </div>

          {/* Corner Brackets — animated */}
          <div className="absolute top-0 left-0 w-7 h-7 border-t-4 border-l-4 border-[#FF6B6B] rounded-tl-2xl animate-pop-in delay-200"></div>
          <div className="absolute top-0 right-0 w-7 h-7 border-t-4 border-r-4 border-[#FF6B6B] rounded-tr-2xl animate-pop-in delay-250"></div>
          <div className="absolute bottom-0 left-0 w-7 h-7 border-b-4 border-l-4 border-[#FF6B6B] rounded-bl-2xl animate-pop-in delay-300"></div>
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-4 border-r-4 border-[#FF6B6B] rounded-br-2xl animate-pop-in delay-350"></div>

          {/* Scanning Beam */}
          {scanning && !scanned && (
            <div className="absolute w-3/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent left-1/2 -translate-x-1/2 rounded-full animate-scan-beam shadow-[0_0_8px_#FF6B6B]"></div>
          )}

          {/* Success overlay */}
          {scanned && (
            <div className="absolute inset-0 bg-[#06D6A0]/10 rounded-3xl flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-16 h-16 text-[#06D6A0] animate-bounce-in" />
            </div>
          )}
        </div>

        {/* Success Message */}
        {scanned && (
          <div className="w-full bg-[#E6FDF5] border-2 border-[#06D6A0] rounded-2xl p-4 flex items-center gap-3 mb-4 animate-fade-in-up">
            <div className="w-10 h-10 bg-[#06D6A0] rounded-full flex items-center justify-center flex-shrink-0 animate-bounce-in">
              <CheckCircle className="w-5 h-5 text-white" fill="white" />
            </div>
            <div className="flex-1">
              <div className="text-[#047857] text-sm font-bold">SRV MCB 32A detected!</div>
              <div className="text-[#555] text-xs">You earned +80 reward points</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {scanned ? (
          <>
            <button
              onClick={handleClaim}
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 mb-3 animate-fade-in-up ripple-container animate-glow-pulse"
            >
              Claim Points & Continue
            </button>
            <p className="text-[#C0C0D0] text-xs mb-3 animate-fade-in-up delay-100">— or scan another product —</p>
          </>
        ) : (
          <button
            onClick={handleScan}
            className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF5252] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 mb-6 animate-fade-in-up delay-400 ripple-container"
            disabled={scanning}
          >
            {scanning ? 'Scanning...' : 'Start Scanning'}
          </button>
        )}

        {/* Extra Options */}
        <div className="flex gap-3 w-full animate-fade-in-up delay-500">
          <button className="flex-1 bg-[#F5F5FB] rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#EDEDF5] transition-all active:scale-95 ripple-container">
            <Flashlight className="w-4 h-4 text-[#2D3561]" />
            <span className="text-[#2D3561] text-xs font-semibold">Flashlight</span>
          </button>
          <button className="flex-1 bg-[#F5F5FB] rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#EDEDF5] transition-all active:scale-95 ripple-container">
            <Image className="w-4 h-4 text-[#2D3561]" />
            <span className="text-[#2D3561] text-xs font-semibold">Gallery</span>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-8 w-full bg-white border border-[#EDEDF5] rounded-2xl p-4 animate-fade-in-up delay-600">
          <h3 className="text-[#2D3561] font-bold text-sm mb-3">How to Scan</h3>
          <div className="space-y-2.5">
            {[
              'Look for the QR code sticker on your SRV product box',
              'Position the QR code within the scanning frame',
              'Earn instant points and redeem exciting rewards!',
            ].map((text, i) => (
              <div key={i} className={`flex gap-3 animate-fade-in-left`} style={{ animationDelay: `${700 + i * 80}ms` }}>
                <div className="w-6 h-6 bg-[#FF6B6B] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">{i + 1}</div>
                <p className="text-[#9090A8] text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

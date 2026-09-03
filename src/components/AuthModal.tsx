import React, { useState } from 'react';
import { X, User, Phone, CheckCircle2, ShieldCheck, Tractor } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'buyer' | 'farmer' | 'coordinator'>('buyer');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      onClose();
      setLoggedIn(false);
      setOtpSent(false);
      setPhone('');
    }, 1500);
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        id="auth-modal-card"
        className="bg-[#faf9f7] w-full max-w-sm rounded-2xl shadow-2xl border border-[#e3e2e0] overflow-hidden p-6 animate-scaleUp"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#e3e2e0]">
          <h3 className="text-lg font-bold text-[#1a1c1b]">
            {role === 'farmer' ? 'Farmer & FPO Portal' : role === 'coordinator' ? 'Colony Lead Login' : 'Sign In to KisanDirect'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loggedIn ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg text-[#003629]">Welcome back!</h4>
            <p className="text-xs text-[#707974]">Connected to Delhi NCR Agricultural Node.</p>
          </div>
        ) : (
          <div className="pt-4 space-y-4 text-xs">
            {/* Role selector */}
            <div className="grid grid-cols-3 gap-1 bg-[#efeeec] p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  role === 'buyer' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-[#1a1c1b]'
                }`}
              >
                Resident
              </button>
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  role === 'farmer' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-[#1a1c1b]'
                }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => setRole('coordinator')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  role === 'coordinator' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-[#1a1c1b]'
                }`}
              >
                RWA Lead
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">Mobile Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 pl-9 outline-none focus:border-[#003629]"
                    />
                    <Phone className="w-4 h-4 text-[#707974] absolute left-3 top-3" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#003629] text-white py-2.5 rounded-lg font-bold hover:bg-[#1b4d3e] transition-colors cursor-pointer text-sm"
                >
                  Send OTP Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div className="p-2.5 bg-[#baeed9]/40 rounded-lg text-[#002117] flex items-center justify-between">
                  <span>OTP sent to +91 {phone}</span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-xs font-bold underline"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">Enter 4-Digit Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 text-center text-lg font-mono tracking-widest outline-none focus:border-[#003629]"
                  />
                  <div className="text-[10px] text-gray-500 mt-1 text-center">
                    Demo OTP: Enter any 4 digits (e.g. 1234)
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#003629] text-white py-2.5 rounded-lg font-bold hover:bg-[#1b4d3e] transition-colors cursor-pointer text-sm"
                >
                  Verify & Continue
                </button>
              </form>
            )}

            <div className="pt-2 text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1b6d24]" />
              <span>Direct Farm Gate Verification • 100% Secure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Users, Building, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [societyName, setSocietyName] = useState('');
  const [sectorCity, setSectorCity] = useState('');
  const [leadName, setLeadName] = useState('');
  const [phone, setPhone] = useState('');
  const [estFlats, setEstFlats] = useState('150');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDone = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      id="join-group-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        id="join-group-modal-card"
        className="bg-[#faf9f7] w-full max-w-lg rounded-2xl shadow-2xl border border-[#e3e2e0] overflow-hidden flex flex-col animate-scaleUp"
      >
        <div className="p-5 border-b border-[#e3e2e0] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#003629]" />
              <span>Join or Launch a Colony Hub</span>
            </h3>
            <p className="text-xs text-[#707974] mt-0.5">
              Unlock free electric van delivery directly to your residential society gate.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-[#003629]">Society Registered!</h4>
            <p className="text-sm text-[#404945]">
              Thank you, <strong>{leadName}</strong>! Our Delhi NCR agricultural logistics team will verify <strong>{societyName}</strong> and activate gate drop routing within 24 hours.
            </p>
            <div className="bg-white p-4 rounded-xl border border-[#e3e2e0] text-xs text-[#404945] text-left space-y-2">
              <div className="flex items-center gap-2 text-[#1b6d24] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Coordinator Welcome Perk Activated</span>
              </div>
              <p>As society lead, you will receive a complimentary Weekly Fresh Box + exclusive direct farmer WhatsApp updates.</p>
            </div>
            <button
              onClick={handleDone}
              className="w-full bg-[#003629] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#1b4d3e]"
            >
              Continue Browsing Produce
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="bg-[#1b4d3e]/10 p-3.5 rounded-xl border border-[#1b4d3e]/20 text-[#003629] flex items-start gap-2.5">
              <Building className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm">Why Group Delivery?</strong>
                By consolidating 15+ flat pre-orders into a single gate arrival, delivery is 100% free, carbon footprint drops by 78%, and produce arrives unbruised within hours of dawn plucking.
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Society / Condominium Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DLF Magnolias, Gaur City, Supertech Eco Village"
                  value={societyName}
                  onChange={(e) => setSocietyName(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 outline-none focus:border-[#003629]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">Sector & Area</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sector 50, Gurgaon"
                    value={sectorCity}
                    onChange={(e) => setSectorCity(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 outline-none focus:border-[#003629]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">Estimated Society Flats</label>
                  <select
                    value={estFlats}
                    onChange={(e) => setEstFlats(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 outline-none focus:border-[#003629]"
                  >
                    <option value="50-100">50 - 100 Flats</option>
                    <option value="150">100 - 300 Flats</option>
                    <option value="500">300 - 800 Flats</option>
                    <option value="1000+">800+ Flats</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Resident / RWA Coordinator"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 outline-none focus:border-[#003629]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1c1b] mb-1">WhatsApp Mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg p-2.5 outline-none focus:border-[#003629]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#003629] text-white py-3 rounded-lg font-bold hover:bg-[#1b4d3e] flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
              >
                <span>Submit Colony Hub Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

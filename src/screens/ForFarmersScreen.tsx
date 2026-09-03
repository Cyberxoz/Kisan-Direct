import React, { useState } from 'react';
import { Calculator, Sprout, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Truck, Phone, Award } from 'lucide-react';

export const ForFarmersScreen: React.FC = () => {
  const [crop, setCrop] = useState('tomato');
  const [acres, setAcres] = useState<number>(2);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState('');
  const [village, setVillage] = useState('');
  const [mobile, setMobile] = useState('');

  // Crop yields per acre (approx in quintals/kg)
  const cropData: Record<string, { name: string; yieldPerAcreKg: number; mandiAvgRate: number; kisanDirectRate: number }> = {
    tomato: { name: 'Field Tomato', yieldPerAcreKg: 8000, mandiAvgRate: 12, kisanDirectRate: 22 },
    potato: { name: 'Kufri Jyoti Potato', yieldPerAcreKg: 10000, mandiAvgRate: 11, kisanDirectRate: 18 },
    spinach: { name: 'Desi Palak / Spinach', yieldPerAcreKg: 4000, mandiAvgRate: 10, kisanDirectRate: 20 },
    cauliflower: { name: 'Cauliflower (Phoolgobhi)', yieldPerAcreKg: 6000, mandiAvgRate: 14, kisanDirectRate: 28 },
    onion: { name: 'Nashik Red Onion', yieldPerAcreKg: 9000, mandiAvgRate: 15, kisanDirectRate: 25 },
  };

  const currentCrop = cropData[crop];
  const totalProductionKg = currentCrop.yieldPerAcreKg * acres;
  const mandiRevenue = totalProductionKg * currentCrop.mandiAvgRate;
  const mandiCartageLoss = mandiRevenue * 0.12; // 12% lost in transport & commission
  const netMandiIncome = Math.round(mandiRevenue - mandiCartageLoss);

  const kisanDirectGross = totalProductionKg * currentCrop.kisanDirectRate;
  const netKisanDirectIncome = Math.round(kisanDirectGross);
  const extraIncome = netKisanDirectIncome - netMandiIncome;
  const increasePercent = Math.round((extraIncome / netMandiIncome) * 100);

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div id="for-farmers-screen" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-[#1a1c1b]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3.5 py-1 rounded-full">
          FPO & Farmer Partnership Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1b] mt-3">
          Sell Your Harvest Before You Pluck It
        </h1>
        <p className="text-sm sm:text-base text-[#404945] mt-2">
          Say goodbye to mandi distress sales, commission agents, and unsold produce rotting in open yards. KisanDirect guarantees firm advance pre-orders with farm-gate collection.
        </p>
      </div>

      {/* Interactive Yield & Income Calculator */}
      <div className="bg-[#003629] text-white rounded-3xl p-6 sm:p-10 mb-14 shadow-xl border border-[#2d6a57]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#a3f69c] text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Pre-Harvest Revenue Comparison Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Calculate Your Direct Farm Gate Upside
            </h2>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-xl text-xs text-[#baeed9] border border-white/10">
            Based on APMC Mandi Averages vs KisanDirect Guaranteed Floor
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div>
              <label className="block text-xs font-bold text-[#baeed9] uppercase mb-2">
                1. Select Your Crop:
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-[#faf9f7] text-[#1a1c1b] p-3 rounded-xl text-sm font-semibold outline-none cursor-pointer"
              >
                <option value="tomato">Field Tomato (टमाटर)</option>
                <option value="potato">Potato (आलू)</option>
                <option value="spinach">Palak / Spinach (पालक)</option>
                <option value="cauliflower">Cauliflower (फूलगोभी)</option>
                <option value="onion">Red Onion (प्याज)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#baeed9] uppercase mb-2">
                <span>2. Total Farm Land:</span>
                <span className="text-white text-sm">{acres} Acre{acres > 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#a3f69c]"
              />
              <div className="flex justify-between text-[11px] text-gray-300 mt-1">
                <span>0.5 Acre (Smallholder)</span>
                <span>5 Acres</span>
                <span>10 Acres</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#baeed9] space-y-1">
              <div>Estimated Total Yield: <strong className="text-white">{(totalProductionKg / 100).toLocaleString()} Quintals</strong> ({totalProductionKg.toLocaleString()} kg)</div>
              <div>KisanDirect Pick-up: <strong className="text-white">Zero Cartage Fee (Farm Gate)</strong></div>
            </div>
          </div>

          {/* Results Comparison */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mandi Distress */}
            <div className="bg-white/10 p-6 rounded-2xl border border-red-400/30 space-y-3">
              <span className="text-[11px] font-bold text-red-300 uppercase tracking-wide">Mandi Distress Sale</span>
              <div className="text-2xl font-mono font-extrabold text-red-200">
                ₹{netMandiIncome.toLocaleString()}
              </div>
              <div className="text-xs text-gray-300 space-y-1">
                <div>Mandi rate: ₹{currentCrop.mandiAvgRate}/kg</div>
                <div className="text-red-300">-12% Mandi Arhatiya cut & cartage</div>
                <div>Risk: Distress dump if market crashes</div>
              </div>
            </div>

            {/* KisanDirect Guaranteed */}
            <div className="bg-white text-[#1a1c1b] p-6 rounded-2xl shadow-xl space-y-3 border-2 border-[#a3f69c]">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-[#003629] uppercase tracking-wide">KisanDirect Pre-Contract</span>
                <span className="bg-[#baeed9] text-[#002117] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  +{increasePercent}% Gain
                </span>
              </div>
              <div className="text-2xl font-mono font-extrabold text-[#003629]">
                ₹{netKisanDirectIncome.toLocaleString()}
              </div>
              <div className="text-xs text-[#404945] space-y-1">
                <div>Guaranteed floor: ₹{currentCrop.kisanDirectRate}/kg</div>
                <div className="text-[#1b6d24] font-semibold">Zero commission • Farm Gate collection</div>
                <div>Extra profit: <strong>₹{extraIncome.toLocaleString()}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars for Farmers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#baeed9] text-[#003629] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#1a1c1b]">Guaranteed Floor Price</h3>
          <p className="text-xs text-[#404945] leading-relaxed">
            Prices are mutually locked before plucking begins. Even if wholesale mandi rates crash overnight, your agreed rate remains protected.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#baeed9] text-[#003629] flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#1a1c1b]">Collection At Your Farm Gate</h3>
          <p className="text-xs text-[#404945] leading-relaxed">
            No loading into expensive diesel tempos to spend hours waiting in mandi lines. Our collection vehicles weigh and inspect right at your field edge.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#baeed9] text-[#003629] flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#1a1c1b]">Direct 24-Hour Bank Transfer</h3>
          <p className="text-xs text-[#404945] leading-relaxed">
            Instant digital UPI or Direct Bank Transfer settlement within 24 hours of crate loading. No delayed promissory slips or unpaid credits.
          </p>
        </div>
      </div>

      {/* Farmer Onboarding Form */}
      <div className="bg-[#f4f3f1] p-8 sm:p-12 rounded-3xl border border-[#e3e2e0] max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-[#1a1c1b]">Join As a Farmer or FPO Partner</h3>
          <p className="text-xs text-[#404945] mt-1">Our field agronomists visit your village within 48 hours to conduct soil inspection and onboard your harvest.</p>
        </div>

        {formSubmitted ? (
          <div className="bg-white p-8 rounded-2xl text-center space-y-3 border border-[#003629]">
            <div className="w-14 h-14 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#003629]">Application Submitted Successfully!</h4>
            <p className="text-xs text-[#404945]">
              Dhanyawaad, <strong>{farmerName}</strong> ji! Our Haryana/UP regional agricultural coordinator will call <strong>+91 {mobile}</strong> to schedule a farm visit.
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="text-xs font-bold text-[#003629] underline"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleFarmerSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Farmer / FPO Head Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">WhatsApp Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Village & District</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taraori, Karnal, Haryana"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Primary Crops Grown</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomato, Spinach, Cabbage, Peas"
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#003629] hover:bg-[#1b4d3e] text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-md transition-colors"
            >
              Request Farm Gate Pre-Contract Verification
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

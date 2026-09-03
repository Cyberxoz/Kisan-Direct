import React, { useState } from 'react';
import { Building2, Utensils, CheckCircle2, ArrowRight, ShieldCheck, Truck, Users } from 'lucide-react';

export const BulkBuyersScreen: React.FC = () => {
  const [buyerType, setBuyerType] = useState<'society' | 'kitchen' | 'institution'>('society');
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [estKg, setEstKg] = useState('150');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="bulk-buyers-screen" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-[#1a1c1b]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3.5 py-1 rounded-full">
          Institutional & Society Wholesale Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1b] mt-3">
          Direct Farm Gate Wholesale for Bulk Buyers
        </h1>
        <p className="text-sm sm:text-base text-[#404945] mt-2">
          Supplying residential RWA buying clubs, cloud kitchens, boutique restaurants, and corporate cafeterias with farm-gate aggregated harvests at wholesale rates.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white p-6 rounded-3xl border border-[#e3e2e0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#003629] uppercase bg-[#baeed9] px-2.5 py-1 rounded-full">
              Colony RWA Clubs
            </span>
            <h3 className="text-xl font-bold mt-3 text-[#1a1c1b]">Society Buying Groups</h3>
            <div className="text-2xl font-extrabold text-[#003629] my-2">10% - 15% OFF</div>
            <p className="text-xs text-[#404945] leading-relaxed">
              Consolidated gate delivery for 20+ flats. All residents order individually; crates arrive together at Gate 1 with zero delivery fees.
            </p>
          </div>
          <ul className="text-xs text-[#1a1c1b] space-y-1.5 pt-4 border-t mt-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Free Society Gate drop at 7:00 AM</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Dedicated WhatsApp RWA coordinator</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-[#003629] shadow-md flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 bg-[#003629] text-white text-[10px] font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
          <div>
            <span className="text-[10px] font-bold text-[#1b6d24] uppercase bg-[#baeed9]/50 px-2.5 py-1 rounded-full">
              Culinary & Kitchens
            </span>
            <h3 className="text-xl font-bold mt-3 text-[#1a1c1b]">Restaurants & Cafes</h3>
            <div className="text-2xl font-extrabold text-[#003629] my-2">18% - 25% OFF</div>
            <p className="text-xs text-[#404945] leading-relaxed">
              Consistent grade-A vegetables delivered before morning mise-en-place. No more pre-dawn trips to Azadpur or Okhla mandi.
            </p>
          </div>
          <ul className="text-xs text-[#1a1c1b] space-y-1.5 pt-4 border-t mt-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Tailored culinary sizing & grading</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Weekly GST invoicing with credit terms</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#e3e2e0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#404945] uppercase bg-[#efeeec] px-2.5 py-1 rounded-full">
              Enterprise
            </span>
            <h3 className="text-xl font-bold mt-3 text-[#1a1c1b]">Corporate Canteens</h3>
            <div className="text-2xl font-extrabold text-[#003629] my-2">Custom Farm Contract</div>
            <p className="text-xs text-[#404945] leading-relaxed">
              Direct forward contracts with dedicated farmer producer clusters (FPOs) for multi-ton daily onion, potato, and greens supply.
            </p>
          </div>
          <ul className="text-xs text-[#1a1c1b] space-y-1.5 pt-4 border-t mt-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Food safety & residue lab certificates</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
              <span>Dedicated temperature-managed EV logistics</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-[#f4f3f1] p-8 sm:p-12 rounded-3xl border border-[#e3e2e0] max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[#1a1c1b] mb-1 text-center">Request Wholesale Farm Quote</h3>
        <p className="text-xs text-[#404945] text-center mb-6">Our B2B farm logistics team responds with contract pricing within 2 business hours.</p>

        {submitted ? (
          <div className="bg-white p-8 rounded-2xl text-center space-y-3 border border-[#003629]">
            <div className="w-14 h-14 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#003629]">Wholesale Inquiry Received!</h4>
            <p className="text-xs text-[#404945]">
              Thank you, <strong>{contactName}</strong>! We have mapped <strong>{orgName}</strong> to our nearest farm dispatch node. Our manager will connect shortly at <strong>{phone}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-[#003629] underline"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#1a1c1b] mb-1">Organization / Society Name</label>
              <input
                type="text"
                required
                placeholder="e.g. ATS Greens RWA Club or Olive Bistro"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name & Title"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Mobile / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Delivery Location</label>
                <input
                  type="text"
                  required
                  placeholder="Sector & City (Noida / Gurgaon / Delhi)"
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1a1c1b] mb-1">Estimated Weekly Volume</label>
                <select
                  value={estKg}
                  onChange={(e) => setEstKg(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-xl p-3 outline-none focus:border-[#003629]"
                >
                  <option value="50-100">50 - 100 kg / week</option>
                  <option value="150">100 - 300 kg / week</option>
                  <option value="500">300 - 1,000 kg / week</option>
                  <option value="1000+">1,000+ kg / week (Multi-Ton)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#003629] hover:bg-[#1b4d3e] text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-md transition-colors"
            >
              Get Custom Farm Gate Wholesale Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

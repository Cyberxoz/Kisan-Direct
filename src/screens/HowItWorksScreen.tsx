import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Clock, Truck, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

export const HowItWorksScreen: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [sliderPrice, setSliderPrice] = useState<number>(40);

  // Price breakdown calculations:
  const farmerShare = Math.round(sliderPrice * 0.82);
  const logisticsShare = Math.round(sliderPrice * 0.12);
  const techPlatformShare = sliderPrice - farmerShare - logisticsShare;
  const retailSupermarketPrice = Math.round(sliderPrice * 1.6);
  const middlemenCut = retailSupermarketPrice - sliderPrice;

  const faqs = [
    {
      q: 'How does KisanDirect operate with zero warehouses?',
      a: 'Traditional grocers purchase massive bulk inventory speculatively, storing produce in refrigerated godowns for 4 to 7 days where moisture, nutrients, and crispness degrade. KisanDirect flips the model: orders are locked in advance by midnight. At 4:30 AM, farmers harvest strictly the exact kg count ordered. Within 3 hours, produce moves directly from village crate to our electric delivery fleet straight to your society gate.',
    },
    {
      q: 'Why must orders be placed before midnight?',
      a: 'Because your food is still rooted in the ground! Local farmers in Karnal, Sonipat and Meerut wake before sunrise to inspect the soil and pluck vegetables during the cool dawn hours when water retention is highest. Order cutoff at midnight ensures farmers know exact quantities before sunrise.',
    },
    {
      q: 'How does colony group delivery work?',
      a: 'Instead of individual delivery bikes traversing the city dozens of times, we group all households in a specific apartment complex or residential enclave into a single morning delivery window (7:00 AM - 9:00 AM). The electric van parks at the designated gate drop hub, saving fuel and eliminating delivery charges for you.',
    },
    {
      q: 'What if some produce does not meet quality standards?',
      a: 'We operate a 100% No-Questions-Asked Freshness Guarantee. If any item is bruised or does not meet peak freshness, let the gate coordinator know or tap refund in the app for an instant 100% refund.',
    },
  ];

  return (
    <div id="how-it-works-page" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-[#1a1c1b]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3.5 py-1 rounded-full">
          Transparent Farm-to-Gate Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1b] mt-3">
          How KisanDirect Eliminates the Middlemen
        </h1>
        <p className="text-sm sm:text-base text-[#404945] mt-2">
          A demand-driven agricultural logistics platform delivering produce from soil to plate in under 18 hours.
        </p>
      </div>

      {/* Interactive Price Transparency Simulator */}
      <div className="bg-[#003629] text-white rounded-3xl p-6 sm:p-10 mb-14 shadow-xl">
        <div className="max-w-2xl mb-6">
          <span className="text-xs text-[#a3f69c] font-bold uppercase tracking-wider">Interactive Simulator</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Where Does Your Money Actually Go?
          </h2>
          <p className="text-xs sm:text-sm text-[#baeed9] mt-1">
            Slide the retail price to see how KisanDirect delivers 82% direct value to farmers compared to traditional retail.
          </p>
        </div>

        {/* Slider */}
        <div className="bg-[#00281e] p-6 rounded-2xl border border-white/20 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-white">Select KisanDirect Pre-Order Price:</span>
            <span className="text-2xl font-mono font-extrabold text-[#a3f69c]">₹{sliderPrice} / kg</span>
          </div>
          <input
            type="range"
            min="25"
            max="180"
            step="5"
            value={sliderPrice}
            onChange={(e) => setSliderPrice(Number(e.target.value))}
            className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#a3f69c]"
          />
          <div className="flex justify-between text-[11px] text-[#baeed9] mt-2">
            <span>Wheat & Bajra (₹25-45/kg)</span>
            <span>Rice & Vegetables (₹50-90/kg)</span>
            <span>Unpolished Dals & Cotton (₹120-180/kg)</span>
          </div>
        </div>

        {/* Breakdown Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* KisanDirect Breakdown */}
          <div className="bg-white text-[#1a1c1b] p-6 rounded-2xl shadow-md border border-white/40 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-bold text-sm text-[#003629]">KisanDirect Zero-Warehouse Model</span>
              <span className="font-bold text-base text-[#003629]">₹{sliderPrice}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#404945] font-medium flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1b6d24]" />
                  Farmer Direct Remittance (82%)
                </span>
                <span className="font-bold text-[#1b6d24] text-sm">₹{farmerShare}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#404945] font-medium flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#003629]" />
                  Colony EV Electric Delivery (12%)
                </span>
                <span className="font-bold text-[#003629]">₹{logisticsShare}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#404945] font-medium flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  Tech, Testing & Crates (6%)
                </span>
                <span className="font-bold text-slate-700">₹{techPlatformShare}</span>
              </div>
              <div className="flex justify-between items-center text-[#1b6d24] font-bold pt-2 border-t">
                <span>Middlemen Speculation Cut:</span>
                <span>₹0 (Eliminated)</span>
              </div>
            </div>
          </div>

          {/* Supermarket Breakdown */}
          <div className="bg-[#f4f3f1] text-[#1a1c1b] p-6 rounded-2xl border border-white/20 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <span className="font-bold text-sm text-red-800">Traditional Supermarket / Mandi</span>
              <span className="font-bold text-base text-red-600 line-through">₹{retailSupermarketPrice}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Farmer Distress Price (25-30% only):</span>
                <span className="font-bold text-red-700">₹{Math.round(sliderPrice * 0.35)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mandi Commission Agent (Arthiya):</span>
                <span className="font-semibold text-gray-700">₹{Math.round(sliderPrice * 0.2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cold Warehouse & Wastage Spoiled (30%):</span>
                <span className="font-semibold text-gray-700">₹{Math.round(sliderPrice * 0.35)}</span>
              </div>
              <div className="flex justify-between items-center text-red-600 font-bold pt-2 border-t border-gray-300">
                <span>Total Inflated Middlemen Margins:</span>
                <span>+₹{middlemenCut} extra paid by you</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 24-Hour Timeline */}
      <div className="mb-14">
        <h3 className="text-2xl font-bold text-center text-[#1a1c1b] mb-8">
          The 24-Hour Farm-to-Gate Lifecycle
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#003629] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#003629]" />
              <span>11:59 PM (Night T-0)</span>
            </div>
            <h4 className="font-bold text-base text-[#1a1c1b]">Demand Aggregation</h4>
            <p className="text-xs text-[#404945]">
              System closes customer pre-orders, sorts by crop and transmits exact harvest quotas directly to farmer tablets.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#1b6d24] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#1b6d24]" />
              <span>04:30 AM (Dawn)</span>
            </div>
            <h4 className="font-bold text-base text-[#1a1c1b]">Fresh Plucking</h4>
            <p className="text-xs text-[#404945]">
              Farmers harvest produce while the morning dew is intact. Roots are trimmed and vegetables packed into aerated crates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#003629] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#003629]" />
              <span>06:00 AM (Transit)</span>
            </div>
            <h4 className="font-bold text-base text-[#1a1c1b]">Farm Gate EV Collection</h4>
            <p className="text-xs text-[#404945]">
              Electric delivery vans collect crates directly from farm gates in Sonipat, Karnal and Meerut, bypassing all mandis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e3e2e0] shadow-xs space-y-2">
            <div className="text-xs font-bold text-[#1b6d24] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1b6d24]" />
              <span>07:30 AM (Arrival)</span>
            </div>
            <h4 className="font-bold text-base text-[#1a1c1b]">Colony Gate Handover</h4>
            <p className="text-xs text-[#404945]">
              Crates arrive at your housing society gate. Collect your order or receive contactless flat drop before breakfast.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-[#f4f3f1] p-8 rounded-3xl border border-[#e3e2e0]">
        <h3 className="text-xl font-bold text-[#1a1c1b] mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#003629]" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#e3e2e0] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between font-bold text-sm text-[#1a1c1b] hover:text-[#003629]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#404945] leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

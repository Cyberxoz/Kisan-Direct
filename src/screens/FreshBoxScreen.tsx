import React, { useState } from 'react';
import { Check, Sparkles, Calendar, ShoppingCart, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { FRESH_BOXES } from '../data/mockData';
import { FreshBox, Product } from '../types';

interface FreshBoxScreenProps {
  onAddToCart: (product: Product) => void;
}

export const FreshBoxScreen: React.FC<FreshBoxScreenProps> = ({ onAddToCart }) => {
  const [selectedBoxId, setSelectedBoxId] = useState<string>(FRESH_BOXES[0].id);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'onetime'>('weekly');
  const [subscribedMessage, setSubscribedMessage] = useState<string | null>(null);

  const selectedBox = FRESH_BOXES.find((b) => b.id === selectedBoxId) || FRESH_BOXES[0];

  const handleSubscribe = (box: FreshBox) => {
    const retailVal = box.retailValue || Math.round(box.price * 1.5);
    // Also add to cart as an item for pre-order
    const boxProduct: Product = {
      id: `box-${box.id}`,
      name: `${box.title} (${frequency.toUpperCase()})`,
      category: 'box',
      price: box.price,
      retailPrice: retailVal,
      mandiPrice: Math.round(box.price * 0.7),
      unit: 'crate',
      image: box.image,
      farmerName: 'Curated FPO Harvest Group',
      farmLocation: 'Karnal & Sonipat Agri-Cluster',
      distanceKm: 42,
      harvestWindow: 'Tomorrow Dawn',
      organic: true,
      description: box.subtitle,
      minOrder: 1,
      nutrients: ['Complete Family Weekly Basket', 'Zero Plastic Pack'],
    };

    onAddToCart(boxProduct);
    setSubscribedMessage(box.title);
    setTimeout(() => {
      setSubscribedMessage(null);
    }, 3000);
  };

  return (
    <div id="fresh-box-screen" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-[#1a1c1b]">
      {/* Top Hero Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3.5 py-1 rounded-full">
          Weekly Farm Subscription
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1c1b] mt-3">
          The KisanDirect Fresh Box
        </h1>
        <p className="text-sm sm:text-base text-[#404945] mt-2">
          Curated crates of dawn-harvested seasonal greens, root staples, and heirloom fruits delivered automatically to your society gate every Tuesday & Friday.
        </p>

        {/* Frequency Tabs */}
        <div className="inline-flex bg-[#efeeec] p-1.5 rounded-2xl mt-6">
          <button
            onClick={() => setFrequency('weekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              frequency === 'weekly' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-black'
            }`}
          >
            Weekly (Most Popular)
          </button>
          <button
            onClick={() => setFrequency('biweekly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              frequency === 'biweekly' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-black'
            }`}
          >
            Bi-Weekly (Every 2 Weeks)
          </button>
          <button
            onClick={() => setFrequency('onetime')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              frequency === 'onetime' ? 'bg-[#003629] text-white shadow-xs' : 'text-[#404945] hover:text-black'
            }`}
          >
            Trial Single Crate
          </button>
        </div>
      </div>

      {subscribedMessage && (
        <div className="mb-6 bg-[#baeed9] text-[#002117] p-4 rounded-xl font-bold text-sm flex items-center justify-between border border-[#1b6d24]/30 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[#1b6d24]" />
            <span>{subscribedMessage} added to your Pre-Order Cart with {frequency} schedule!</span>
          </div>
          <span className="text-xs text-[#003629]">View Cart to Checkout</span>
        </div>
      )}

      {/* 3 Box Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {FRESH_BOXES.map((box) => {
          const isSelected = selectedBoxId === box.id;
          return (
            <div
              key={box.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between border transition-all duration-300 ${
                isSelected
                  ? 'border-2 border-[#003629] shadow-xl ring-2 ring-[#003629]/10'
                  : 'border-[#e3e2e0] hover:border-[#9ed1bd]'
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={box.image} alt={box.title} className="w-full h-full object-cover" />
                  {box.badge && (
                    <span className="absolute top-4 left-4 bg-[#003629] text-[#baeed9] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {box.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-white/95 text-[#1b6d24] font-bold text-xs px-2.5 py-1 rounded shadow-xs">
                    Save ₹{Math.round(box.price * 0.5)} vs Supermarket
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-extrabold text-[#1a1c1b]">{box.title}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-[#003629]">₹{box.price}</span>
                      <span className="text-xs text-gray-400 line-through block">₹{Math.round(box.price * 1.5)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#404945]">{box.subtitle}</p>

                  <div className="bg-[#f4f3f1] p-3.5 rounded-xl border border-[#e3e2e0] space-y-2">
                    <div className="text-[11px] font-bold text-[#707974] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#003629]" />
                      <span>Included In This Harvest Crate:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#1a1c1b]">
                      {box.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b6d24]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleSubscribe(box)}
                  className="w-full bg-[#003629] hover:bg-[#1b4d3e] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Subscribe for ₹{box.price}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Features Strip */}
      <div className="bg-[#f4f3f1] rounded-3xl p-8 border border-[#e3e2e0] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-[#003629] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#1a1c1b]">Skip or Pause Anytime</h4>
            <p className="text-xs text-[#404945] mt-0.5">Traveling for vacation? Pause with a single WhatsApp message or toggle in app.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <RefreshCw className="w-6 h-6 text-[#003629] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#1a1c1b]">Custom Item Swaps</h4>
            <p className="text-xs text-[#404945] mt-0.5">Don't like brinjal or ridge gourd? Swap with bell peppers or broccoli before midnight.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#003629] shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-sm text-[#1a1c1b]">Returnable Aerated Crates</h4>
            <p className="text-xs text-[#404945] mt-0.5">Delivered in sanitized food-grade crates. Zero single-use plastic bags used.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

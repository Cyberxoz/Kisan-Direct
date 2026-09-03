import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { MANDI_RATES } from '../data/mockData';

interface MandiTickerProps {
  onLearnMore?: () => void;
}

export const MandiTicker: React.FC<MandiTickerProps> = ({ onLearnMore }) => {
  return (
    <div
      id="mandi-ticker-bar"
      className="w-full bg-[#1b4d3e] text-white text-xs border-b border-[#2d6a57] py-2 px-4 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0 font-semibold tracking-wide text-[#baeed9]">
          <span className="w-2 h-2 rounded-full bg-[#a0f399] animate-pulse" />
          <span className="uppercase tracking-wider text-[11px]">Today's Direct Farm Benchmarks:</span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-6 py-0.5 whitespace-nowrap">
          {MANDI_RATES.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 bg-[#003629]/60 px-3 py-1 rounded-full border border-white/10 text-[11px]"
            >
              <span className="font-bold text-white">{item.crop}:</span>
              <span className="text-[#9ed1bd]">KisanDirect ₹{item.kisanDirectRate}/kg</span>
              <span className="text-gray-300 line-through text-[10px]">Retail ₹{item.retailRate}</span>
              <span className="text-[#a0f399] font-medium flex items-center">
                {item.trend === 'up' && <TrendingUp className="w-3 h-3 mr-0.5 text-[#a0f399]" />}
                {item.trend === 'down' && <TrendingDown className="w-3 h-3 mr-0.5 text-amber-300" />}
                {item.trend === 'stable' && <Minus className="w-3 h-3 mr-0.5 text-slate-300" />}
                {item.changePercent > 0 ? `+${item.changePercent}%` : item.changePercent < 0 ? `${item.changePercent}%` : 'Fair Base'}
              </span>
            </div>
          ))}
        </div>

        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="hidden md:flex items-center gap-1 text-[11px] text-[#baeed9] hover:text-white shrink-0 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Zero-Markup Breakdown</span>
          </button>
        )}
      </div>
    </div>
  );
};

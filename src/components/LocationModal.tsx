import React, { useState } from 'react';
import { X, MapPin, Check, Search, Users, PlusCircle } from 'lucide-react';
import { SOCIETIES } from '../data/mockData';
import { Society } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSociety: Society;
  onSelectSociety: (society: Society) => void;
  onOpenJoinModal: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedSociety,
  onSelectSociety,
  onOpenJoinModal,
}) => {
  const [filterCity, setFilterCity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const cities = ['All', 'Delhi', 'Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'];

  const filteredSocieties = SOCIETIES.filter((s) => {
    const matchCity = filterCity === 'All' || s.city.toLowerCase() === filterCity.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div
      id="location-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        id="location-modal-card"
        className="bg-[#faf9f7] w-full max-w-lg rounded-2xl shadow-2xl border border-[#e3e2e0] overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e3e2e0] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#003629]" />
              <span>Select Your Society Hub</span>
            </h3>
            <p className="text-xs text-[#707974] mt-0.5">
              We group orders by apartment societies for zero-emission electric van dispatch.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & City Tabs */}
        <div className="p-4 border-b border-[#e3e2e0] bg-[#f4f3f1] space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search apartment name, sector, or society..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#c0c9c3] rounded-xl px-4 py-2 pl-10 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#707974]" />
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setFilterCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterCity === city
                    ? 'bg-[#003629] text-white'
                    : 'bg-white text-[#404945] hover:bg-gray-200 border border-[#c0c9c3]/50'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Society List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredSocieties.map((soc) => {
            const isSelected = selectedSociety.id === soc.id;
            return (
              <div
                key={soc.id}
                onClick={() => {
                  onSelectSociety(soc);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#baeed9]/40 border-[#003629] shadow-xs'
                    : 'bg-white border-[#e3e2e0] hover:border-[#9ed1bd] hover:bg-[#faf9f7]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1a1c1b]">{soc.name}</span>
                    <span className="text-[10px] bg-[#efeeec] text-[#404945] px-2 py-0.5 rounded font-medium">
                      {soc.city}
                    </span>
                    {soc.isPopular && (
                      <span className="text-[10px] bg-[#a0f399]/60 text-[#217128] font-bold px-1.5 py-0.5 rounded">
                        High Density
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#707974]">{soc.area}</p>
                  <div className="flex items-center gap-3 text-[11px] text-[#003629] font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#1b6d24]" />
                      {soc.activeMembers} households ordering
                    </span>
                    <span>•</span>
                    <span>{soc.deliverySlot}</span>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-[#003629] text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <button className="text-xs font-semibold text-[#003629] px-3 py-1.5 rounded-lg bg-[#efeeec] hover:bg-[#baeed9] transition-colors shrink-0">
                    Select
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Cannot find society footer */}
        <div className="p-4 bg-white border-t border-[#e3e2e0] flex items-center justify-between text-xs">
          <span className="text-[#707974]">Can't find your society?</span>
          <button
            onClick={() => {
              onClose();
              onOpenJoinModal();
            }}
            className="text-[#003629] font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nominate / Start a New Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

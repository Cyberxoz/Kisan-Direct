import React, { useState } from 'react';
import {
  X,
  Sprout,
  Search,
  CheckCircle,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  Users,
  MapPin,
  TrendingDown,
  Wheat,
  PlusCircle,
  Tag,
  Check,
} from 'lucide-react';
import { POPULAR_CROP_SUGGESTIONS, SAMPLE_CROP_REQUESTS } from '../data/mockData';
import { CropRequest, Society } from '../types';

interface RequestCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSociety: Society;
  onRequestSubmitted?: (req: CropRequest) => void;
}

export const RequestCropModal: React.FC<RequestCropModalProps> = ({
  isOpen,
  onClose,
  selectedSociety,
  onRequestSubmitted,
}) => {
  const [activeTab, setActiveTab] = useState<'request-form' | 'community-requests'>('request-form');
  const [suggestionFilter, setSuggestionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State
  const [cropName, setCropName] = useState<string>('');
  const [hindiName, setHindiName] = useState<string>('');
  const [category, setCategory] = useState<string>('Grains & Millets');
  const [variety, setVariety] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('10');
  const [unit, setUnit] = useState<string>('kg');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [organicOnly, setOrganicOnly] = useState<boolean>(true);
  const [unpolished, setUnpolished] = useState<boolean>(true);
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [deliveryTiming, setDeliveryTiming] = useState<string>('Next available colony gate slot');

  // Requests state
  const [allRequests, setAllRequests] = useState<CropRequest[]>(SAMPLE_CROP_REQUESTS);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [lastSubmittedCrop, setLastSubmittedCrop] = useState<string>('');
  const [joinedPoolId, setJoinedPoolId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    'All',
    'Rice & Paddy',
    'Grains & Millets',
    'Pulses & Dals',
    'Oilseeds',
    'Spices & Condiments',
    'Cotton & Fibers',
    'Cash Crops & Sweeteners',
    'Fresh Vegetables',
  ];

  const filteredSuggestions = POPULAR_CROP_SUGGESTIONS.filter((crop) => {
    const matchCat = suggestionFilter === 'All' || crop.category === suggestionFilter;
    const matchSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.hindiName.includes(searchQuery) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.majorRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSelectSuggestion = (crop: (typeof POPULAR_CROP_SUGGESTIONS)[0]) => {
    setCropName(crop.name);
    setHindiName(crop.hindiName);
    setCategory(crop.category);
    setUnit(crop.defaultUnit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName.trim()) return;

    const newRequest: CropRequest = {
      id: `req-${Date.now()}`,
      cropName: cropName.trim(),
      hindiName: hindiName.trim() || undefined,
      category,
      variety: variety.trim() || undefined,
      quantity: quantity || '5',
      unit,
      targetPricePerUnit: targetPrice ? Number(targetPrice) : undefined,
      userName: userName.trim() || 'Society Resident',
      userPhone: userPhone.trim() || '+91 98765 43210',
      societyName: `${selectedSociety.name}, ${selectedSociety.city}`,
      specialRequirements: specialRequirements.trim() || undefined,
      organicOnly,
      status: 'Finding Local Farmers',
      createdAt: 'Just now',
    };

    setAllRequests([newRequest, ...allRequests]);
    if (onRequestSubmitted) {
      onRequestSubmitted(newRequest);
    }
    setLastSubmittedCrop(cropName);
    setSubmittedSuccess(true);
  };

  const handleJoinPool = (reqId: string) => {
    setJoinedPoolId(reqId);
    setTimeout(() => {
      setJoinedPoolId(null);
    }, 2000);
  };

  const handleResetForm = () => {
    setSubmittedSuccess(false);
    setCropName('');
    setHindiName('');
    setVariety('');
    setQuantity('10');
    setTargetPrice('');
    setSpecialRequirements('');
  };

  return (
    <div
      id="request-crop-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
    >
      <div
        id="request-crop-modal-card"
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-[#e3e2e0] overflow-hidden my-auto"
      >
        {/* Modal Header */}
        <div className="bg-[#003629] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#a3f69c] text-[#003629] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Direct Farm On-Demand
              </span>
              <span className="text-xs text-[#baeed9] hidden sm:inline">• 4,800+ Verified Farmers</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Request Any Crop, Seed, or Harvest
            </h2>
            <p className="text-xs sm:text-sm text-[#baeed9] mt-0.5 max-w-2xl">
              Can't find the exact heirloom grain, regional rice, pulse, unbleached raw cotton, or oilseed? Our farm co-ops will source and harvest it for your colony.
            </p>
          </div>

          <button
            id="close-request-crop-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e3e2e0] bg-[#f8f7f5] px-6 shrink-0">
          <button
            onClick={() => {
              setActiveTab('request-form');
              setSubmittedSuccess(false);
            }}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'request-form'
                ? 'border-[#003629] text-[#003629]'
                : 'border-transparent text-[#707974] hover:text-[#1a1c1b]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Custom Crop Pre-Order</span>
          </button>
          <button
            onClick={() => setActiveTab('community-requests')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'community-requests'
                ? 'border-[#003629] text-[#003629]'
                : 'border-transparent text-[#707974] hover:text-[#1a1c1b]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Resident Crop Requests & Pools ({allRequests.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-6">
          {activeTab === 'request-form' ? (
            submittedSuccess ? (
              /* Success Confirmation Screen */
              <div className="text-center py-10 px-4 space-y-6 max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#003629]">
                    Crop Request Placed with Farmer Network!
                  </h3>
                  <p className="text-sm text-[#404945] leading-relaxed">
                    We have broadcast your pre-order for <strong className="text-[#1a1c1b]">{lastSubmittedCrop}</strong> to regional farmer producer organizations in Haryana, Punjab, MP, and Rajasthan.
                  </p>
                </div>

                {/* Society Match Info */}
                <div className="bg-[#efeeec] p-5 rounded-2xl text-left border border-[#e3e2e0] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#003629]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#003629]" />
                      Delivery Hub: {selectedSociety.name}
                    </span>
                    <span className="bg-[#baeed9] text-[#003629] px-2 py-0.5 rounded text-[11px]">
                      Finding FPO Match
                    </span>
                  </div>
                  <p className="text-xs text-[#707974]">
                    Our local aggregator will contact participating farmers. You will receive an SMS confirmation with the matched farmer's lot, farm origin photos, and estimated harvest date within 4 hours.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-[#003629] text-white text-xs font-bold hover:bg-[#1b4d3e] transition-colors cursor-pointer"
                  >
                    Request Another Crop
                  </button>
                  <button
                    onClick={() => setActiveTab('community-requests')}
                    className="px-6 py-3 rounded-xl bg-[#efeeec] text-[#1a1c1b] text-xs font-bold hover:bg-[#e3e2e0] transition-colors cursor-pointer"
                  >
                    View Community Requests
                  </button>
                </div>
              </div>
            ) : (
              /* Request Form View */
              <div className="space-y-8">
                {/* 1. Popular Crop Suggestions Picker */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#1a1c1b] flex items-center gap-2">
                        <Wheat className="w-4 h-4 text-[#003629]" />
                        <span>Step 1: Choose or Search Any Crop Variety (50+ Indian Crops)</span>
                      </h3>
                      <p className="text-xs text-[#707974]">
                        Click any crop to auto-fill details, or type your own custom harvest below.
                      </p>
                    </div>

                    {/* Quick Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Filter crops (e.g. Basmati, Cotton, Rajma)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-xs bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3 py-2 pl-8 outline-none focus:ring-2 focus:ring-[#003629] w-full sm:w-56"
                      />
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#707974]" />
                    </div>
                  </div>

                  {/* Category Filter Chips */}
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSuggestionFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          suggestionFilter === cat
                            ? 'bg-[#003629] text-white shadow-xs'
                            : 'bg-[#efeeec] text-[#404945] hover:bg-[#e3e2e0]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Crop Suggestion Pills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 border border-[#e3e2e0] rounded-2xl bg-[#faf9f7]">
                    {filteredSuggestions.map((sug) => {
                      const isSelected = cropName === sug.name;
                      return (
                        <button
                          key={sug.name}
                          type="button"
                          onClick={() => handleSelectSuggestion(sug)}
                          className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-xs ${
                            isSelected
                              ? 'bg-[#baeed9]/40 border-[#003629] ring-1 ring-[#003629]'
                              : 'bg-white border-[#e3e2e0] hover:border-[#c0c9c3] hover:shadow-2xs'
                          }`}
                        >
                          <div className="font-bold text-[#1a1c1b] line-clamp-1">{sug.name}</div>
                          <div className="text-[11px] text-[#003629] font-medium">{sug.hindiName}</div>
                          <div className="flex items-center justify-between text-[10px] text-[#707974] mt-1 pt-1 border-t border-gray-100">
                            <span>{sug.approxRate}</span>
                            <span className="truncate max-w-[80px]">{sug.majorRegion.split(',')[0]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Custom Pre-Order Form */}
                <form onSubmit={handleSubmit} className="space-y-6 pt-2 border-t border-[#e3e2e0]">
                  <h3 className="text-sm font-bold text-[#1a1c1b] flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[#003629]" />
                    <span>Step 2: Provide Crop & Pre-Order Specifications</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Crop Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Crop or Seed Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        placeholder="e.g. Kalanamak Scented Rice, Raw Cotton Lint, Khapli Wheat"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>

                    {/* Hindi Name / Local Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Local / Hindi Name
                      </label>
                      <input
                        type="text"
                        value={hindiName}
                        onChange={(e) => setHindiName(e.target.value)}
                        placeholder="e.g. कालानमक चावल, कच्ची कपास"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      >
                        <option value="Rice & Paddy">Rice & Paddy</option>
                        <option value="Grains & Millets">Grains & Millets</option>
                        <option value="Pulses & Dals">Pulses & Dals</option>
                        <option value="Oilseeds">Oilseeds & Dry Seeds</option>
                        <option value="Cotton & Fibers">Cotton & Fibers</option>
                        <option value="Spices & Condiments">Spices & Condiments</option>
                        <option value="Cash Crops & Sweeteners">Cash Crops & Sweeteners</option>
                        <option value="Fresh Vegetables">Fresh Vegetables & Roots</option>
                        <option value="Herbs & Medicinal">Herbs & Medicinal Crops</option>
                      </select>
                    </div>

                    {/* Variety / Strain */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Specific Variety / Seed Grade
                      </label>
                      <input
                        type="text"
                        value={variety}
                        onChange={(e) => setVariety(e.target.value)}
                        placeholder="e.g. 1121 Aged, Heritage Bansi, Non-GMO"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>

                    {/* Quantity and Unit */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Desired Quantity
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-24 bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                        />
                        <select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="flex-1 bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                        >
                          <option value="kg">kg</option>
                          <option value="quintal (100kg)">Quintal (100 kg)</option>
                          <option value="25kg bag">25 kg Sack</option>
                          <option value="50kg sack">50 kg Sack</option>
                          <option value="bunch">Bunch</option>
                          <option value="litres">Litres</option>
                        </select>
                      </div>
                    </div>

                    {/* Target Budget per Unit */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Target Price (₹ per {unit}) <span className="text-[#707974] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        placeholder="e.g. 120"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>

                    {/* User Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="e.g. Rajesh Khurana"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>

                    {/* User Phone */}
                    <div>
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Contact Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="e.g. +91 98112 00000"
                        className="w-full bg-[#f4f3f1] border border-[#e3e2e0] rounded-xl px-3.5 py-2.5 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>
                  </div>

                  {/* Quality Specifications */}
                  <div className="bg-[#faf9f7] p-4 rounded-2xl border border-[#e3e2e0] space-y-3">
                    <span className="text-xs font-bold text-[#1a1c1b] block">
                      Harvest & Farming Standards
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <label className="flex items-center gap-2.5 cursor-pointer bg-white p-2.5 rounded-xl border border-[#e3e2e0]">
                        <input
                          type="checkbox"
                          checked={organicOnly}
                          onChange={(e) => setOrganicOnly(e.target.checked)}
                          className="w-4 h-4 text-[#003629] rounded accent-[#003629]"
                        />
                        <span className="text-[#1a1c1b] font-medium">
                          100% Chemical-Free / Organic / Natural Farming
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer bg-white p-2.5 rounded-xl border border-[#e3e2e0]">
                        <input
                          type="checkbox"
                          checked={unpolished}
                          onChange={(e) => setUnpolished(e.target.checked)}
                          className="w-4 h-4 text-[#003629] rounded accent-[#003629]"
                        />
                        <span className="text-[#1a1c1b] font-medium">
                          Unpolished / Zero Color Coating / Stone Chakki
                        </span>
                      </label>
                    </div>

                    {/* Special requirements */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-[#404945] mb-1">
                        Specific Farm Region or Harvest Notes
                      </label>
                      <textarea
                        rows={2}
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        placeholder="e.g. Need single-origin lot from Terai belt, unhulled seeds for sprouting, or long staple cotton fibers for natural spinning."
                        className="w-full bg-white border border-[#e3e2e0] rounded-xl p-3 text-xs text-[#1a1c1b] outline-none focus:ring-2 focus:ring-[#003629]"
                      />
                    </div>
                  </div>

                  {/* Society Destination Pill */}
                  <div className="flex items-center justify-between bg-[#baeed9]/30 p-3.5 rounded-xl border border-[#baeed9] text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#003629]" />
                      <span>
                        Harvest will be pooled with: <strong>{selectedSociety.name} ({selectedSociety.city})</strong>
                      </span>
                    </div>
                    <span className="text-[11px] text-[#003629] font-bold">
                      {selectedSociety.deliverySlot.split('(')[0]}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl border border-[#e3e2e0] text-xs font-bold text-[#404945] hover:bg-[#efeeec] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#003629] text-white text-xs font-bold hover:bg-[#1b4d3e] transition-colors cursor-pointer flex items-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Broadcast Request to Farmer Network</span>
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            /* Community Requests Feed */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-[#1a1c1b]">
                    Active Resident Pre-Orders Across Societies
                  </h3>
                  <p className="text-xs text-[#707974]">
                    Join other society residents requesting rare crops to unlock bulk farmer dispatch!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('request-form');
                    setSubmittedSuccess(false);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003629] bg-[#baeed9] hover:bg-[#97e0c4] px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Request a New Crop</span>
                </button>
              </div>

              <div className="space-y-4">
                {allRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-[#faf9f7] rounded-2xl p-5 border border-[#e3e2e0] flex flex-col md:flex-row justify-between gap-4 hover:border-[#c0c9c3] transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#003629] text-white">
                          {req.category}
                        </span>
                        <span className="text-xs font-semibold text-[#1b6d24] bg-[#baeed9]/50 px-2 py-0.5 rounded-full">
                          {req.status}
                        </span>
                        <span className="text-[11px] text-[#707974]">
                          Requested {req.createdAt} by {req.userName}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <h4 className="text-base font-extrabold text-[#1a1c1b]">
                          {req.cropName}
                        </h4>
                        {req.hindiName && (
                          <span className="text-xs text-[#003629] font-medium">({req.hindiName})</span>
                        )}
                      </div>

                      {req.variety && (
                        <p className="text-xs text-[#404945]">
                          <strong>Variety:</strong> {req.variety}
                        </p>
                      )}

                      {req.specialRequirements && (
                        <p className="text-xs text-[#707974] italic">
                          "{req.specialRequirements}"
                        </p>
                      )}

                      {req.matchedFarmer && (
                        <div className="bg-white p-2.5 rounded-xl border border-[#baeed9] text-xs flex items-center justify-between text-[#003629] font-medium">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#1b6d24]" />
                            FPO Matched: {req.matchedFarmer.name} ({req.matchedFarmer.location})
                          </span>
                          <span className="font-bold">
                            Quoted: ₹{req.matchedFarmer.quotedPrice}/{req.unit}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right side stats & action */}
                    <div className="flex md:flex-col justify-between items-end md:items-end gap-3 shrink-0 border-t md:border-t-0 md:border-l border-[#e3e2e0] pt-3 md:pt-0 md:pl-5">
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-[#1a1c1b]">
                          {req.quantity} {req.unit}
                        </div>
                        <div className="text-[11px] text-[#707974]">{req.societyName}</div>
                      </div>

                      <button
                        onClick={() => handleJoinPool(req.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          joinedPoolId === req.id
                            ? 'bg-[#1b6d24] text-white'
                            : 'bg-[#003629] text-white hover:bg-[#1b4d3e]'
                        }`}
                      >
                        {joinedPoolId === req.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Your Pre-Orders</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-3.5 h-3.5" />
                            <span>Join This Crop Pool</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Guarantee Strip */}
        <div className="bg-[#efeeec] px-6 py-3.5 border-t border-[#e3e2e0] flex flex-wrap items-center justify-between text-xs text-[#404945] shrink-0 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#003629]" /> Direct Farm Guarantee
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline">100% Traceable To Verified Indian FPOs</span>
          </div>
          <span className="text-[11px] text-[#707974]">
            Zero middleman markup • Fair MSP+ prices to growers
          </span>
        </div>
      </div>
    </div>
  );
};

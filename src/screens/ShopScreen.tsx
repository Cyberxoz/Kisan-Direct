import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingCart, Check, MapPin, Clock, ArrowUpDown, Sparkles, ShieldCheck, PlusCircle, Wheat } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface ShopScreenProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  initialSearchQuery?: string;
  onOpenRequestCrop?: () => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onAddToCart,
  onSelectProduct,
  initialSearchQuery = '',
  onOpenRequestCrop,
}) => {
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'distance'>('recommended');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Farm Harvests' },
    { id: 'rice', label: 'Rice & Paddy' },
    { id: 'pulses', label: 'Pulses & Dals' },
    { id: 'grains', label: 'Wheat & Grains' },
    { id: 'millets', label: 'Millets (Bajra, Ragi)' },
    { id: 'oilseeds', label: 'Oilseeds (Mustard, Til)' },
    { id: 'spices', label: 'Direct Spices' },
    { id: 'cotton', label: 'Raw Cotton & Fibers' },
    { id: 'cash-crops', label: 'Cash Crops & Sweeteners' },
    { id: 'vegetables', label: 'Field Vegetables' },
    { id: 'fruits', label: 'Orchard Fruits' },
    { id: 'herbs', label: 'Herbs & Greens' },
  ];

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesOrganic = !organicOnly || p.organic;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
        p.farmerName.toLowerCase().includes(q) ||
        p.farmLocation.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCat && matchesOrganic && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return 0; // recommended default
    });
  }, [selectedCategory, organicOnly, search, sortBy]);

  const handleAdd = (p: Product) => {
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div id="shop-screen-page" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-[#1a1c1b]">
      {/* Banner */}
      <div className="bg-[#003629] text-white rounded-3xl p-6 sm:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-xl">
          <span className="text-xs text-[#a3f69c] uppercase tracking-widest font-extrabold bg-white/10 px-3 py-1 rounded-full">
            Dawn Harvest Marketplace
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Direct Farm Pre-Orders. From Soil to Society.
          </h1>
          <p className="text-xs sm:text-sm text-[#baeed9] leading-relaxed">
            Direct farmer listings across vegetables, traditional basmati rice, unpolished pulses (dals), whole grains & millets, and raw cotton bolls. Zero warehouse middle steps.
          </p>
        </div>

        <div className="bg-[#00281e] p-4 sm:p-5 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
          <div className="text-xs text-[#baeed9] font-medium mb-1 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-[#a3f69c]" />
            <span>Midnight Harvest Cut-Off</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#a3f69c] tracking-wider">
            04h : 28m : 15s
          </div>
          <p className="text-[11px] text-gray-200 mt-1">Tomorrow 7:00 AM Colony Gate Drop</p>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e3e2e0] shadow-xs mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#efeeec] text-[#404945] hover:bg-[#e3e2e0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Organic Toggle, and Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              placeholder="Search crop or farm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-48 md:w-56 bg-[#efeeec] text-xs text-[#1a1c1b] rounded-xl px-3 py-2 pl-9 outline-none focus:ring-2 focus:ring-[#003629]"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#707974]" />
          </div>

          {/* Organic Only Filter */}
          <button
            onClick={() => setOrganicOnly(!organicOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              organicOnly
                ? 'bg-[#baeed9] text-[#002117] border-[#003629]'
                : 'bg-white text-[#404945] border-[#c0c9c3] hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1b6d24]" />
            <span>Bio / Organic</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#404945]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#707974]" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#efeeec] border-none rounded-xl px-2.5 py-2 text-xs text-[#1a1c1b] outline-none font-medium cursor-pointer"
            >
              <option value="recommended">Sort: Freshness</option>
              <option value="distance">Sort: Closest Farm</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Direct Crop Request Trigger */}
          {onOpenRequestCrop && (
            <button
              onClick={onOpenRequestCrop}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#003629] text-white hover:bg-[#1b4d3e] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Request any crop, grain, cotton, or spice directly from farmers"
            >
              <PlusCircle className="w-4 h-4 text-[#a3f69c]" />
              <span>Request Any Crop</span>
            </button>
          )}
        </div>
      </div>

      {/* On-Demand Crop Notice Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#baeed9]/40 via-[#f4f3f1] to-white p-4 sm:p-5 rounded-2xl border border-[#baeed9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003629] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Wheat className="w-5 h-5 text-[#a3f69c]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#003629] flex items-center gap-2">
              <span>Want a specific heirloom crop, rare grain, or direct raw cotton?</span>
              <span className="text-[10px] bg-[#003629] text-white px-2 py-0.5 rounded-full font-bold">
                Direct Farmer Pool
              </span>
            </h3>
            <p className="text-xs text-[#404945] mt-0.5">
              Customers can pre-order <strong>each and every type of Indian crop</strong> directly from our 4,800+ farmer network. We harvest, unpolish, and deliver to your colony gate.
            </p>
          </div>
        </div>

        {onOpenRequestCrop && (
          <button
            onClick={onOpenRequestCrop}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#003629] text-white text-xs font-extrabold hover:bg-[#1b4d3e] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#a3f69c]" />
            <span>Request Any Crop</span>
          </button>
        )}
      </div>

      {/* Produce Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-[#e3e2e0] space-y-4 max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#efeeec] text-[#003629] flex items-center justify-center mx-auto">
            <Wheat className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[#1a1c1b]">
              {search ? `No pre-listed crop named "${search}"` : 'No fresh harvest matching these filters'}
            </h3>
            <p className="text-xs sm:text-sm text-[#707974] max-w-md mx-auto">
              {search
                ? `Don't worry! You can request "${search}" directly from our 4,800+ verified Indian farmers and FPO clusters.`
                : 'Looking for a rare pulse, ancient millet, or special crop? Request it on-demand.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onOpenRequestCrop && (
              <button
                onClick={onOpenRequestCrop}
                className="bg-[#003629] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#1b4d3e] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#a3f69c]" />
                <span>Request {search ? `"${search}"` : 'Any Custom Crop'} Now</span>
              </button>
            )}
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setOrganicOnly(false);
              }}
              className="bg-[#efeeec] text-[#404945] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#e3e2e0] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const isAdded = addedId === prod.id;
            return (
              <div
                key={prod.id}
                id={`shop-product-${prod.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-lg transition-all duration-300 border border-[#e3e2e0]"
              >
                {/* Photo & Farm badges */}
                <div
                  onClick={() => onSelectProduct(prod)}
                  className="relative aspect-[4/3] overflow-hidden bg-[#efeeec] cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#003629] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {prod.organic ? 'Organic Certified' : 'Pesticide Safe'}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-[#003629] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#1b6d24]" />
                    {prod.distanceKm} km
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-5 flex flex-col gap-3">
                  <div
                    onClick={() => onSelectProduct(prod)}
                    className="flex justify-between items-start cursor-pointer"
                  >
                    <div>
                      <h3 className="text-base font-bold text-[#1a1c1b] group-hover:text-[#003629] transition-colors">
                        {prod.name}
                      </h3>
                      {prod.hindiName && (
                        <span className="text-xs text-[#707974] block font-normal">{prod.hindiName}</span>
                      )}
                      <p className="text-xs text-[#707974] mt-0.5">{prod.farmerName}</p>
                      <p className="text-[11px] text-[#003629] font-medium mt-0.5">{prod.farmLocation}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#003629]">
                        ₹{prod.price}
                        <span className="text-xs font-normal text-gray-500">/{prod.unit}</span>
                      </span>
                      <p className="text-[10px] text-gray-400 line-through">₹{prod.retailPrice}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#404945] line-clamp-2">{prod.description}</p>

                  {/* Pre-Order CTA */}
                  <button
                    onClick={() => handleAdd(prod)}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#1b6d24] text-white shadow-xs'
                        : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#003629] hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Pre-Order Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Pre-Order (₹{prod.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Guarantee Strip */}
      <div className="mt-12 bg-[#baeed9]/30 rounded-2xl p-6 border border-[#baeed9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#003629] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[#002117] text-sm">Peak Crispness & Fair Weight Guarantee</h4>
            <p className="text-[#404945]">
              If any bunch of greens or root vegetable doesn't look freshly plucked from the soil, we refund instantly at gate collection.
            </p>
          </div>
        </div>
        <div className="font-bold text-[#003629] shrink-0">100% No-Warehouse Promise</div>
      </div>
    </div>
  );
};

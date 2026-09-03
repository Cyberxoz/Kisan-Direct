import React, { useState } from 'react';
import {
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Timer,
  Truck,
  Handshake,
  Zap,
  Building,
  Users,
  AlertTriangle,
  X as CloseIcon,
  Check,
  ShoppingCart,
  TrendingDown,
  Warehouse,
  ShieldCheck,
  Sprout,
  Store,
  UserCheck,
  Flame,
} from 'lucide-react';
import { HERO_FARM_IMG, ZERO_INVENTORY_IMG, PRODUCTS, TESTIMONIALS } from '../data/mockData';
import { Product } from '../types';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenJoinGroup: () => void;
  onOpenHowItWorks: () => void;
  onOpenRequestCrop?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onAddToCart,
  onSelectProduct,
  onOpenJoinGroup,
  onOpenHowItWorks,
  onOpenRequestCrop,
}) => {
  const [productFilter, setProductFilter] = useState<'all' | 'vegetables' | 'rice-grains' | 'pulses' | 'millets-oilseeds' | 'cotton' | 'spices-cash' | 'fruits'>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (productFilter === 'all') return true;
    if (productFilter === 'rice-grains') return p.category === 'rice' || p.category === 'grains';
    if (productFilter === 'pulses') return p.category === 'pulses';
    if (productFilter === 'millets-oilseeds') return p.category === 'millets' || p.category === 'oilseeds';
    if (productFilter === 'spices-cash') return p.category === 'spices' || p.category === 'cash-crops';
    return p.category === productFilter;
  }).slice(0, 8);

  const handlePreOrderClick = (product: Product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <div id="home-screen-page" className="w-full flex flex-col text-[#1a1c1b] bg-[#faf9f7]">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative w-full pt-6 md:pt-10 pb-16 overflow-hidden bg-gradient-to-b from-[#003629]/5 via-transparent to-transparent"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="flex flex-col gap-6 lg:col-span-7 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#baeed9] text-[#1d4f40] text-xs font-bold w-fit shadow-xs border border-[#1d4f40]/10">
              <Sprout className="w-4 h-4 text-[#1b6d24]" />
              <span>Zero-Warehouse Direct Supply Chain</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1a1c1b] tracking-tight leading-[1.15]">
              Fresh From Farmers.{' '}
              <span className="text-[#003629] block sm:inline">Direct To You.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#404945] max-w-xl leading-relaxed">
              Pre-order directly from local farmers. They harvest only what you need, and local delivery partners bring it straight from the farm gate to your home.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-shop-cta-btn"
                onClick={() => onNavigate('shop')}
                className="bg-[#003629] text-white px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-[#1b4d3e] transition-all shadow-[0_4px_20px_rgba(27,77,62,0.2)] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={onOpenHowItWorks}
                className="bg-[#e9e8e6] text-[#1a1c1b] px-6 py-3.5 rounded-lg font-bold text-sm hover:bg-[#e3e2e0] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>How It Works</span>
                <PlayCircle className="w-4 h-4 text-[#003629]" />
              </button>
            </div>

            {/* Micro Benefits Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-[#404945] border-t border-[#c0c9c3]/40">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-[#003629]" />
                <span>100% Farm Traceable</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Timer className="w-4 h-4 text-[#003629]" />
                <span>Harvested Within 12 Hrs</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-[#003629]" />
                <span>No Cold Storages</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-[#e9e8e6] border border-white/60">
              <img
                src={HERO_FARM_IMG}
                alt="Lush organic farm in rural India with rows of fresh green vegetables"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#e3e2e0] flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1b6d24]" />
                <span className="text-xs font-bold text-[#1a1c1b]">Harvested for Your Order</span>
              </div>

              <div className="absolute top-16 sm:top-20 right-4 bg-white px-3.5 py-2 rounded-xl shadow-md border border-[#e3e2e0] flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-[#ba1a1a]" />
                <span className="text-xs font-bold text-[#1a1c1b]">No Central Warehouse</span>
              </div>

              {/* Bottom Visual Supply Flow Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white p-4 rounded-xl shadow-xl border border-[#e3e2e0] flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#404945]">Visual Supply Flow</span>
                  <span className="text-[10px] font-bold text-[#1b6d24] bg-[#baeed9]/50 px-2 py-0.5 rounded">Direct-to-Home</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-[#003629] pt-1">
                  <span className="flex flex-col items-center gap-0.5">
                    <Sprout className="w-4 h-4 text-[#003629]" />
                    <span className="text-[11px]">Farmer</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707974]" />
                  <span className="flex flex-col items-center gap-0.5">
                    <CheckCircle className="w-4 h-4 text-[#1b6d24]" />
                    <span className="text-[11px]">Produce</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707974]" />
                  <span className="flex flex-col items-center gap-0.5">
                    <Truck className="w-4 h-4 text-[#003629]" />
                    <span className="text-[11px]">Delivery</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707974]" />
                  <span className="flex flex-col items-center gap-0.5">
                    <Building className="w-4 h-4 text-[#003629]" />
                    <span className="text-[11px]">Home</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / BENEFITS BAR */}
      <section
        id="trust-benefits-bar"
        className="w-full bg-[#003629] text-white py-8 my-4 shadow-md"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Handshake className="w-8 h-8 text-[#a3f69c]" />
            <h3 className="text-sm sm:text-base font-bold tracking-wide">FARM DIRECT</h3>
            <p className="text-xs text-[#baeed9]">Zero middlemen margins</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Zap className="w-8 h-8 text-[#a3f69c]" />
            <h3 className="text-sm sm:text-base font-bold tracking-wide">HARVEST ON DEMAND</h3>
            <p className="text-xs text-[#baeed9]">Zero food wastage</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Truck className="w-8 h-8 text-[#a3f69c]" />
            <h3 className="text-sm sm:text-base font-bold tracking-wide">FARM-GATE PICKUP</h3>
            <p className="text-xs text-[#baeed9]">Direct from village collection</p>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Users className="w-8 h-8 text-[#a3f69c]" />
            <h3 className="text-sm sm:text-base font-bold tracking-wide">GROUP DELIVERY</h3>
            <p className="text-xs text-[#baeed9]">Optimized colony routes</p>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION (The Supply Chain Crisis) */}
      <section
        id="problem-comparison-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-[#571a00] uppercase tracking-widest font-extrabold bg-[#ffdbcf] px-3 py-1 rounded-full">
            The Supply Chain Crisis
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 text-[#1a1c1b]">
            Farmers Grow It. Too Many Middlemen Move It.
          </h2>
          <p className="text-sm sm:text-base text-[#404945] mt-2">
            Traditional supply chains take 4-7 days, losing 30% nutrition and rotting produce in warehouses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Supply Chain Card */}
          <div className="bg-[#f4f3f1] p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between border border-[#e3e2e0]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Traditional Supply Chain (4-7 Days Old)</span>
              </div>

              {/* 6 Middlemen Flow */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-6 text-center">
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Sprout className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Farmer</span>
                </div>
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Store className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Trader</span>
                </div>
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Warehouse className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Mandi</span>
                </div>
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Truck className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Distributor</span>
                </div>
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Store className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Retailer</span>
                </div>
                <div className="flex flex-col items-center p-2.5 bg-white rounded-xl shadow-2xs border border-red-100">
                  <Users className="w-5 h-5 text-[#ba1a1a]" />
                  <span className="text-[11px] font-medium mt-1">Consumer</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#404945]">
              <li className="flex items-start gap-2">
                <CloseIcon className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <span>Multiple markups inflate prices by up to 200%</span>
              </li>
              <li className="flex items-start gap-2">
                <CloseIcon className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <span>Stored in cold rooms and warehouses for days</span>
              </li>
              <li className="flex items-start gap-2">
                <CloseIcon className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <span>High spoilage and nutrient loss before reaching home</span>
              </li>
            </ul>
          </div>

          {/* KisanDirect Route Card */}
          <div className="bg-[#baeed9]/25 p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between border-2 border-[#003629]/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003629] text-white text-xs font-bold mb-4">
                <CheckCircle className="w-4 h-4 text-[#a3f69c]" />
                <span>KisanDirect Route (Under 24 Hours)</span>
              </div>

              {/* 3 Step Direct Flow */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6 text-center">
                <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-[#003629]/20">
                  <Sprout className="w-7 h-7 text-[#003629]" />
                  <span className="text-sm font-bold mt-2 text-[#003629]">Farmer</span>
                  <span className="text-[10px] text-gray-500">Soil Harvest</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-[#003629] text-white rounded-xl shadow-xs">
                  <Truck className="w-7 h-7 text-[#a3f69c]" />
                  <span className="text-sm font-bold mt-2 text-white">KisanDirect</span>
                  <span className="text-[10px] text-[#baeed9]">Zero Warehouse</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-xs border border-[#003629]/20">
                  <Building className="w-7 h-7 text-[#003629]" />
                  <span className="text-sm font-bold mt-2 text-[#003629]">Your Home</span>
                  <span className="text-[10px] text-gray-500">Society Gate</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#1a1c1b] font-medium">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1b6d24] shrink-0 mt-0.5" />
                <span>Fair prices for farmers, lower cost for you</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1b6d24] shrink-0 mt-0.5" />
                <span>Harvested strictly after your order is confirmed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1b6d24] shrink-0 mt-0.5" />
                <span>Delivered fresh from the farm gate in hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SEAMLESS WORKFLOW (A Shorter Route From Farm To Home) */}
      <section
        id="workflow-steps-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full bg-[#f4f3f1] rounded-3xl my-6"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3 py-1 rounded-full">
            Seamless Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 text-[#1a1c1b]">
            A Shorter Route From Farm To Home
          </h2>
          <p className="text-sm sm:text-base text-[#404945] mt-2">
            How our demand-driven model eliminates waste and ensures farm-fresh quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 01 */}
          <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e3e2e0] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#1a1c1b]">PRE-ORDER</h3>
            <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
              Browse fresh seasonal harvests and place your order in advance before midnight.
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e3e2e0] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#1a1c1b]">CONFIRMED DEMAND</h3>
            <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
              We aggregate orders and share exact requirements with farmers at dawn.
            </p>
          </div>

          {/* Step 03 */}
          <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e3e2e0] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#1a1c1b]">HARVEST</h3>
            <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
              Farmers harvest only what has been sold. Zero surplus, zero rotting in storage.
            </p>
          </div>

          {/* Step 04 */}
          <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-4 border border-[#e3e2e0] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#003629] text-white flex items-center justify-center font-bold text-lg">
              04
            </div>
            <h3 className="text-base font-bold tracking-tight text-[#1a1c1b]">DELIVER</h3>
            <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
              Picked up from village gates and delivered straight to your colony group.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ZERO-INVENTORY SECTION */}
      <section
        id="zero-inventory-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#a0f399]/40 text-[#217128] text-xs font-bold w-fit">
              <Warehouse className="w-4 h-4 text-[#1b6d24]" />
              <span>Zero Warehouse Model</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1c1b] leading-tight">
              We Don't Need a Warehouse. Produce Stays Fresh at the Farm.
            </h2>

            <p className="text-sm sm:text-base text-[#404945] leading-relaxed">
              Traditional supermarkets hoard produce in dark warehouses for weeks. At KisanDirect, produce stays rooted in the soil until your order is confirmed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#efeeec] p-5 rounded-2xl shadow-2xs border border-[#e3e2e0]">
                <Warehouse className="w-6 h-6 text-[#003629] mb-2" />
                <h4 className="text-sm font-bold text-[#1a1c1b] mb-1">Less Storage</h4>
                <p className="text-xs text-[#404945]">No multi-day warehousing.</p>
              </div>

              <div className="bg-[#efeeec] p-5 rounded-2xl shadow-2xs border border-[#e3e2e0]">
                <Handshake className="w-6 h-6 text-[#003629] mb-2" />
                <h4 className="text-sm font-bold text-[#1a1c1b] mb-1">Less Handling</h4>
                <p className="text-xs text-[#404945]">Touched only twice.</p>
              </div>

              <div className="bg-[#efeeec] p-5 rounded-2xl shadow-2xs border border-[#e3e2e0]">
                <Zap className="w-6 h-6 text-[#003629] mb-2" />
                <h4 className="text-sm font-bold text-[#1a1c1b] mb-1">Direct Movement</h4>
                <p className="text-xs text-[#404945]">Farm to doorstep fast.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/60">
              <img
                src={ZERO_INVENTORY_IMG}
                alt="Active sunny village farm field with pristine green leafy vegetables"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 text-white text-xs bg-[#003629] font-semibold px-3 py-1.5 rounded-lg shadow-md border border-white/20">
                Active Farm Field: Sonipat, Haryana • Plucked at Dawn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRE-CONTRACT GUARANTEED FAIRNESS */}
      <section
        id="guaranteed-fairness-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full"
      >
        <div className="bg-[#003629] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-xl z-10">
            <span className="text-xs text-[#a3f69c] uppercase tracking-widest font-extrabold">
              Guaranteed Fairness
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Buyer Commits First. Farmer Harvests Last.
            </h2>
            <p className="text-sm sm:text-base text-[#baeed9] leading-relaxed">
              By securing orders in advance, farmers are guaranteed a fair price before a single leaf is plucked. No market dumping, no distress sales.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#00281e] px-4 py-2.5 rounded-xl border border-white/20 w-fit mt-2">
              <CheckCircle className="w-5 h-5 text-[#a3f69c]" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Confirmed demand before harvesting.
              </span>
            </div>
          </div>

          {/* Farmer Assurance Impact Card */}
          <div className="z-10 bg-white text-[#1a1c1b] p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col gap-5 border border-white/30">
            <h3 className="text-lg font-bold text-[#1a1c1b] flex items-center justify-between">
              <span>Farmer Assurance Impact</span>
              <ShieldCheck className="w-5 h-5 text-[#1b6d24]" />
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#404945]">Fair Income Guaranteed</span>
                  <span className="text-[#003629]">100%</span>
                </div>
                <div className="w-full bg-[#efeeec] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#003629] h-full w-full rounded-full transition-all duration-1000" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#404945]">Crop Wastage Rate</span>
                  <span className="text-[#1b6d24]">&lt; 1%</span>
                </div>
                <div className="w-full bg-[#efeeec] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#1b6d24] h-full w-[2%] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#404945]">Speed to Household</span>
                  <span className="text-[#003629]">&lt; 18 Hrs</span>
                </div>
                <div className="w-full bg-[#efeeec] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#003629] h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="bg-[#baeed9]/40 p-2.5 rounded-lg text-[11px] text-[#002117] flex items-center justify-between">
              <span>Verified across 1,200+ local farm plots</span>
              <button
                onClick={() => onNavigate('for-farmers')}
                className="text-[#003629] font-bold underline"
              >
                Farmer Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TOP PRE-ORDER ITEMS (Featured Products Grid) */}
      <section
        id="top-preorder-items-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3 py-1 rounded-full">
              Fresh Harvests
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 text-[#1a1c1b]">
              Top Pre-Order Items
            </h2>
            <p className="text-xs sm:text-sm text-[#404945] mt-1">
              Plucked strictly tomorrow morning for today's orders.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              id="filter-all-produce"
              onClick={() => setProductFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'all'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              All Harvests
            </button>
            <button
              id="filter-rice-grains"
              onClick={() => setProductFilter('rice-grains')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'rice-grains'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Rice & Grains
            </button>
            <button
              id="filter-pulses"
              onClick={() => setProductFilter('pulses')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'pulses'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Pulses (Dals)
            </button>
            <button
              id="filter-millets-oilseeds"
              onClick={() => setProductFilter('millets-oilseeds')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'millets-oilseeds'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Millets & Oilseeds
            </button>
            <button
              id="filter-cotton"
              onClick={() => setProductFilter('cotton')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'cotton'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Raw Cotton
            </button>
            <button
              id="filter-spices-cash"
              onClick={() => setProductFilter('spices-cash')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'spices-cash'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Spices & Gur
            </button>
            <button
              id="filter-vegetables"
              onClick={() => setProductFilter('vegetables')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'vegetables'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Vegetables
            </button>
            <button
              id="filter-fruits"
              onClick={() => setProductFilter('fruits')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                productFilter === 'fruits'
                  ? 'bg-[#003629] text-white shadow-xs'
                  : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#e3e2e0]'
              }`}
            >
              Fruits
            </button>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => {
            const isAdded = addedAnimationId === prod.id;
            return (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-lg transition-all duration-300 border border-[#e3e2e0]"
              >
                {/* Image Container with Badge */}
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
                    Harvested After Order
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-[#003629] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                    {prod.distanceKm} km away
                  </span>
                </div>

                {/* Card Content */}
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
                      <p className="text-xs text-[#707974] mt-0.5">{prod.farmLocation}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#003629]">
                        ₹{prod.price}
                        <span className="text-xs font-normal text-gray-500">/{prod.unit}</span>
                      </span>
                      <p className="text-[10px] text-gray-400 line-through">
                        ₹{prod.retailPrice}
                      </p>
                    </div>
                  </div>

                  {/* Pre-Order Button */}
                  <button
                    onClick={() => handlePreOrderClick(prod)}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#1b6d24] text-white shadow-xs'
                        : 'bg-[#e9e8e6] text-[#1a1c1b] hover:bg-[#003629] hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added to Pre-Orders!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Pre-Order Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Catalog Link & Request Crop Notice */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#003629] hover:text-[#1b4d3e] bg-[#baeed9]/50 hover:bg-[#baeed9] px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            <span>Explore All 40+ Seasonal Farm Harvests</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenRequestCrop && (
            <button
              onClick={onOpenRequestCrop}
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#003629] hover:bg-[#1b4d3e] px-6 py-3 rounded-full transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Sprout className="w-4 h-4 text-[#a3f69c]" />
              <span>Request Any Crop or Seed Direct</span>
            </button>
          )}
        </div>
      </section>

      {/* 7.5 DEDICATED ON-DEMAND CROPS SECTION (Request Each & Every Type of Crop) */}
      <section
        id="on-demand-crops-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full"
      >
        <div className="bg-gradient-to-br from-[#003629] to-[#00241b] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3f69c] text-[#003629] text-xs font-extrabold">
                <Sprout className="w-3.5 h-3.5" />
                <span>Zero Middlemen • 100% Demand-Driven</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                Want Any Specific Crop? We Farm & Source It For You.
              </h2>
              <p className="text-xs sm:text-sm text-[#baeed9] leading-relaxed max-w-xl">
                Looking for ancient Khapli wheat, rare Kalanamak fragrant rice, organic black mustard seeds, pure raw cotton lint, or unpolished Kashmiri rajma? If it grows in Indian soil, our 4,800+ farmers will harvest and drop it straight at your colony gate.
              </p>

              {/* Sample badges */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white font-medium">
                  🌾 Kalanamak Heritage Rice
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white font-medium">
                  🌾 Emmer (Khapli) Wheat
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white font-medium">
                  🌿 Raw Kapas Cotton Lint
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white font-medium">
                  🥣 Unpolished Latur Toor
                </span>
                <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white font-medium">
                  ✨ Salem Curcumin Turmeric
                </span>
              </div>

              <div className="pt-3">
                {onOpenRequestCrop && (
                  <button
                    onClick={onOpenRequestCrop}
                    className="bg-[#a3f69c] text-[#003629] px-7 py-3.5 rounded-xl font-extrabold text-sm hover:bg-[#8ee887] transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request Any Crop or Seed Direct</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Community Stats Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>Recent Resident Crop Pools</span>
                <Users className="w-4 h-4 text-[#a3f69c]" />
              </h3>

              <div className="space-y-3 text-xs">
                <div className="bg-black/20 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Kalanamak Rice (कालानमक चावल)</div>
                    <div className="text-[11px] text-[#baeed9]">Purvanchal FPO • 250 kg pooled</div>
                  </div>
                  <span className="text-[#a3f69c] font-bold">₹110/kg</span>
                </div>

                <div className="bg-black/20 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Raw Cotton Lint (कपास रुई)</div>
                    <div className="text-[11px] text-[#baeed9]">Vidarbha Organic • Hand-picked</div>
                  </div>
                  <span className="text-[#a3f69c] font-bold">₹135/kg</span>
                </div>

                <div className="bg-black/20 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Ancient Khapli Wheat Flour</div>
                    <div className="text-[11px] text-[#baeed9]">Malwa Black Soil • Stone Chakki</div>
                  </div>
                  <span className="text-[#a3f69c] font-bold">₹68/kg</span>
                </div>
              </div>

              {onOpenRequestCrop && (
                <button
                  onClick={onOpenRequestCrop}
                  className="w-full text-center text-xs font-bold text-[#baeed9] hover:text-white underline cursor-pointer pt-1"
                >
                  View all active requests or submit yours →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. COLONY GROUP DELIVERY (Community Logistics) */}
      <section
        id="community-logistics-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full"
      >
        <div className="bg-[#f4f3f1] p-8 sm:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-[#e3e2e0]">
          <div className="flex flex-col gap-6">
            <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3 py-1 rounded-full w-fit">
              Community Logistics
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a1c1b] leading-tight">
              Order Together. Deliver Together.
            </h2>

            <p className="text-sm sm:text-base text-[#404945] leading-relaxed">
              Join hands with your neighbors to unlock direct farm shipments. Group delivery slashes logistics emissions and guarantees batch freshness straight to your society gate.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                id="join-colony-group-btn"
                onClick={onOpenJoinGroup}
                className="bg-[#003629] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#1b4d3e] transition-all shadow-sm cursor-pointer"
              >
                Join Colony Group
              </button>
              <button
                onClick={onOpenHowItWorks}
                className="text-[#003629] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Learn how it works</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-2 border border-[#e3e2e0]">
              <Users className="w-8 h-8 text-[#003629]" />
              <h4 className="text-base font-bold text-[#1a1c1b]">500+ Societies</h4>
              <p className="text-xs text-[#404945]">Active group delivery hubs across Delhi NCR.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs flex flex-col gap-2 border border-[#e3e2e0]">
              <Truck className="w-8 h-8 text-[#003629]" />
              <h4 className="text-base font-bold text-[#1a1c1b]">Zero Emission Drop</h4>
              <p className="text-xs text-[#404945]">Optimized electric van delivery fleets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS (Trusted Voices) */}
      <section
        id="testimonials-section"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs text-[#003629] uppercase tracking-widest font-extrabold bg-[#baeed9] px-3 py-1 rounded-full">
            Trusted Voices
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-3 text-[#1a1c1b]">
            Stories From Farmers & Buyers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between gap-6 border border-[#e3e2e0] hover:shadow-md transition-shadow"
            >
              <p className="text-sm sm:text-base text-[#404945] italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-[#c0c9c3]/30 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#e9e8e6] flex items-center justify-center font-bold text-[#003629] text-sm shrink-0 border border-[#003629]/20">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1a1c1b]">{t.author}</h4>
                  <p className="text-xs text-[#707974]">{t.role}, {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

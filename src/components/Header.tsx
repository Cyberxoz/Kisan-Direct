import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';
import { Society } from '../types';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  selectedSociety: Society;
  onOpenLocationModal: () => void;
  onOpenAuthModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenRequestCrop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  selectedSociety,
  onOpenLocationModal,
  onOpenAuthModal,
  searchQuery,
  onSearchChange,
  onOpenRequestCrop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'fresh-box', label: 'Fresh Box' },
    { id: 'for-farmers', label: 'For Farmers' },
    { id: 'bulk-buyers', label: 'Bulk Buyers' },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 w-full z-50 bg-[#faf9f7] border-b border-[#e3e2e0] shadow-xs"
    >
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Logo and Location */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            id="header-brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003629] rounded"
          >
            <img
              src={LOGO_URL}
              alt="KisanDirect Logo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </button>

          {/* Location Selector Trigger */}
          <button
            id="location-picker-btn"
            onClick={onOpenLocationModal}
            className="hidden xl:flex items-center gap-2 text-sm text-[#404945] hover:text-[#1a1c1b] px-3 py-1.5 rounded-full hover:bg-[#efeeec] transition-colors cursor-pointer border border-[#c0c9c3]/50"
            title="Select Colony Society Delivery Hub"
          >
            <MapPin className="w-4 h-4 text-[#003629]" />
            <span className="font-medium text-xs">
              Location: <strong className="text-[#1a1c1b]">{selectedSociety.name} ({selectedSociety.city})</strong>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#707974]" />
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          id="header-desktop-nav"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 text-sm transition-all rounded-lg font-medium cursor-pointer ${
                  isActive
                    ? 'bg-[#1b4d3e] text-[#8abda9] font-bold shadow-sm'
                    : 'text-[#404945] hover:text-[#1a1c1b] hover:bg-[#efeeec]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Cart, Login, Profile, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search bar */}
          <div className="relative hidden sm:block">
            <input
              id="header-produce-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search produce..."
              className="bg-[#e9e8e6] text-[#1a1c1b] text-sm rounded-full px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-[#003629] w-40 md:w-48 xl:w-60 transition-all placeholder:text-[#707974]"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#707974]" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-xs text-gray-500 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>

          {/* Request Any Crop Button */}
          {onOpenRequestCrop && (
            <button
              id="header-request-crop-btn"
              onClick={onOpenRequestCrop}
              className="hidden md:inline-flex items-center gap-1.5 bg-[#baeed9] hover:bg-[#a0f399] text-[#003629] text-xs font-extrabold px-3.5 py-2 rounded-full transition-all shadow-2xs cursor-pointer active:scale-95 border border-[#8abda9]/50"
              title="Request any crop, seed, or harvest direct from farmers"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#003629]" />
              <span>Request Any Crop</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="relative p-2 rounded-full hover:bg-[#efeeec] transition-colors cursor-pointer text-[#404945] hover:text-[#1a1c1b]"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span
                id="cart-badge-count"
                className="absolute -top-0.5 -right-0.5 bg-[#003629] text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Login Link */}
          <button
            id="header-login-btn"
            onClick={onOpenAuthModal}
            className="hidden sm:inline-flex text-sm font-semibold text-[#003629] hover:text-[#1b4d3e] transition-colors cursor-pointer px-2 py-1 rounded hover:bg-[#efeeec]"
          >
            Login
          </button>

          {/* User Profile Avatar */}
          <button
            id="header-profile-avatar-btn"
            onClick={onOpenAuthModal}
            aria-label="User Account Profile"
            className="w-8 h-8 rounded-full bg-[#003629] hover:bg-[#1b4d3e] flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-sm text-white"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#404945] hover:text-[#1a1c1b] hover:bg-[#efeeec]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#faf9f7] border-b border-[#e3e2e0] px-4 pt-2 pb-6 space-y-3 shadow-xl"
        >
          {/* Mobile Location */}
          <button
            onClick={() => {
              onOpenLocationModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between text-left p-3 rounded-xl bg-[#efeeec] text-sm text-[#1a1c1b]"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#003629]" />
              <span>Society: {selectedSociety.name}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search produce, farms..."
              className="w-full bg-[#e9e8e6] text-[#1a1c1b] text-sm rounded-xl px-4 py-2.5 pl-10 outline-none"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#707974]" />
          </div>

          {/* Mobile Request Crop Button */}
          {onOpenRequestCrop && (
            <button
              onClick={() => {
                onOpenRequestCrop();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#baeed9] text-[#003629] font-extrabold text-xs shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#003629]" />
              <span>Request Any Crop / Seed Direct From Farmers</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2.5 text-sm rounded-xl text-left font-medium transition-all ${
                    isActive
                      ? 'bg-[#1b4d3e] text-[#8abda9] font-bold shadow-sm'
                      : 'bg-[#efeeec] text-[#1a1c1b] hover:bg-[#e3e2e0]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

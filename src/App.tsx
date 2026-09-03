/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MandiTicker } from './components/MandiTicker';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { JoinGroupModal } from './components/JoinGroupModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { RequestCropModal } from './components/RequestCropModal';

import { HomeScreen } from './screens/HomeScreen';
import { ShopScreen } from './screens/ShopScreen';
import { HowItWorksScreen } from './screens/HowItWorksScreen';
import { FreshBoxScreen } from './screens/FreshBoxScreen';
import { ForFarmersScreen } from './screens/ForFarmersScreen';
import { BulkBuyersScreen } from './screens/BulkBuyersScreen';

import { SOCIETIES, PRODUCTS } from './data/mockData';
import { CartItem, Product, Society } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSociety, setSelectedSociety] = useState<Society>(SOCIETIES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial cart items (3 items to match reference screenshot badge)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // Fresh Tomato (1kg)
    { product: PRODUCTS[1], quantity: 2 }, // Organic Potato (2kg)
    { product: PRODUCTS[3], quantity: 1 }, // Fresh Spinach (1 bunch)
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isJoinGroupOpen, setIsJoinGroupOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isRequestCropOpen, setIsRequestCropOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && activeTab !== 'shop') {
      setActiveTab('shop');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] font-sans antialiased text-[#1a1c1b] selection:bg-[#baeed9] selection:text-[#002117]">
      {/* Top Mandi Ticker */}
      <MandiTicker onLearnMore={() => setActiveTab('how-it-works')} />

      {/* Main App Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedSociety={selectedSociety}
        onOpenLocationModal={() => setIsLocationOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenRequestCrop={() => setIsRequestCropOpen(true)}
      />

      {/* Active Screen View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenJoinGroup={() => setIsJoinGroupOpen(true)}
            onOpenHowItWorks={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRequestCrop={() => setIsRequestCropOpen(true)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopScreen
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            initialSearchQuery={searchQuery}
            onOpenRequestCrop={() => setIsRequestCropOpen(true)}
          />
        )}

        {activeTab === 'how-it-works' && <HowItWorksScreen />}

        {activeTab === 'fresh-box' && (
          <FreshBoxScreen onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'for-farmers' && <ForFarmersScreen />}

        {activeTab === 'bulk-buyers' && <BulkBuyersScreen />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        society={selectedSociety}
        onOpenLocationModal={() => {
          setIsCartOpen(false);
          setIsLocationOpen(true);
        }}
      />

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedSociety={selectedSociety}
        onSelectSociety={(soc) => setSelectedSociety(soc)}
        onOpenJoinModal={() => setIsJoinGroupOpen(true)}
      />

      {/* Join Colony Group Modal */}
      <JoinGroupModal
        isOpen={isJoinGroupOpen}
        onClose={() => setIsJoinGroupOpen(false)}
      />

      {/* Product Origin & Traceability Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        inCartCount={
          selectedProduct
            ? cartItems.find((i) => i.product.id === selectedProduct.id)?.quantity || 0
            : 0
        }
      />

      {/* Sign In & Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* On-Demand Crop Request Modal */}
      <RequestCropModal
        isOpen={isRequestCropOpen}
        onClose={() => setIsRequestCropOpen(false)}
        selectedSociety={selectedSociety}
      />
    </div>
  );
}

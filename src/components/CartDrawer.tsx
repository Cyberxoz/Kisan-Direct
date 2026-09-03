import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, CheckCircle2, Clock, MapPin, Truck } from 'lucide-react';
import { CartItem, Society } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  society: Society;
  onOpenLocationModal: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  society,
  onOpenLocationModal,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const retailEquivalent = items.reduce((acc, item) => acc + item.product.retailPrice * item.quantity, 0);
  const totalSavings = Math.max(0, retailEquivalent - subtotal);
  const groupDeliveryFee = 0; // Free for colony hubs!

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleReset = () => {
    setOrderPlaced(false);
    onClearCart();
    onClose();
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex justify-end transition-opacity duration-300"
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#faf9f7] h-full flex flex-col shadow-2xl border-l border-[#e3e2e0] animate-slideLeft"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#e3e2e0] flex items-center justify-between bg-white">
          <div>
            <h2 className="text-lg font-bold text-[#1a1c1b] flex items-center gap-2">
              <span>Your Harvest Pre-Order</span>
              <span className="text-xs bg-[#baeed9] text-[#002117] font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </h2>
            <p className="text-xs text-[#707974] flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#003629]" />
              <span>Harvest batch closes midnight • Fresh dawn harvest</span>
            </p>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 text-[#707974] hover:text-[#1a1c1b] rounded-full hover:bg-[#efeeec] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {orderPlaced ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#baeed9] flex items-center justify-center text-[#003629] mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#003629]">Pre-Order Confirmed!</h3>
            <p className="text-sm text-[#404945] max-w-xs">
              Thank you, <strong>{customerName || 'Neighbor'}</strong>! Farmers in Karnal, Meerut & Sonipat have received your confirmed order and will harvest strictly for you at dawn.
            </p>

            <div className="w-full bg-white p-4 rounded-xl border border-[#e3e2e0] text-left text-xs space-y-2 mt-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#707974]">Batch ID:</span>
                <span className="font-mono font-bold text-[#003629]">KD-HARVEST-402</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#707974]">Colony Gate Hub:</span>
                <span className="font-semibold text-[#1a1c1b]">{society.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-[#707974]">Drop-off Window:</span>
                <span className="font-semibold text-[#1b6d24]">{society.deliverySlot}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>Total Payable at Gate:</span>
                <span className="text-[#003629]">₹{subtotal}</span>
              </div>
            </div>

            <div className="bg-[#a0f399]/25 text-[#217128] p-3 rounded-lg text-xs flex items-center gap-2 text-left">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Zero Middlemen: Farmer receives 82% of this bill directly. You saved ₹{totalSavings} vs supermarket!</span>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-[#003629] text-white py-3 rounded-lg font-semibold hover:bg-[#1b4d3e] transition-colors mt-4"
            >
              Done & Return to Market
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#efeeec] flex items-center justify-center text-[#707974]">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#1a1c1b]">Your pre-order basket is empty</h3>
            <p className="text-xs text-[#707974] max-w-xs">
              Add fresh produce harvested on-demand straight from local village farms.
            </p>
            <button
              onClick={onClose}
              className="bg-[#003629] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1b4d3e] transition-colors"
            >
              Explore Fresh Harvests
            </button>
          </div>
        ) : (
          /* Active Cart List */
          <>
            {/* Society Gate Destination Banner */}
            <div className="bg-[#baeed9]/40 border-b border-[#baeed9] px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#002117]">
                <MapPin className="w-3.5 h-3.5 text-[#003629]" />
                <span>
                  Delivery: <strong>{society.name}</strong> ({society.area})
                </span>
              </div>
              <button
                onClick={onOpenLocationModal}
                className="text-[#003629] font-bold underline hover:text-[#1b6d24]"
              >
                Change
              </button>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl p-3 border border-[#e3e2e0] shadow-xs flex items-center gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-[#1a1c1b] truncate">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#707974]">{item.product.farmLocation}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-[#003629]">
                        ₹{item.product.price * item.quantity}{' '}
                        <span className="text-[10px] text-gray-500 font-normal">
                          (₹{item.product.price}/{item.product.unit})
                        </span>
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2 bg-[#efeeec] rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-[#1a1c1b] hover:text-black p-0.5"
                          title="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold min-w-[20px] text-center">
                          {item.quantity} {item.product.unit === 'piece' ? 'pc' : item.product.unit}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-[#1a1c1b] hover:text-black p-0.5"
                          title="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Middlemen Spoilage & Markup comparison */}
              <div className="bg-[#1b4d3e]/10 border border-[#1b4d3e]/20 rounded-xl p-3 text-xs space-y-1 text-[#003629]">
                <div className="font-bold flex items-center justify-between">
                  <span>Farm Direct Advantage</span>
                  <span className="text-[#1b6d24] font-extrabold">-₹{totalSavings} saved</span>
                </div>
                <p className="text-[11px] text-[#404945]">
                  Supermarket price: <span className="line-through">₹{retailEquivalent}</span> • Mandi markups bypassed.
                </p>
              </div>

              {/* Customer Flat Details Form */}
              <form id="checkout-preorder-form" onSubmit={handleCheckout} className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-[#1a1c1b]">Society Gate Delivery Details:</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#003629]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Tower / Flat No."
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                    className="w-full bg-white border border-[#c0c9c3] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#003629]"
                  />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Mobile (For gate arrival alert)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border border-[#c0c9c3] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#003629]"
                />
              </form>
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-4 bg-white border-t border-[#e3e2e0] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#707974]">
                  <span>Pre-Order Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#707974]">
                  <span>Colony EV Electric Delivery:</span>
                  <span className="text-[#1b6d24] font-bold">FREE (Group Drop)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1a1c1b] pt-1 border-t">
                  <span>Total Amount:</span>
                  <span className="text-base text-[#003629]">₹{subtotal}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-preorder-form"
                className="w-full bg-[#003629] text-white py-3 rounded-lg font-bold hover:bg-[#1b4d3e] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-[0.99]"
              >
                <span>Commit Pre-Order (Pay at Gate)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-[#707974]">
                Lock your order before midnight. Plucked fresh tomorrow at dawn.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

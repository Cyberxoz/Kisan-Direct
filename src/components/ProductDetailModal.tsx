import React from 'react';
import { X, MapPin, Calendar, Award, ShieldCheck, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  inCartCount: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  inCartCount,
}) => {
  if (!product) return null;

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    >
      <div
        id="product-detail-modal-card"
        className="bg-[#faf9f7] w-full max-w-xl rounded-2xl shadow-2xl border border-[#e3e2e0] overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
      >
        {/* Crystal Clear Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#efeeec]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white text-[#1a1c1b] rounded-full transition-colors shadow-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute top-3 left-3 bg-[#003629] text-[#baeed9] text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Harvested Strictly After Order
          </span>
        </div>

        {/* Content Details */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#1a1c1b]">
          {/* Header Title & Price */}
          <div className="flex justify-between items-start border-b border-[#e3e2e0] pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1a1c1b]">{product.name}</h2>
              {product.hindiName && (
                <span className="text-sm font-medium text-[#707974]">({product.hindiName})</span>
              )}
              <p className="text-xs text-[#404945] flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#1b6d24]" />
                <span>{product.farmLocation} • {product.distanceKm} km from Delhi NCR</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#003629]">₹{product.price}</span>
              <span className="text-xs text-[#707974] block">/{product.unit}</span>
              {product.retailPrice && (
                <span className="text-xs text-gray-400 line-through block">₹{product.retailPrice}</span>
              )}
            </div>
          </div>
          {/* Farm Traceability Block */}
          <div className="bg-white p-4 rounded-xl border border-[#e3e2e0] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#1b6d24]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#003629]">
                  Verified Farm Partner
                </span>
              </div>
              <span className="text-xs bg-[#baeed9] text-[#002117] px-2.5 py-0.5 rounded-full font-bold">
                {product.organic ? '100% Bio-Fertigated' : 'Chemical-Residue Free'}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#1a1c1b]">{product.farmerName}</p>
            <p className="text-xs text-[#404945]">{product.description}</p>
          </div>

          {/* Harvest Timeline */}
          <div className="bg-[#f4f3f1] p-4 rounded-xl space-y-2 border border-[#e3e2e0]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#003629]">
              <Calendar className="w-4 h-4 text-[#003629]" />
              <span>Harvest & Plucking Window</span>
            </div>
            <p className="text-xs text-[#1a1c1b] font-medium">
              Scheduled: <strong>{product.harvestWindow}</strong>
            </p>
            <p className="text-[11px] text-[#707974]">
              This crop remains anchored in live field soil until your order is grouped tonight. Picked at dawn, delivered to society gate by breakfast.
            </p>
          </div>

          {/* Transparency Comparison */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white rounded-xl border border-[#e3e2e0]">
              <div className="text-[10px] text-[#707974] uppercase font-bold">Farmer Net Rate</div>
              <div className="text-sm font-extrabold text-[#1b6d24]">₹{Math.round(product.price * 0.82)}</div>
              <div className="text-[9px] text-[#217128]">82% Direct Share</div>
            </div>
            <div className="p-3 bg-[#baeed9]/30 rounded-xl border border-[#003629]/20">
              <div className="text-[10px] text-[#003629] uppercase font-bold">KisanDirect Pre-Order</div>
              <div className="text-sm font-extrabold text-[#003629]">₹{product.price}</div>
              <div className="text-[9px] text-[#003629] font-medium">0 Warehouse Overhead</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#e3e2e0]">
              <div className="text-[10px] text-[#707974] uppercase font-bold">Supermarket Retail</div>
              <div className="text-sm font-extrabold text-red-600 line-through">₹{product.retailPrice}</div>
              <div className="text-[9px] text-red-500">4-7 Days In Cold Store</div>
            </div>
          </div>

          {/* Nutrients Pills */}
          <div>
            <div className="text-xs font-bold text-[#707974] uppercase tracking-wider mb-2">
              Peak Nutrition Index (Plucked at Dawn)
            </div>
            <div className="flex flex-wrap gap-2">
              {product.nutrients.map((nut, idx) => (
                <span
                  key={idx}
                  className="bg-white border border-[#c0c9c3] text-[#404945] px-3 py-1 rounded-full text-xs font-medium"
                >
                  {nut}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 bg-white border-t border-[#e3e2e0] flex items-center justify-between gap-4">
          <div className="text-xs text-[#707974]">
            Pre-order minimum: <strong>{product.minOrder} {product.unit}</strong>
          </div>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="bg-[#003629] hover:bg-[#1b4d3e] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Pre-Order {product.name} (₹{product.price})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

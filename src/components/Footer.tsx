import React, { useState } from 'react';
import { Globe, Share2, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      id="main-app-footer"
      className="w-full bg-[#f4f3f1] border-t border-[#e3e2e0] py-12 mt-16 text-[#1a1c1b]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src={LOGO_URL}
                alt="KisanDirect Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-[#404945] text-sm">From Farm Gate to Your Plate</p>
            <div className="flex items-center gap-4 text-[#404945] pt-1">
              <button
                aria-label="Website"
                className="p-1.5 rounded-full hover:bg-[#e3e2e0] hover:text-[#003629] transition-colors"
              >
                <Globe className="w-5 h-5 cursor-pointer" />
              </button>
              <button
                aria-label="Share"
                className="p-1.5 rounded-full hover:bg-[#e3e2e0] hover:text-[#003629] transition-colors"
              >
                <Share2 className="w-5 h-5 cursor-pointer" />
              </button>
              <button
                aria-label="Community Forum"
                className="p-1.5 rounded-full hover:bg-[#e3e2e0] hover:text-[#003629] transition-colors"
              >
                <MessageSquare className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
            <div className="text-xs text-[#707974] mt-2">
              Serving 500+ Housing Societies & RWA Hubs across Delhi, Noida, Gurgaon, Faridabad & Ghaziabad.
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-[#1a1c1b]">Quick Links</h4>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-[#404945] hover:text-[#003629] text-left transition-colors cursor-pointer"
            >
              Shop Produce
            </button>
            <button
              onClick={() => onNavigate('for-farmers')}
              className="text-sm text-[#404945] hover:text-[#003629] text-left transition-colors cursor-pointer"
            >
              Our Farmers & FPOs
            </button>
            <button
              onClick={() => onNavigate('fresh-box')}
              className="text-sm text-[#404945] hover:text-[#003629] text-left transition-colors cursor-pointer"
            >
              Fresh Box Subscription
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="text-sm text-[#404945] hover:text-[#003629] text-left transition-colors cursor-pointer"
            >
              Mandi Rates & Transparency
            </button>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-[#1a1c1b]">Support</h4>
            <a
              href="#help"
              onClick={(e) => { e.preventDefault(); alert('KisanDirect Help Center is active 24/7. Call Toll-Free: 1800-KISAN-DIR or WhatsApp our farm logistics desk.'); }}
              className="text-sm text-[#404945] hover:text-[#003629] transition-colors"
            >
              Help Center & FAQ
            </a>
            <a
              href="#track"
              onClick={(e) => { e.preventDefault(); alert('Batch #402: Currently in Field Harvest & Crate Aggregation in Sonipat & Karnal. Estimated gate dispatch: 6:00 AM.'); }}
              className="text-sm text-[#404945] hover:text-[#003629] transition-colors"
            >
              Track Society Dispatch
            </a>
            <a
              href="#returns"
              onClick={(e) => { e.preventDefault(); alert('Zero Hassle Guarantee: If any vegetable does not meet peak freshness, 100% instant refund with no return required.'); }}
              className="text-sm text-[#404945] hover:text-[#003629] transition-colors"
            >
              Returns & Freshness Guarantee
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); alert('Contact Desk: contact@kisandirect.in | Regional Depot: Kundli Agro Logistics Node, NH-44.'); }}
              className="text-sm text-[#404945] hover:text-[#003629] transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-[#1a1c1b]">Newsletter</h4>
            <p className="text-xs text-[#404945]">
              Get weekly harvest updates, seasonal crop alerts, and direct farm gate pricing.
            </p>
            {subscribed ? (
              <div className="bg-[#baeed9] text-[#002117] p-3 rounded-lg text-xs font-semibold flex items-center gap-2 border border-[#1d4f40]/20 animate-fadeIn">
                <Check className="w-4 h-4 text-[#1b6d24]" />
                <span>Subscribed! You will receive weekly harvest forecasts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-[#e9e8e6] text-[#1a1c1b] text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#003629] flex-1 placeholder:text-[#707974]"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="bg-[#003629] hover:bg-[#1b4d3e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-8 pt-8 border-t border-[#c0c9c3]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#707974] gap-4">
          <p>© 2024 KisanDirect Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1a1c1b] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#1a1c1b] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#1a1c1b] cursor-pointer">FPO Fair Trade Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

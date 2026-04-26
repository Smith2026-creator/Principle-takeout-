/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShoppingCart, ArrowRight, Star, Clock, CheckCircle2, 
  ChevronDown, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  name: string;
  price: string;
  desc: string;
  badge: string;
}

interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface FAQItem {
  q: string;
  a: string;
}

// --- Data ---
const menuItems: MenuItem[] = [
  { name: "Signature Jollof Rice", price: "£10.99", desc: "Freshly made every day — no shortcuts, ever.", badge: "Chef's Pick" },
  { name: "Grilled Chicken Platter", price: "£12.99", desc: "Served with sides and our secret spicy sauce.", badge: "Halal" },
  { name: "Lamb Suya Wrap", price: "£9.99", desc: "Succulent lamb with spicy peanut rub.", badge: "Popular" },
  { name: "Veggie Supreme Bowl", price: "£8.99", desc: "Wholesome seasonal greens and legumes.", badge: "Vegan" },
  { name: "Pepper Soup", price: "£7.99", desc: "A spicy, aromatic traditional favourite.", badge: "Authentic" },
  { name: "Puff Puff Dessert Box", price: "£5.99", desc: "Soft, golden dough balls (12 pieces).", badge: "Sweet" },
];

const reviews: Review[] = [
  { name: "Amara K.", location: "Benin City", text: "Best jollof rice I've ever had delivered. Always hot and perfectly seasoned!", rating: 5 },
  { name: "David O.", location: "Benin City", text: "Fast, consistent, and the portions are generous. My family orders every Friday.", rating: 5 },
  { name: "Fatima B.", location: "Benin City", text: "The lamb suya wrap is unreal. Delivery was 25 minutes. Won't order from anywhere else now.", rating: 5 },
];

const faqs: FAQItem[] = [
  { q: "How long does delivery take?", a: "We guarantee delivery in 30 minutes or less in our coverage zones." },
  { q: "Is your food halal?", a: "Yes, all our meat is halal-certified. We display dietary info on every item." },
  { q: "Do you have a minimum order?", a: "Yes, our minimum order is ₦2,000 / £5." },
  { q: "Can I schedule an order in advance?", a: "Yes, you can schedule up to 24 hours ahead during checkout." },
  { q: "What payment methods do you accept?", a: "Card, bank transfer, and cash on delivery." },
  { q: "Do you cater for large groups or events?", a: "Yes! Contact us for bulk/event orders." },
  { q: "What if my order is late?", a: "Your next order is free. No questions asked." },
  { q: "How do I track my order?", a: "You'll receive an SMS with a live tracking link after placing your order." },
];

const areas = ["Benin City Central", "GRA", "Ugbowo", "Uselu", "Ekosodin", "New Benin", "Ikpoba Hill"];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-brand-charcoal">Principle<span className="text-brand-orange">Takeout</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-brand-charcoal/80">
          {['Menu', 'How It Works', 'Reviews', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-orange transition-colors">{link}</a>
          ))}
          <button className="bg-brand-orange text-white px-6 py-2 rounded-full font-bold hover:brightness-110 transition-all button-shadow">
            Order Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-charcoal">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center gap-6 md:hidden border-t"
          >
            {['Menu', 'How It Works', 'Reviews', 'Contact'].map(link => (
              <a key={link} onClick={() => setIsMenuOpen(false)} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-medium">{link}</a>
            ))}
            <button className="bg-brand-orange text-white px-8 py-3 rounded-full font-semibold">Order Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, centered = true, subtitle = "" }: { children: React.ReactNode, centered?: boolean, subtitle?: string }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-black text-brand-charcoal mb-4 tracking-tighter">{children}</h2>
    {subtitle && <p className="text-brand-charcoal/60 text-lg max-w-2xl mx-auto font-medium">{subtitle}</p>}
    <div className={`h-2 w-16 bg-brand-orange rounded-full mt-4 ${centered ? 'mx-auto' : ''}`} />
  </div>
);

const FAQAccordion = ({ item }: { item: FAQItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-lg py-2 hover:text-brand-orange transition-colors"
      >
        <span>{item.q}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 pb-4 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(48 * 3600); // 48 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-4 justify-center my-8 font-mono">
      {[
        { label: 'H', val: hours },
        { label: 'M', val: minutes },
        { label: 'S', val: seconds }
      ].map((t, idx) => (
        <React.Fragment key={t.label}>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-black rounded-lg mb-1">
              {t.val.toString().padStart(2, '0')}
            </div>
            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{t.label}</span>
          </div>
          {idx < 2 && <div className="text-3xl md:text-5xl font-black opacity-20">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function App() {
  const handleAreaCheck = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Great news! We deliver to your area. Estimated time: 25–35 minutes.");
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden px-4 md:px-6">
        {/* Background Decor */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-[-5%] w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full z-10 grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <span className="text-brand-orange font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Premium Fast Food</span>
            <h1 className="text-5xl md:text-8xl font-black text-brand-charcoal leading-[0.95] mb-6 tracking-tighter">
              Hot, Fresh Takeout — <br/><span className="text-brand-orange">Delivered in 30 Mins</span>
            </h1>
            <p className="text-xl text-brand-charcoal/60 mb-10 max-w-lg leading-relaxed font-medium">
              Premium meals made with real ingredients. Order online in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-brand-orange text-white px-10 py-5 rounded-2xl text-lg font-black hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 button-shadow">
                Order Now →
              </button>
              <button className="border-3 border-brand-charcoal text-brand-charcoal px-10 py-5 rounded-2xl text-lg font-black hover:bg-brand-charcoal hover:text-white transition-all">
                View Menu
              </button>
            </div>
            <div className="flex flex-wrap gap-8 text-sm font-bold text-brand-charcoal/50 uppercase tracking-wider">
              <span className="flex items-center gap-2"><span className="text-brand-gold text-lg">⭐</span> 4.9 Rating</span>
              <span className="flex items-center gap-2"><span className="text-brand-orange text-lg">🕐</span> 30-Min Guarantee</span>
              <span className="flex items-center gap-2"><span className="text-green-600 text-lg">✅</span> Halal Certified</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 relative hidden md:block"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-brand-orange to-brand-gold rounded-[3rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl rotate-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-center p-8">Your Food Hero Image Here</div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 blur-3xl rounded-full" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-gold/40 blur-3xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Trust Bar */}
      <section className="bg-brand-charcoal text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-12">
          {[
            { n: "10,000+", l: "Orders Delivered" },
            { n: "4.9★", l: "Average Rating" },
            { n: "30-Min", l: "Avg Delivery" },
            { n: "5 Years", l: "In Community" }
          ].map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-brand-orange mb-1">{s.n}</div>
              <div className="text-[10px] md:text-xs text-white/50 font-black uppercase tracking-widest leading-loose">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>Order in 3 Simple Steps</SectionHeading>
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {[
              { i: 1, t: "Choose Your Meal", d: "Browse our menu and pick your favourites" },
              { i: 2, t: "Place Your Order", d: "Pay securely online in under 60 seconds" },
              { i: 3, t: "We Deliver", d: "Hot to your door in 30 minutes or less" }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center p-8 rounded-3xl group"
              >
                <div className="text-7xl font-black text-brand-orange/10 absolute top-4 left-1/2 -translate-x-1/2">{step.i}</div>
                <div className="w-12 h-12 bg-brand-offwhite border border-brand-orange/20 rounded-full flex items-center justify-center mb-6 font-black text-brand-orange text-lg group-hover:scale-110 group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                   {step.i}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.t}</h3>
                <p className="text-gray-500 leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <button className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-orange-100">
               Start Your Order <ArrowRight size={18} />
             </button>
          </div>
        </div>
      </section>

      {/* 5. Menu Highlights */}
      <section id="menu" className="py-24 px-4 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Freshly made every day — no shortcuts, ever.">Most Loved Dishes</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {menuItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-orange-50 to-brand-gold-50 relative p-6 flex items-center justify-center">
                  <div className="w-24 h-24 food-gradient rounded-3xl shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500" />
                  <span className="absolute top-4 right-4 bg-brand-orange/10 text-brand-orange text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{item.badge}</span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black tracking-tight">{item.name}</h3>
                    <span className="text-brand-orange font-black text-lg">{item.price}</span>
                  </div>
                  <p className="text-brand-charcoal/50 text-sm mb-8 font-medium leading-relaxed">{item.desc}</p>
                  <button className="w-full bg-brand-charcoal text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gray-100 hover:shadow-orange-200">
                    <ShoppingCart size={18} /> Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="border-2 border-brand-charcoal text-brand-charcoal px-10 py-4 rounded-full font-bold hover:bg-brand-charcoal hover:text-white transition-all">View Full Menu</button>
          </div>
        </div>
      </section>

      {/* 6. Reviews */}
      <section id="reviews" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>What Our Customers Say</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {reviews.map((rev, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-offwhite p-8 rounded-3xl border border-gray-100 italic"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} className="text-brand-orange fill-brand-orange" />)}
                </div>
                <p className="text-lg text-brand-charcoal mb-6 leading-relaxed">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border border-brand-gold" />
                  <div>
                    <div className="font-bold not-italic">{rev.name}</div>
                    <div className="text-sm text-gray-500 not-italic">{rev.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-20">
            <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">As Featured In</div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
              {['Vanguard', 'TechCabal Food', 'Naija Eats Guide'].map(logo => (
                <div key={logo} className="text-2xl font-black">{logo}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Promo Banner */}
      <section className="py-24 px-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-brand-orange rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-orange/20"
        >
          <div className="absolute -bottom-10 -right-10 text-white/10 text-[15rem] font-black select-none pointer-events-none rotate-12">%</div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Get 20% Off Your First Order</h2>
            <p className="text-lg text-white/80 mb-4 font-bold uppercase tracking-widest">Use code at checkout</p>
            <div className="inline-block bg-black/20 backdrop-blur-md px-8 py-3 rounded-2xl font-mono text-2xl font-black tracking-[0.3em] border border-white/20 mb-8 border-dashed">
              PRINCIPLE20
            </div>
            <CountdownTimer />
            <button className="bg-white text-brand-orange px-12 py-5 rounded-2xl text-xl font-black hover:bg-brand-charcoal hover:text-white transition-all duration-300 mt-8 shadow-xl">
              Claim My Discount →
            </button>
          </div>
        </motion.div>
      </section>

      {/* 8. Why Choose Principle */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>The Principle Difference</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12 mt-16 pb-12">
            {[
              { t: "Fresh Daily Prep", d: "We cook fresh every single day, never reheated.", i: "🍳" },
              { t: "30-Min Delivery Guarantee", d: "Late? Your next order is on us. No questions asked.", i: "⏱️" },
              { t: "No Hidden Fees", d: "What you see is what you pay, always. No service charges.", i: "💸" },
              { t: "Halal & Dietary Options", d: "Clear labelling for every dietary need and preference.", i: "✅" }
            ].map((f, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border border-gray-100">
                  {f.i}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{f.t}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Delivery Area */}
      <section className="py-24 px-4 bg-[#F4A261]/10">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-brand-gold/5 border border-brand-gold/20 text-center">
          <SectionHeading>Do We Deliver to You?</SectionHeading>
          <form onSubmit={handleAreaCheck} className="flex flex-col sm:flex-row gap-4 mt-8 mb-12">
            <input 
              type="text" 
              placeholder="Enter your postcode or area" 
              className="flex-1 px-8 py-4 rounded-xl border border-brand-charcoal/10 focus:border-brand-orange outline-none text-lg transition-all bg-brand-offwhite/50"
              required
            />
            <button type="submit" className="bg-brand-charcoal text-white px-10 py-4 rounded-xl font-black hover:bg-brand-orange transition-all shadow-lg hover:translate-y-[-2px]">
              Check Area
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map(area => (
              <span key={area} className="bg-brand-offwhite px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-brand-charcoal/70 border border-brand-charcoal/5 flex items-center gap-2 group hover:border-brand-orange hover:bg-white transition-all cursor-default">
                <MapPin size={12} className="text-brand-orange" /> {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>Got Questions?</SectionHeading>
          <div className="mt-12">
            {faqs.map((faq, idx) => <FAQAccordion key={idx} item={faq} />)}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-brand-charcoal rounded-[4rem] p-12 md:p-32 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Hungry? Let's Fix That.</h2>
            <p className="text-xl text-white/50 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">Hot meals, real ingredients, 30-minute delivery. Order now and have food at your door in record time.</p>
            <button className="bg-brand-orange text-white px-16 py-6 rounded-2xl text-2xl font-black hover:translate-y-[-4px] transition-all button-shadow mb-16">
              Order Now — In 60 Seconds →
            </button>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 transition-all border border-white/10 group">
                <Smartphone size={28} className="group-hover:scale-110 transition-transform" />
                <div className="text-left"><div className="text-[10px] font-black uppercase tracking-widest opacity-50">App Store</div><div className="text-md font-black">Download</div></div>
              </button>
              <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl flex items-center gap-4 transition-all border border-white/10 group">
                <Smartphone size={28} className="group-hover:scale-110 transition-transform" />
                <div className="text-left"><div className="text-[10px] font-black uppercase tracking-widest opacity-50">Google Play</div><div className="text-md font-black">Get it on</div></div>
              </button>
            </div>
          </div>
          {/* Decorative blurs */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* 12. Footer */}
      <footer id="contact" className="bg-brand-charcoal text-white/60 pt-24 pb-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="text-3xl font-black text-white mb-8 tracking-tighter">Principle<span className="text-brand-orange">Takeout</span></div>
            <p className="leading-relaxed mb-8 font-medium italic text-lg pr-4">"Real food. Real fast. No compromises."</p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all border border-white/10"><Icon size={20} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em]">Explore</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><a href="#menu" className="hover:text-brand-orange transition-colors">Digital Menu</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-orange transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Team & Story</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Partner With Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em]">Support</h4>
            <ul className="space-y-5 font-bold text-sm">
              <li className="flex gap-4 items-center"><Phone size={18} className="text-brand-orange" /> +234 123 456 7890</li>
              <li className="flex gap-4 items-center"><Mail size={18} className="text-brand-orange" /> hello@principle.com</li>
              <li className="flex gap-4 items-start"><MapPin size={18} className="text-brand-orange mt-1 shrink-0" /> Benin City, Edo State, Nigeria</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 text-xs uppercase tracking-[0.3em]">Store Hours</h4>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-white/5 font-black text-6xl">24/7</div>
              <div className="text-xs font-black text-brand-gold uppercase tracking-widest mb-2">Open Daily</div>
              <div className="text-2xl font-black text-white">11AM – 10PM</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
          <div className="opacity-40">© 2025 Principle Takeout. Crafted for enthusiasts.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span className="text-brand-gold">Halal Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

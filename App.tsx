
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { GeminiAssistant } from './components/GeminiAssistant';
import { CATEGORIES, PRODUCTS, DEVICES, BLOGS } from './constants';
import { Product, CartItem, Page } from './types';
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, Truck, ShieldCheck, RefreshCw, Zap, Droplets, Search, Package, Activity, Cable, Battery, ChevronRight, Star, Calendar, User, Info, Check, X, Home, Grid, Heart, Settings, Phone, Cpu, Filter, Sparkles, Tag, Ruler, MessageSquare, BookOpen, Wifi, RotateCcw, ShoppingCart, Lock, Award, ArrowRight, CreditCard, Mail, MapPin, HelpCircle, ChevronDown, Send } from 'lucide-react';

const App = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<'Cochlear' | 'Advanced Bionics' | 'Med-El' | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch User Country based on IP
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            if (data.country_name) {
                setUserCountry(data.country_name);
            }
        })
        .catch(err => {
            console.log('Could not fetch location', err);
            // Fallback is handled in UI (shows 'Worldwide')
        });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product, selectedColor?: string, selectedSize?: string, selectedCapacity?: string) => {
    setCart(prev => {
      const cartId = `${product.id}-${selectedColor||''}-${selectedSize||''}-${selectedCapacity||''}`;
      const existing = prev.find(item => `${item.id}-${item.selectedColor||''}-${item.selectedSize||''}-${item.selectedCapacity||''}` === cartId);
      
      if (existing) {
        return prev.map(item => `${item.id}-${item.selectedColor||''}-${item.selectedSize||''}-${item.selectedCapacity||''}` === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor, selectedSize, selectedCapacity }];
    });
  };

  const removeFromCart = (index: number) => {
      setCart(prev => prev.filter((_, i) => i !== index));
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage(Page.PRODUCT_DETAIL);
    window.scrollTo(0,0);
  };

  const resetFilters = () => {
      setSelectedBrand(null);
      setSelectedModel(null);
  };

  const filteredModels = selectedBrand 
    ? DEVICES.filter(d => d.brand === selectedBrand)
    : [];

  const displayedProducts = React.useMemo(() => {
    let filtered = PRODUCTS;
    if (selectedBrand) {
        if (selectedModel) {
            filtered = filtered.filter(p => p.compatibility.includes(selectedModel) || p.compatibility.includes('Universal'));
        } else {
            const brandModels = DEVICES.filter(d => d.brand === selectedBrand).map(d => d.series);
            filtered = filtered.filter(p => 
                p.compatibility.includes('Universal') || 
                p.compatibility.some(c => brandModels.includes(c))
            );
        }
    }
    return filtered;
  }, [selectedBrand, selectedModel]);

  const bulkProducts = PRODUCTS.filter(p => p.isBulk);
  const generalShopProducts = PRODUCTS.slice(0, 8); 

  // --- COMPONENT: SMART DEVICE SELECTOR BOX ---
  const SmartDeviceSelector = () => {
      const [step, setStep] = useState<'brand' | 'model'>(selectedBrand ? 'model' : 'brand');

      useEffect(() => {
          if (!selectedBrand) setStep('brand');
      }, [selectedBrand]);

      const handleBrandClick = (brandId: any) => {
          setSelectedBrand(brandId);
          setStep('model');
      };

      const handleBack = () => {
          setStep('brand');
          setSelectedBrand(null);
          setSelectedModel(null);
      };

      const boxBorderColor = selectedBrand === 'Cochlear' ? 'border-[#FFC20E]' : selectedBrand === 'Advanced Bionics' ? 'border-[#00A4E4]' : selectedBrand === 'Med-El' ? 'border-[#C60C30]' : 'border-slate-100';
      const progressColor = selectedBrand === 'Cochlear' ? 'bg-[#FFC20E]' : selectedBrand === 'Advanced Bionics' ? 'bg-[#00A4E4]' : selectedBrand === 'Med-El' ? 'bg-[#C60C30]' : 'bg-accent';

      return (
          <div className={`w-full max-w-md bg-white rounded-[32px] shadow-card p-6 md:p-8 relative overflow-hidden min-h-[440px] flex flex-col transition-all duration-500 border-2 ${boxBorderColor}`}>
              <div className="flex justify-between items-center mb-6 z-10">
                  <h3 className="text-xl font-extrabold text-primary">
                      {step === 'brand' ? 'Select Device' : 'Select Model'}
                  </h3>
                  {step === 'model' && (
                      <button onClick={handleBack} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                          <RotateCcw size={16} className="text-slate-600"/>
                      </button>
                  )}
              </div>

              <div className="flex gap-2 mb-8 justify-center">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 'brand' ? `w-8 ${progressColor}` : 'w-2 bg-slate-200'}`}></div>
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 'model' ? `w-8 ${progressColor}` : 'w-2 bg-slate-200'}`}></div>
              </div>

              <div className="flex-1 relative">
                  <div className={`absolute inset-0 transition-all duration-500 transform ${step === 'brand' ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'}`}>
                      <p className="text-sm text-slate-500 mb-6 font-medium text-center">Choose your processor brand to see compatible parts.</p>
                      <div className="grid grid-cols-1 gap-3">
                          {[
                              { id: 'Advanced Bionics', color: 'hover:border-[#00A4E4] hover:shadow-[0_0_15px_rgba(0,164,228,0.3)]', logoColor: 'bg-[#00A4E4]', textColor: 'text-white' },
                              { id: 'Cochlear', color: 'hover:border-[#FFC20E] hover:shadow-[0_0_15px_rgba(255,194,14,0.3)]', logoColor: 'bg-[#FFC20E]', textColor: 'text-black' },
                              { id: 'Med-El', color: 'hover:border-[#C60C30] hover:shadow-[0_0_15px_rgba(198,12,48,0.3)]', logoColor: 'bg-[#C60C30]', textColor: 'text-white' }
                          ].map((brand) => (
                              <button 
                                key={brand.id}
                                onClick={() => handleBrandClick(brand.id)}
                                className={`group relative p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-white transition-all duration-300 flex items-center justify-between ${brand.color}`}
                              >
                                  <div className="flex items-center gap-3">
                                      <div className={`w-3 h-3 rounded-full ${brand.logoColor}`}></div>
                                      <span className="font-bold text-lg text-primary group-hover:text-primary">{brand.id}</span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:translate-x-1 transition-transform border border-slate-100">
                                      <ChevronRight size={16} className="text-slate-400 group-hover:text-primary"/>
                                  </div>
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className={`absolute inset-0 transition-all duration-500 transform ${step === 'model' ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
                       <div className="overflow-y-auto h-[300px] pr-2 pb-4 space-y-3 hide-scrollbar">
                           {filteredModels.map((model) => (
                               <div 
                                key={model.id}
                                onClick={() => setSelectedModel(selectedModel === model.series ? null : model.series)}
                                className={`
                                    cursor-pointer p-3 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group
                                    ${selectedModel === model.series 
                                        ? `border-current bg-slate-50 shadow-md ${selectedBrand === 'Cochlear' ? 'text-[#e6ac00]' : selectedBrand === 'Advanced Bionics' ? 'text-[#00A4E4]' : 'text-[#C60C30]'}` 
                                        : 'bg-white border-slate-100 hover:border-slate-300'
                                    }
                                `}
                               >
                                   <div className={`w-14 h-14 rounded-xl p-2 flex items-center justify-center border border-slate-100 ${selectedModel === model.series ? 'bg-white' : 'bg-slate-50'}`}>
                                       <img src={model.image} className="w-full h-full object-contain mix-blend-multiply" />
                                   </div>
                                   <div className="flex-1">
                                       <h4 className="font-bold text-sm text-primary">{model.name}</h4>
                                       <p className={`text-[10px] ${selectedModel === model.series ? 'text-slate-500' : 'text-slate-400'}`}>{model.description}</p>
                                   </div>
                                   {selectedModel === model.series && <CheckCircle size={20} className="fill-current"/>}
                               </div>
                           ))}
                       </div>
                  </div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full blur-3xl -z-10 opacity-50"></div>
              <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl -z-10 opacity-30 ${progressColor}`}></div>
          </div>
      );
  };

  const BrandsView = () => {
    const [viewBrand, setViewBrand] = useState<'Cochlear' | 'Advanced Bionics' | 'Med-El' | null>(null);
    const [viewModel, setViewModel] = useState<string | null>(null);

    const brands = [
        { id: 'Advanced Bionics', color: 'from-[#00A4E4] to-blue-600', text: 'text-[#00A4E4]', bg: 'bg-[#00A4E4]', border: 'border-[#00A4E4]', logo: 'AB' },
        { id: 'Cochlear', color: 'from-[#FFC20E] to-amber-500', text: 'text-[#FFC20E]', bg: 'bg-[#FFC20E]', border: 'border-[#FFC20E]', logo: 'C' },
        { id: 'Med-El', color: 'from-[#C60C30] to-red-600', text: 'text-[#C60C30]', bg: 'bg-[#C60C30]', border: 'border-[#C60C30]', logo: 'M' }
    ] as const;

    const currentModels = viewBrand ? DEVICES.filter(d => d.brand === viewBrand) : [];
    
    // Filter logic specifically for this page
    const brandProducts = React.useMemo(() => {
        if (!viewBrand) return [];
        let p = PRODUCTS.filter(prod => 
            prod.compatibility.includes('Universal') || 
            prod.compatibility.some(c => DEVICES.filter(d => d.brand === viewBrand).map(m => m.series).includes(c))
        );
        if (viewModel) {
            p = p.filter(prod => prod.compatibility.includes(viewModel) || prod.compatibility.includes('Universal'));
        }
        return p;
    }, [viewBrand, viewModel]);

    if (!viewBrand) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16 animate-slide-up">
                        <span className="text-accent font-bold tracking-widest text-sm uppercase mb-3 block">Official Partners</span>
                        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">Select Your Brand</h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Choose your manufacturer to access authorized replacement parts, cables, and batteries designed for your specific device.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {brands.map((b) => (
                            <div 
                                key={b.id}
                                onClick={() => setViewBrand(b.id)}
                                className="group cursor-pointer relative h-[450px] rounded-[40px] overflow-hidden bg-white border border-slate-100 shadow-card hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                <div className="absolute inset-0 p-10 flex flex-col items-center justify-center z-10">
                                    <div className={`w-28 h-28 rounded-3xl ${b.bg} text-white flex items-center justify-center text-4xl font-black shadow-lg mb-8 group-hover:bg-white group-hover:${b.text} group-hover:scale-110 transition-all duration-500`}>
                                        {b.logo}
                                    </div>
                                    <h2 className={`text-3xl font-bold text-primary text-center mb-2 group-hover:text-white transition-colors`}>{b.id}</h2>
                                    <span className="text-slate-400 font-medium group-hover:text-white/80 transition-colors mt-2">View All Processors &rarr;</span>
                                </div>
                                {/* Decorative Circles */}
                                <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full ${b.bg} opacity-5 group-hover:opacity-0 transition-opacity blur-3xl`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // DETAIL VIEW FOR A BRAND
    const brandTheme = brands.find(b => b.id === viewBrand)!;

    return (
        <div className="min-h-screen bg-background pt-32 pb-20">
             {/* Brand Header */}
             <div className="bg-white border-b border-slate-100 sticky top-[88px] z-30 shadow-sm">
                 <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <button onClick={() => { setViewBrand(null); setViewModel(null); }} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors">
                             <ArrowLeft size={24} />
                         </button>
                         <div className={`text-2xl font-black ${brandTheme.text}`}>{viewBrand}</div>
                     </div>
                     <div className="text-sm font-bold text-slate-400">
                         {brandProducts.length} Products
                     </div>
                 </div>
             </div>

             <div className="max-w-[1400px] mx-auto px-6 pt-12">
                 
                 {/* 1. PROCESSOR SELECTOR (The "Hero" of this page) */}
                 <div className="mb-16 animate-slide-up">
                     <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                         <Cpu size={20} className={brandTheme.text}/> Select Your Processor
                     </h2>
                     <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar">
                         <button 
                             onClick={() => setViewModel(null)}
                             className={`min-w-[140px] h-[160px] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 relative overflow-hidden group
                                 ${!viewModel ? `border-current ${brandTheme.text} bg-white shadow-lg` : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300'}
                             `}
                         >
                             <div className="w-16 h-16 mb-4 bg-slate-50 rounded-full flex items-center justify-center">
                                 <Grid size={24}/>
                             </div>
                             <span className="font-bold text-sm text-center">View All {viewBrand}</span>
                         </button>

                         {currentModels.map(model => (
                             <button 
                                 key={model.id}
                                 onClick={() => setViewModel(viewModel === model.series ? null : model.series)}
                                 className={`min-w-[160px] h-[160px] rounded-2xl border-2 flex flex-col items-center justify-center p-4 transition-all duration-300 relative overflow-hidden group shrink-0
                                     ${viewModel === model.series 
                                         ? `border-current ${brandTheme.text} bg-white shadow-lg ring-1 ring-offset-2 ring-${brandTheme.text}` 
                                         : 'border-slate-100 bg-white hover:border-blue-100 hover:shadow-md'
                                     }
                                 `}
                             >
                                 <div className="w-20 h-20 mb-3 relative">
                                     <img src={model.image} className="w-full h-full object-contain mix-blend-multiply" />
                                 </div>
                                 <span className={`font-bold text-sm ${viewModel === model.series ? 'text-primary' : 'text-slate-600'} text-center leading-tight`}>{model.name}</span>
                                 {viewModel === model.series && (
                                     <div className={`absolute top-2 right-2 w-5 h-5 rounded-full ${brandTheme.bg} text-white flex items-center justify-center`}>
                                         <Check size={12} strokeWidth={4}/>
                                     </div>
                                 )}
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* 2. PRODUCTS GRID */}
                 <div className="animate-fade-in">
                     <div className="flex items-center gap-3 mb-8">
                         <div className={`w-1 h-8 rounded-full ${brandTheme.bg}`}></div>
                         <h2 className="text-2xl font-bold text-primary">
                             {viewModel ? `Spare Parts for ${viewModel}` : `All ${viewBrand} Essentials`}
                         </h2>
                     </div>
                     
                     {brandProducts.length > 0 ? (
                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                             {/* Featured Banner (If no model selected) */}
                             {!viewModel && (
                                 <div className={`col-span-2 md:col-span-2 rounded-[24px] p-8 flex flex-col justify-center relative overflow-hidden text-white shadow-lg`}>
                                     <div className={`absolute inset-0 bg-gradient-to-br ${brandTheme.color}`}></div>
                                     <div className="relative z-10">
                                         <span className="font-bold text-white/80 uppercase tracking-widest text-xs mb-2 block">Best Sellers</span>
                                         <h3 className="text-3xl font-black mb-4">Stock Up & Save</h3>
                                         <p className="mb-6 opacity-90 max-w-sm">Get the best performance out of your {viewBrand} device with our certified premium batteries and cables.</p>
                                         <button className="bg-white text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors self-start">
                                             Browse Deals
                                         </button>
                                     </div>
                                     <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                                 </div>
                             )}

                             {brandProducts.map(p => (
                                 <ProductCard key={p.id} product={p} onAdd={(prod) => addToCart(prod, prod.options?.colors?.[0]?.name, prod.options?.sizes?.[0], prod.options?.capacities?.[0])} onClick={navigateToProduct}/>
                             ))}
                         </div>
                     ) : (
                         <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                             <p className="text-slate-400 text-lg">No compatible products found for this selection.</p>
                             <button onClick={() => setViewModel(null)} className={`mt-4 ${brandTheme.text} font-bold hover:underline`}>View all products</button>
                         </div>
                     )}
                 </div>

             </div>
        </div>
    );
  };

  const SupportView = () => {
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const faqs = [
        { id: '1', q: 'How do I know if a cable fits my processor?', a: 'We have a "Compatibility" filter on our store. Select your brand (Cochlear, AB, Med-El) and then your specific model (e.g., Nucleus 7). We only show parts that fit.' },
        { id: '2', q: 'Do you accept HSA/FSA cards?', a: 'Yes! Most of our replacement parts like batteries, cables, and drying kits are eligible expenses. Look for the "FSA Eligible" badge on products.' },
        { id: '3', q: 'What is the warranty on cables?', a: 'All our cables come with a standard 90-day warranty against manufacturing defects. Premium reinforced cables have a 6-month warranty.' },
        { id: '4', q: 'How long does shipping take?', a: 'We ship orders within 24 hours. Standard shipping takes 3-5 business days. Express options are available at checkout.' },
    ];

    return (
        <div className="min-h-screen bg-background pt-[140px] pb-20">
            {/* Hero */}
            <div className="bg-primary text-white py-20 px-6 relative overflow-hidden">
                <div className="max-w-[1000px] mx-auto text-center relative z-10 animate-slide-up">
                    <h1 className="text-4xl md:text-6xl font-black mb-6">How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto">
                        <input 
                            type="text" 
                            placeholder="Search for help (e.g., 'Return Policy', 'Battery Life')..." 
                            className="w-full h-16 pl-14 pr-6 rounded-full text-slate-800 text-lg font-medium shadow-2xl focus:outline-none focus:border-accent"
                        />
                        <Search className="absolute left-5 top-5 text-slate-400" size={24}/>
                    </div>
                </div>
                {/* Abstract BG */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-medical rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 -mt-12 relative z-20">
                {/* Quick Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-in">
                    {[
                        { title: 'Track Order', icon: Truck, desc: 'Check shipping status' },
                        { title: 'Returns', icon: RotateCcw, desc: 'Start a return or exchange' },
                        { title: 'Product Guides', icon: BookOpen, desc: 'Manuals & tutorials' },
                        { title: 'Warranty', icon: ShieldCheck, desc: 'File a claim' },
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-card border border-slate-100 hover:-translate-y-1 transition-transform cursor-pointer group">
                            <div className="w-14 h-14 bg-blue-50 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                                <card.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">{card.title}</h3>
                            <p className="text-slate-400 text-sm font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                    <div className="lg:col-span-4">
                        <h2 className="text-3xl font-black text-primary mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500 mb-8">Can't find what you're looking for? Chat with our AI assistant or contact support.</p>
                        <button className="bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
                            View All FAQ <ArrowRight size={18}/>
                        </button>
                    </div>
                    <div className="lg:col-span-8 space-y-4">
                        {faqs.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-bold text-primary text-lg">{item.q}</span>
                                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === item.id ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === item.id && (
                                    <div className="px-6 pb-6 text-slate-500 leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/50">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Banner */}
                <div className="bg-gradient-to-r from-primary to-slate-900 rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20 text-white">
                            <MessageSquare size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Still need help?</h2>
                        <p className="text-slate-300 max-w-xl mx-auto mb-10 text-lg">Our experts are available Mon-Fri, 9am - 5pm EST. Or try our AI Assistant for instant answers 24/7.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
                                Email Support
                            </button>
                            <button className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg border border-white/10">
                                Call 1-800-HEAR-NOW
                            </button>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-medical/20 rounded-full blur-[80px]"></div>
                </div>
            </div>
        </div>
    );
  };

  const HomeView = () => (
    <main className="min-h-screen bg-background">
      
      {/* 1. HERO SECTION (Wider Spacing) */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Left: Text */}
             <div className="animate-slide-up z-10">
                 <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-1.5 rounded-full shadow-sm mb-8">
                     <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                     <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">Official Medical Spares</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.95] tracking-tight mb-8">
                     Hear <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-medical">Everything.</span>
                 </h1>
                 <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed mb-10">
                     The most trusted medical marketplace for cochlear implant accessories. Certified parts, rapid delivery, and expert support.
                 </p>
                 
                 {/* Trust indicators */}
                 <div className="flex items-center gap-6">
                     <div className="flex -space-x-4">
                         {[1,2,3,4].map(i => (
                             <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full object-cover"/>
                             </div>
                         ))}
                     </div>
                     <div className="flex flex-col">
                         <div className="flex text-amber-400 text-xs gap-0.5">{'★'.repeat(5)}</div>
                         <span className="text-xs font-bold text-slate-400">Trusted by 2,000+ patients</span>
                     </div>
                 </div>
             </div>

             {/* Right: The Creative Box */}
             <div className="flex justify-center lg:justify-end animate-fade-in relative z-10">
                 <SmartDeviceSelector />
             </div>
         </div>
         
         {/* Background Ambience */}
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-[120px] -z-0 opacity-70 pointer-events-none"></div>
      </section>

      {/* 2. CATEGORY PILLS */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 overflow-x-auto hide-scrollbar">
          <div className="flex gap-6 min-w-max pb-2">
              {CATEGORIES.map((cat, idx) => (
                  <button key={idx} className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group min-w-[200px]">
                      <div className={`p-3 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-accent group-hover:text-white transition-colors`}>
                           {cat.id === 'power' && <Battery size={24}/>}
                           {cat.id === 'connect' && <Cable size={24}/>}
                           {cat.id === 'care' && <Droplets size={24}/>}
                           {cat.id === 'go' && <Wifi size={24}/>}
                      </div>
                      <div className="text-left">
                          <div className="font-bold text-base text-primary">{cat.name}</div>
                          <div className="text-xs text-slate-400 font-medium">{cat.subTitle}</div>
                      </div>
                  </button>
              ))}
          </div>
      </div>

      {/* 3. DYNAMIC CONTENT AREA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 min-h-[500px]">
          {selectedBrand || selectedModel ? (
              // FILTERED VIEW
              <div className="animate-slide-up">
                  <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
                      <div>
                          <h2 className="text-3xl font-bold text-primary mb-2">Compatible Parts</h2>
                          <p className="text-slate-500">Showing results for <strong className="text-accent">{selectedBrand} {selectedModel}</strong></p>
                      </div>
                      <button onClick={resetFilters} className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                          Clear Filters
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                      {displayedProducts.map(p => (
                          <ProductCard key={p.id} product={p} onAdd={(prod) => addToCart(prod, prod.options?.colors?.[0]?.name, prod.options?.sizes?.[0], prod.options?.capacities?.[0])} onClick={navigateToProduct}/>
                      ))}
                  </div>
              </div>
          ) : (
              // DEFAULT VIEW (Trending + Bulk)
              <>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <Activity size={28} className="text-accent"/> Trending Now
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-32">
                    {generalShopProducts.map(p => (
                        <ProductCard key={p.id} product={p} onAdd={(prod) => addToCart(prod, prod.options?.colors?.[0]?.name, prod.options?.sizes?.[0], prod.options?.capacities?.[0])} onClick={navigateToProduct}/>
                    ))}
                </div>

                {/* Modern Bulk Section */}
                <div className="bg-primary rounded-[40px] p-8 md:p-16 relative overflow-hidden mb-32 shadow-xl shadow-blue-900/20">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                    <div className="absolute -left-20 -top-20 w-96 h-96 bg-accent rounded-full blur-[100px] opacity-30"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
                        <div className="lg:col-span-1">
                            <span className="text-amber-400 font-bold tracking-widest text-xs uppercase mb-3 block">For Clinics & Power Users</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Bulk Savings.</h2>
                            <p className="text-slate-300 mb-8 text-lg leading-relaxed">Secure your yearly supply of batteries and care items. Up to 30% off retail prices.</p>
                            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">View All Bundles</button>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {bulkProducts.map(p => (
                                <div key={p.id} onClick={() => navigateToProduct(p)} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-5 hover:bg-white/10 transition-all cursor-pointer group">
                                    <div className="w-24 h-24 bg-white rounded-2xl p-2 shrink-0 shadow-lg">
                                        <img src={p.image} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl mb-1">{p.name}</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-amber-400 font-bold text-2xl">${p.price}</span>
                                            <span className="text-slate-500 line-through text-base">${p.originalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                        <Plus size={24}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BLOG SECTION */}
                <div className="mb-24">
                   <div className="flex justify-between items-center mb-10">
                       <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                           <BookOpen size={28} className="text-accent"/> Latest Insights
                       </h2>
                       <button className="text-slate-500 hover:text-accent font-bold text-sm">View All Articles</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {BLOGS.map((blog) => (
                           <div key={blog.id} className="group cursor-pointer">
                               <div className="overflow-hidden rounded-3xl mb-4 relative aspect-[4/3]">
                                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                                   <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                   <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary">
                                       {blog.category}
                                   </div>
                               </div>
                               <h3 className="font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors leading-tight">
                                   {blog.title}
                               </h3>
                               <p className="text-slate-500 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                               <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                   <span>{blog.date}</span>
                                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                   <span>{blog.readTime}</span>
                               </div>
                           </div>
                       ))}
                   </div>
                </div>
              </>
          )}
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">C</div>
                  <span className="font-bold text-2xl text-primary">CochlearSpare</span>
              </div>
              <div className="flex gap-10 mb-10 text-base text-slate-500 font-semibold">
                  <a href="#" className="hover:text-accent transition-colors">Shop</a>
                  <a href="#" className="hover:text-accent transition-colors">About</a>
                  <a href="#" className="hover:text-accent transition-colors">Clinics</a>
                  <a href="#" className="hover:text-accent transition-colors">Terms</a>
              </div>
              <div className="text-slate-300 text-sm">
                  © 2024 CochlearSpare. All rights reserved.
              </div>
          </div>
      </footer>
    </main>
  );

  const ProductDetailView = () => {
    if(!selectedProduct) return null;

    const [selectedColor, setSelectedColor] = useState(selectedProduct.options?.colors?.[0]?.name);
    const [selectedSize, setSelectedSize] = useState(selectedProduct.options?.sizes?.[0]);
    const [selectedCapacity, setSelectedCapacity] = useState(selectedProduct.options?.capacities?.[0]);
    const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

    const handleAddToCart = () => {
        addToCart(selectedProduct, selectedColor, selectedSize, selectedCapacity);
    };

    return (
        <div className="bg-background min-h-screen pt-[160px] pb-20 animate-fade-in">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <button onClick={() => setActivePage(Page.HOME)} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <ArrowLeft size={16}/> Back to Store
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                    {/* Left: Gallery */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-[40px] p-12 flex items-center justify-center h-[500px] md:h-[600px] shadow-soft border border-slate-100 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-radial-gradient from-blue-50 to-transparent opacity-50"></div>
                            <img src={selectedProduct.image} className="w-full h-full object-contain mix-blend-multiply z-10 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                    
                    {/* Right: Info */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 flex items-center gap-2">
                             {selectedProduct.badge && (
                                <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm shadow-blue-200">
                                    {selectedProduct.badge}
                                </span>
                             )}
                             {selectedProduct.isHsaEligible && (
                                <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">FSA Eligible</span>
                             )}
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-6 leading-tight tracking-tight">{selectedProduct.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl lg:text-5xl font-bold text-primary">${selectedProduct.price}</span>
                            {selectedProduct.originalPrice && <span className="text-2xl text-slate-400 line-through">${selectedProduct.originalPrice}</span>}
                            <div className="ml-auto flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1 rounded-full">
                                <Star size={16} className="fill-amber-400 text-amber-400"/>
                                <span className="font-bold text-sm text-primary">{selectedProduct.rating}</span>
                                <span className="text-slate-400 text-xs">({selectedProduct.reviews})</span>
                            </div>
                        </div>

                        {/* SALES HOOK - Highlighting */}
                        {selectedProduct.salesHook && (
                            <div className="mb-10 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl animate-fade-in">
                                <p className="text-accent font-bold text-xl leading-snug">
                                    {selectedProduct.salesHook}
                                </p>
                            </div>
                        )}

                        <div className="h-px w-full bg-slate-100 mb-10"></div>

                        {/* Options Section */}
                        <div className="space-y-8 mb-12">
                            {/* Capacity (Batteries) */}
                            {selectedProduct.options?.capacities && (
                                <div>
                                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-3">Select Power Capacity</label>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProduct.options.capacities.map((cap) => (
                                            <button
                                                key={cap}
                                                onClick={() => setSelectedCapacity(cap)}
                                                className={`px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center gap-2 ${selectedCapacity === cap ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-slate-600 border-slate-100 hover:border-primary'}`}
                                            >
                                                <Zap size={16} className={selectedCapacity === cap ? "text-yellow-400" : "text-slate-400"} />
                                                {cap}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colors */}
                            {selectedProduct.options?.colors && (
                                <div>
                                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-3">Select Color</label>
                                    <div className="flex gap-4">
                                        {selectedProduct.options.colors.map((color) => (
                                            <button
                                                key={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-primary scale-110 shadow-lg' : 'hover:scale-110 shadow-sm border border-slate-200'}`}
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            >
                                                {selectedColor === color.name && <Check size={20} className={color.hex === '#FFFFFF' || color.hex === '#E2E8F0' ? 'text-black' : 'text-white'}/>}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 font-medium">Selected: {selectedColor}</p>
                                </div>
                            )}
                            
                            {/* Sizes */}
                            {selectedProduct.options?.sizes && (
                                <div>
                                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-3">Select Length</label>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProduct.options.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-4 rounded-xl text-sm font-bold border-2 transition-all min-w-[80px] ${selectedSize === size ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-slate-600 border-slate-100 hover:border-primary'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mb-8">
                            <button onClick={handleAddToCart} className="flex-1 bg-accent text-white h-16 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-95">
                                <span className="bg-white/20 p-2 rounded-lg"><Plus size={20}/></span> Add to Cart
                            </button>
                            <button className="w-16 h-16 rounded-2xl border-2 border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-red-500 hover:border-red-100">
                                <Heart size={24} className="fill-current"/>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pb-8">
                             <div className="flex flex-col items-center text-center gap-2">
                                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100"><Truck size={18}/></div>
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">Fast Shipping</span>
                             </div>
                             <div className="flex flex-col items-center text-center gap-2">
                                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100"><ShieldCheck size={18}/></div>
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">Secure Pay</span>
                             </div>
                             <div className="flex flex-col items-center text-center gap-2">
                                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-100"><Award size={18}/></div>
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">Warranty</span>
                             </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mt-4">
                            <div className="flex gap-8 border-b border-slate-100 mb-8">
                                <button onClick={() => setActiveTab('details')} className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'details' ? 'border-accent text-accent' : 'border-transparent text-slate-400'}`}>Description</button>
                                <button onClick={() => setActiveTab('reviews')} className={`pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'reviews' ? 'border-accent text-accent' : 'border-transparent text-slate-400'}`}>Reviews</button>
                            </div>
                            
                            <div className="min-h-[150px] text-slate-600 leading-relaxed text-base animate-fade-in">
                                {activeTab === 'details' ? (
                                    <>
                                        <p className="mb-6">{selectedProduct.longDescription || selectedProduct.description}</p>
                                        {selectedProduct.features && (
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                {selectedProduct.features.map(f => (
                                                    <li key={f} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"><div className="w-2 h-2 bg-accent rounded-full"></div>{f}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <div className="space-y-6">
                                        {[1,2].map(i => (
                                            <div key={i} className="bg-slate-50 p-6 rounded-2xl">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-bold text-primary">Verified Buyer</span>
                                                    <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                                                </div>
                                                <p className="text-slate-600">Perfect fit for my device. Shipping was surprisingly fast.</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
  };

  const CartView = () => (
      <div className="bg-background min-h-screen pt-[160px] pb-20 px-6 animate-fade-in">
          <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-black mb-8 text-primary">Your Cart ({cartCount})</h1>
              {cart.length === 0 ? (
                  <div className="bg-white rounded-[32px] p-16 text-center border border-slate-100 shadow-card">
                      <div className="w-20 h-20 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                          <ShoppingCart size={32}/>
                      </div>
                      <h2 className="text-xl font-bold text-primary mb-2">Your cart is empty</h2>
                      <p className="text-slate-400 mb-8">Looks like you haven't added any parts yet.</p>
                      <button onClick={() => setActivePage(Page.HOME)} className="bg-accent text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">Start Shopping</button>
                  </div>
              ) : (
                  <div className="space-y-6">
                      {cart.map((item, idx) => (
                          <div key={idx} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 group hover:border-blue-100 transition-colors">
                              <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 shrink-0 border border-slate-100">
                                  <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                              </div>
                              <div className="flex-1">
                                  <h3 className="font-bold text-primary text-lg">{item.name}</h3>
                                  <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-2">
                                      {item.selectedCapacity && <span className="bg-slate-100 px-2 py-0.5 rounded text-xs flex items-center gap-1"><Zap size={10} /> {item.selectedCapacity}</span>}
                                      {item.selectedColor && <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">Color: {item.selectedColor} </span>}
                                      {item.selectedSize && <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">Size: {item.selectedSize}</span>}
                                  </div>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                  <span className="font-bold text-xl text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                  <div className="flex items-center gap-4 bg-slate-50 rounded-full px-4 py-2 border border-slate-100">
                                      <button onClick={() => {
                                          if(item.quantity > 1) {
                                              const newCart = [...cart];
                                              newCart[idx].quantity--;
                                              setCart(newCart);
                                          } else {
                                              removeFromCart(idx);
                                          }
                                      }} className="text-slate-400 hover:text-primary"><Minus size={14}/></button>
                                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                      <button onClick={() => {
                                          const newCart = [...cart];
                                          newCart[idx].quantity++;
                                          setCart(newCart);
                                      }} className="text-slate-400 hover:text-primary"><Plus size={14}/></button>
                                  </div>
                              </div>
                          </div>
                      ))}
                      <div className="bg-white p-8 rounded-3xl shadow-card mt-8 sticky bottom-6 border border-slate-100">
                          <div className="flex justify-between items-center mb-6">
                              <span className="text-slate-500 font-medium">Subtotal</span>
                              <span className="text-3xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                          </div>
                          <button onClick={() => { setActivePage(Page.CHECKOUT); window.scrollTo(0,0); }} className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                             Checkout Securely <ArrowRight size={20} />
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );

  const CheckoutView = () => (
      <div className="bg-background min-h-screen pt-[160px] pb-20 px-6 animate-fade-in">
          <div className="max-w-[1200px] mx-auto">
              <button onClick={() => setActivePage(Page.CART)} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors text-sm">
                  <ArrowLeft size={16}/> Back to Cart
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Left: Form */}
                  <div className="lg:col-span-7 space-y-8">
                      <h1 className="text-3xl font-black mb-8 text-primary">Checkout</h1>
                      
                      {/* Contact Info */}
                      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-accent flex items-center justify-center"><User size={18}/></div>
                              Contact Information
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                                  <div className="relative">
                                      <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                      <input type="email" placeholder="you@email.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent font-medium text-primary" />
                                  </div>
                              </div>
                              <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary" />
                              </div>
                              <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
                                  <div className="relative">
                                      <Phone className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                      <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent font-medium text-primary" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-accent flex items-center justify-center"><MapPin size={18}/></div>
                              Shipping Address
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Street Address</label>
                                  <input type="text" placeholder="123 Medical Park Blvd" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">City</label>
                                  <input type="text" placeholder="New York" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">State / Province</label>
                                  <input type="text" placeholder="NY" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Zip Code</label>
                                  <input type="text" placeholder="10001" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary" />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Country</label>
                                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-accent font-medium text-primary">
                                      <option>United States</option>
                                      <option>Canada</option>
                                      <option>United Kingdom</option>
                                      <option>Australia</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right: Summary */}
                  <div className="lg:col-span-5">
                      <div className="bg-white p-8 rounded-[32px] shadow-card border border-slate-100 sticky top-32">
                          <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
                          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                              {cart.map((item, idx) => (
                                  <div key={idx} className="flex gap-4 items-center">
                                      <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 border border-slate-100 shrink-0 relative">
                                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{item.quantity}</span>
                                          <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                          <h4 className="font-bold text-sm text-primary truncate">{item.name}</h4>
                                          <p className="text-xs text-slate-400 truncate">
                                              {item.selectedCapacity || item.selectedSize || item.selectedColor || 'Standard'}
                                          </p>
                                      </div>
                                      <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                              ))}
                          </div>
                          
                          <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                              <div className="flex justify-between text-slate-500 text-sm">
                                  <span>Subtotal</span>
                                  <span>${cartTotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-slate-500 text-sm">
                                  <span>Shipping</span>
                                  <span className="text-emerald-600 font-bold">Free</span>
                              </div>
                              <div className="flex justify-between text-primary font-black text-xl pt-2">
                                  <span>Total</span>
                                  <span>${cartTotal.toFixed(2)}</span>
                              </div>
                          </div>

                          <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                             <CreditCard size={20} /> Pay Now
                          </button>
                          
                          <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
                              <Lock size={12}/> Secure 256-bit SSL Encrypted Payment
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans text-primary selection:bg-accent selection:text-white">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => { setActivePage(Page.CART); window.scrollTo(0,0); }}
        onHomeClick={() => { setActivePage(Page.HOME); window.scrollTo(0,0); resetFilters(); }}
        onBrandsClick={() => { setActivePage(Page.BRANDS); window.scrollTo(0,0); }}
        onSupportClick={() => { setActivePage(Page.SUPPORT); window.scrollTo(0,0); }}
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onSearch={(q) => console.log(q)}
        isScrolled={isScrolled}
        userCountry={userCountry}
      />

      {activePage === Page.HOME && <HomeView />}
      {activePage === Page.PRODUCT_DETAIL && <ProductDetailView />}
      {activePage === Page.CART && <CartView />}
      {activePage === Page.CHECKOUT && <CheckoutView />}
      {activePage === Page.BRANDS && <BrandsView />}
      {activePage === Page.SUPPORT && <SupportView />}

      <GeminiAssistant />
    </div>
  );
};

export default App;


import React from 'react';
import { ShoppingCart, Menu, User, Search, X, Globe } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onBrandsClick: () => void;
  onSupportClick: () => void;
  onMenuClick: () => void;
  onSearch: (query: string) => void;
  isScrolled?: boolean;
  userCountry?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onHomeClick, onBrandsClick, onSupportClick, onMenuClick, onSearch, isScrolled, userCountry }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSearch(false);
  };

  return (
    <>
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col ${isScrolled ? 'shadow-sm' : ''}`}>
        
        {/* SHIPPING TOP BAR - IP BASED */}
        <div className="bg-primary text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold tracking-wider relative z-50 border-b border-white/10">
            <div className="flex items-center justify-center gap-2 animate-fade-in">
                <Globe size={12} className="text-accent animate-pulse-slow"/> 
                <span>
                    {userCountry ? `We ship to ${userCountry} ✈️` : 'Worldwide Shipping ✈️'} 
                    <span className="opacity-70 mx-2 hidden sm:inline">|</span> 
                    <span className="opacity-90 font-medium">Free express delivery on orders over $150</span>
                </span>
            </div>
        </div>

        {/* MAIN NAV */}
        <header className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg py-3 border-b border-blue-50' : 'bg-transparent py-5'}`}>
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
            
            {/* Left: Logo */}
            <div onClick={onHomeClick} className="cursor-pointer flex items-center gap-2 group z-20">
                <div className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                    C
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-xl leading-none tracking-tight text-primary">Cochlear<span className="text-medical">Spare</span></span>
                </div>
            </div>

            {/* Center: Minimal Nav (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <button onClick={onHomeClick} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Store</button>
                <button onClick={onBrandsClick} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Brands</button>
                <button onClick={onSupportClick} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Support</button>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 z-20">
                <button 
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2.5 rounded-full hover:bg-blue-50 text-slate-600 hover:text-accent transition-colors"
                >
                    <Search size={20} />
                </button>

                <button 
                    onClick={onCartClick}
                    className="relative bg-primary text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 group"
                >
                    <ShoppingCart size={18} />
                    <span className="font-bold text-xs">${0}</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </button>
                
                <button onClick={onMenuClick} className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-800">
                    <Menu size={24} />
                </button>
            </div>
          </div>
        </header>
    </div>
    
    {/* Search Overlay */}
    {showSearch && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4 animate-fade-in">
            <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"><X size={24}/></button>
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative">
                <input 
                    type="text"
                    placeholder="Search part number, device..."
                    className="w-full text-2xl md:text-4xl font-bold bg-transparent border-b-2 border-slate-200 py-4 focus:outline-none focus:border-accent placeholder-slate-300 text-primary"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-0 bottom-4 text-accent font-bold text-lg hover:opacity-80">Search</button>
            </form>
        </div>
    )}
    </>
  );
};

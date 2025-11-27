
import React from 'react';
import { Product } from '../types';
import { Check, Box, SlidersHorizontal, Zap, Ruler } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onClick }) => {
  const [isAdded, setIsAdded] = React.useState(false);

  // Check if product has variations
  const hasColors = product.options?.colors && product.options.colors.length > 0;
  const hasSizes = product.options?.sizes && product.options.sizes.length > 0;
  const hasCapacities = product.options?.capacities && product.options.capacities.length > 0;
  const hasOptions = hasColors || hasSizes || hasCapacities;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (hasOptions) {
      // If product has options, go to detail page to select them
      onClick(product);
    } else {
      // If simple product, add to cart immediately
      onAdd(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  return (
    <div className={`group bg-white rounded-[24px] p-4 md:p-5 flex flex-col h-full border transition-all duration-300 cursor-pointer relative overflow-hidden ${product.isBulk ? 'border-amber-200 shadow-soft' : 'border-slate-100 hover:border-blue-200 hover:shadow-card'}`}>
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.badge && (
          <span className={`text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm ${product.isBulk ? 'bg-amber-400 text-black' : 'bg-accent text-white'}`}>
            {product.badge}
          </span>
        )}
        {product.isHsaEligible && (
            <span className="hidden md:inline-block bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-1 rounded-lg border border-emerald-100">
                FSA/HSA
            </span>
        )}
      </div>
      
      {/* Image Area */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100" onClick={() => onClick(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply p-4" 
        />
        {product.isBulk && (
            <div className="absolute bottom-2 right-2 bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Box size={12} /> <span className="hidden md:inline">Bulk</span>
            </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div onClick={() => onClick(product)}>
            
            {/* Price Row */}
            <div className="flex flex-col mb-3">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xl md:text-2xl font-black text-primary tracking-tight">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="text-xs md:text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                </div>
                {product.unitPrice && (
                    <span className="text-[10px] md:text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded self-start mt-1">
                        {product.unitPrice}
                    </span>
                )}
            </div>

            {/* VARIATIONS VISUAL INDICATORS (New Section) */}
            {hasOptions && (
                <div className="flex flex-wrap items-center gap-2 mb-3 min-h-[22px]">
                    {/* Tech Spec Tags */}
                    {hasCapacities && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1 border border-blue-100">
                            <Zap size={10} className="fill-blue-600"/> {product.options!.capacities!.length} Capacities
                        </span>
                    )}
                    {hasSizes && (
                         <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1 border border-slate-200">
                            <Ruler size={10} /> {product.options!.sizes!.length} Sizes
                         </span>
                    )}

                    {/* Color Dots */}
                    {hasColors && (
                        <div className="flex items-center -space-x-1.5 ml-1">
                            {product.options!.colors!.slice(0, 4).map((c, idx) => (
                                <div 
                                    key={idx} 
                                    className="w-4 h-4 rounded-full border border-slate-200 shadow-sm ring-2 ring-white"
                                    style={{ backgroundColor: c.hex }}
                                    title={c.name}
                                />
                            ))}
                            {product.options!.colors!.length > 4 && (
                                <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 ring-2 ring-white">
                                    +
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <h3 className="text-sm md:text-[15px] font-bold text-slate-800 leading-snug mb-2 hover:text-accent transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
            </h3>

            <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-amber-400 text-[10px] md:text-xs">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-[10px] md:text-xs text-slate-400 font-medium">({product.reviews})</span>
            </div>
        </div>

        {/* Dynamic Action Button */}
        <button 
            onClick={handleAction}
            className={`mt-auto w-full py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 flex items-center justify-center gap-2
                ${isAdded 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-95' 
                    : hasOptions 
                        ? 'bg-slate-50 border-2 border-slate-200 text-primary hover:border-accent hover:text-accent' // Style for "Select Options"
                        : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-blue-200' // Style for "Add to Cart"
                }`}
        >
            {isAdded ? (
                <>
                    <Check size={16} strokeWidth={3} />
                    <span className="hidden sm:inline">Added</span>
                </>
            ) : hasOptions ? (
                <>
                    <SlidersHorizontal size={14} />
                    <span>Select Options</span>
                </>
            ) : (
                <>
                    Add to Cart
                </>
            )}
        </button>
      </div>
    </div>
  );
};

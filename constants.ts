
import { Product, Category, DeviceModel, BlogPost } from './types';

export const DEVICES: DeviceModel[] = [
    // --- Advanced Bionics (Requested First) ---
    { id: 'harmony', brand: 'Advanced Bionics', name: 'AB Harmony', series: 'Harmony', image: 'https://picsum.photos/seed/harmony/400/400', description: 'Proven reliability.' },
    { id: 'naida_q30', brand: 'Advanced Bionics', name: 'Naida CI Q30', series: 'Naida Q30', image: 'https://picsum.photos/seed/q30/400/400', description: 'Essential hearing.' },
    { id: 'naida_q70', brand: 'Advanced Bionics', name: 'Naida CI Q70', series: 'Naida Q70', image: 'https://picsum.photos/seed/q70/400/400', description: 'Advanced features.' },
    { id: 'naida_q90', brand: 'Advanced Bionics', name: 'Naida CI Q90', series: 'Naida Q90', image: 'https://picsum.photos/seed/q90/400/400', description: 'Industry-leading performance.' },
    { id: 'marvel', brand: 'Advanced Bionics', name: 'Marvel CI', series: 'Marvel', image: 'https://picsum.photos/seed/marvel/400/400', description: 'Universal Bluetooth connectivity.' },

    // --- Cochlear ---
    { id: 'freedom', brand: 'Cochlear', name: 'Freedom', series: 'Freedom', image: 'https://picsum.photos/seed/free/400/400', description: 'Classic durability.' },
    { id: 'n5', brand: 'Cochlear', name: 'Nucleus 5', series: 'N5', image: 'https://picsum.photos/seed/n5/400/400', description: 'Robust & Water resistant.' },
    { id: 'n6', brand: 'Cochlear', name: 'Nucleus 6', series: 'N6', image: 'https://picsum.photos/seed/n6/400/400', description: 'Smart sound processing.' },
    { id: 'n7', brand: 'Cochlear', name: 'Nucleus 7', series: 'N7', image: 'https://picsum.photos/seed/n7/400/400', description: 'Made for iPhone & Android.' },
    { id: 'n8', brand: 'Cochlear', name: 'Nucleus 8', series: 'N8', image: 'https://picsum.photos/seed/n8/400/400', description: 'Smaller. Smarter. Connected.' },
    
    // --- Med-El ---
    { id: 'opus1', brand: 'Med-El', name: 'Opus 1', series: 'Opus 1', image: 'https://picsum.photos/seed/opus1/400/400', description: 'The original.' },
    { id: 'opus2', brand: 'Med-El', name: 'Opus 2', series: 'Opus 2', image: 'https://picsum.photos/seed/opus2/400/400', description: 'Versatile control.' },
    { id: 'sonnet1', brand: 'Med-El', name: 'Sonnet 1', series: 'Sonnet 1', image: 'https://picsum.photos/seed/sonnet1/400/400', description: 'Natural hearing.' },
    { id: 'sonnet2', brand: 'Med-El', name: 'Sonnet 2', series: 'Sonnet 2', image: 'https://picsum.photos/seed/sonnet2/400/400', description: 'Made for you.' },
];

// Note: Icons are handled in the component mapping now for flexibility
export const CATEGORIES: Category[] = [
  { id: 'power', name: 'Power', subTitle: 'Batteries & Chargers', icon: 'Battery', color: 'bg-green-100 text-green-600' },
  { id: 'connect', name: 'Connect', subTitle: 'Cables & Coils', icon: 'Cable', color: 'bg-blue-100 text-blue-600' },
  { id: 'care', name: 'Care', subTitle: 'Drying & Protection', icon: 'Droplets', color: 'bg-cyan-100 text-cyan-600' },
  { id: 'go', name: 'Go', subTitle: 'Wireless Accessories', icon: 'Wifi', color: 'bg-purple-100 text-purple-600' },
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Don\'t Let a Dead Battery Silence Your World',
    excerpt: 'The average user loses 300 hours of hearing a year due to poor battery management. Here is how to reclaim your time.',
    content: 'Full article content...',
    image: 'https://picsum.photos/seed/blog1/600/400',
    author: 'Expert Team',
    date: 'Oct 12, 2023',
    readTime: '3 min read',
    category: 'Expert Advice'
  },
  {
    id: 'b2',
    title: 'Why "Cheap" Cables Are Costing You More',
    excerpt: 'Intermittent sound? Static? It might not be your processor. Discover why original cables are critical for signal clarity.',
    content: 'Full article content...',
    image: 'https://picsum.photos/seed/blog2/600/400',
    author: 'Tech Support',
    date: 'Sep 28, 2023',
    readTime: '4 min read',
    category: 'Product Reality'
  },
  {
    id: 'b3',
    title: 'Summer is Coming: Is Your Processor Ready?',
    excerpt: 'Sweat and humidity are the silent killers of electronics. The $15 investment that saves you a $2000 repair.',
    content: 'Full article content...',
    image: 'https://picsum.photos/seed/blog3/600/400',
    author: 'Lifestyle Team',
    date: 'Aug 15, 2023',
    readTime: '2 min read',
    category: 'Protection'
  }
];

export const PRODUCTS: Product[] = [
  // --- BULK DEALS (Strategic Hooks) ---
  {
    id: 'bulk_p675_300',
    name: 'PowerOne Implant Plus - Year Supply (300 Cells)',
    description: 'Never run out again. The ultimate bulk saver pack.',
    salesHook: 'Stop buying batteries every month. Save 30% and secure your hearing for a full year today.',
    longDescription: 'Secure your hearing for a whole year. This master carton contains 5 boxes of 60 cells each. Guaranteed fresh dates.',
    features: ['Save 25% vs single packs', 'Freshness Guaranteed (3+ Years Expiry)', 'Priority Free Shipping'],
    specs: { 'Quantity': '300 Cells', 'Type': 'P675', 'Brand': 'PowerOne' },
    price: 199.00,
    originalPrice: 275.00,
    rating: 5.0,
    reviews: 89,
    image: 'https://picsum.photos/seed/bulk300/400/400',
    category: 'Batteries',
    badge: 'Mega Saver',
    compatibility: ['Universal'], 
    isHsaEligible: true,
    isBulk: true,
    unitPrice: '$0.66 / cell'
  },
  {
    id: 'bulk_dry_kit',
    name: 'Ultimate Care Bundle: Drying Kit + 24 Bricks',
    description: 'Complete moisture protection system for 12 months.',
    salesHook: 'Moisture is the #1 cause of processor failure. Protect your $10,000 device for just pennies a day.',
    price: 65.00,
    originalPrice: 85.00,
    rating: 4.8,
    reviews: 34,
    image: 'https://picsum.photos/seed/drybundle/400/400',
    category: 'Drying Care',
    badge: 'Bundle Deal',
    compatibility: ['Universal'],
    isHsaEligible: true,
    isBulk: true
  },

  // --- Batteries ---
  {
    id: 'b1',
    name: 'PowerOne Implant Plus P675 - Box of 60',
    description: 'High power zinc air batteries. The gold standard.',
    salesHook: 'The world\'s most reliable implant battery. Consistent power for high-demand processors.',
    longDescription: 'Zinc Air batteries designed specifically for cochlear implants. These provide high energy density for consistent performance.',
    features: ['Mercury Free', 'High Energy Density', 'Long shelf life'],
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.9,
    reviews: 1240,
    image: 'https://picsum.photos/seed/p675/400/400',
    category: 'Batteries',
    badge: 'Best Seller',
    compatibility: ['Universal'], 
    isHsaEligible: true,
    unitPrice: '$0.75 / cell',
    options: {
        capacities: ['230mAh (Standard)', '300mAh (High Power)'],
        colors: [
            { name: 'Silver', hex: '#E2E8F0' },
            { name: 'Black', hex: '#000000' }
        ]
    }
  },
  
  // --- AB Specific ---
  {
    id: 'ab1',
    name: 'UHP Cable for Naida CI',
    description: 'Universal Headpiece cable. Durable and flexible.',
    salesHook: 'Experience static-free sound. Reinforced design for 2x longer lifespan than standard cables.',
    longDescription: 'The Universal Headpiece (UHP) cable connects your processor to the headpiece. Designed with reinforced connectors to withstand daily wear and tear.',
    features: ['Reinforced Strain Relief', 'Gold-plated contacts', 'Tangle-free coating'],
    price: 65.00,
    rating: 4.5,
    reviews: 42,
    image: 'https://picsum.photos/seed/uhpcable/400/400',
    category: 'Coils & Cables',
    compatibility: ['Naida Q90', 'Naida Q70', 'Naida Q30', 'Harmony'],
    isHsaEligible: true,
    options: {
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Beige', hex: '#E5D6C4' },
            { name: 'Brown', hex: '#5D4037' },
            { name: 'White', hex: '#FFFFFF' }
        ],
        sizes: ['6cm', '8.5cm', '11cm', '14cm', '24cm']
    }
  },
  {
    id: 'ab2',
    name: 'AquaCase for Naida',
    description: 'IP68 Waterproof case for swimming.',
    salesHook: 'Swim, surf, and shower with confidence. The only case you need for a worry-free summer.',
    price: 180.00,
    originalPrice: 210.00,
    rating: 4.9,
    reviews: 88,
    image: 'https://picsum.photos/seed/aquacase/400/400',
    category: 'Covers & Skins',
    badge: 'Summer Ready',
    compatibility: ['Naida Q90', 'Naida Q70'],
    isHsaEligible: false
  },
  {
    id: 'ab3',
    name: 'Slim HP Color Cap',
    description: 'Replacement color cap for Headpiece.',
    salesHook: 'Personalize your look instantly. Snap-on colors to match your hair or style.',
    price: 25.00,
    rating: 4.4,
    reviews: 15,
    image: 'https://picsum.photos/seed/abcap/400/400',
    category: 'Coils & Cables',
    compatibility: ['Marvel', 'Naida Q90'],
    isHsaEligible: true,
    options: {
        colors: [
            { name: 'Alpine White', hex: '#FFFFFF' },
            { name: 'Onyx Black', hex: '#000000' },
            { name: 'Ruby Red', hex: '#C60C30' },
            { name: 'Blue Ocean', hex: '#00A4E4' }
        ]
    }
  },

  // --- Cochlear Specific ---
  {
    id: 'c1',
    name: 'Slimline Coil Cable',
    description: 'Lightweight coil cable.',
    salesHook: 'So light you will forget it is there. The official low-profile cable for maximum comfort.',
    price: 45.00,
    rating: 4.6,
    reviews: 85,
    image: 'https://picsum.photos/seed/cable1/400/400',
    category: 'Coils & Cables',
    compatibility: ['N7', 'N8'],
    isHsaEligible: true,
    options: {
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Beige', hex: '#E5D6C4' },
            { name: 'Grey', hex: '#808080' },
            { name: 'Brown', hex: '#5D4037' }
        ],
        sizes: ['6cm', '8cm', '11cm', '25cm']
    }
  },
  {
    id: 'c2',
    name: 'Nucleus 5/6 Coil Cable',
    description: 'Standard coil cable replacement.',
    salesHook: 'Restore your sound clarity. Genuine replacement part guarantees zero interference.',
    price: 42.00,
    rating: 4.8,
    reviews: 310,
    image: 'https://picsum.photos/seed/n5cable/400/400',
    category: 'Coils & Cables',
    compatibility: ['N5', 'N6'],
    isHsaEligible: true,
    options: {
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Beige', hex: '#E5D6C4' },
            { name: 'White', hex: '#FFFFFF' }
        ],
        sizes: ['6cm', '8cm', '11cm']
    }
  },
  {
    id: 'c3',
    name: 'Freedom Bodyworn Cable (Long)',
    description: 'Rare vintage cable for bodyworn config.',
    salesHook: 'Hard to find? We have it in stock. Keep your trusted Freedom processor running.',
    price: 85.00,
    rating: 4.2,
    reviews: 8,
    image: 'https://picsum.photos/seed/freedom/400/400',
    category: 'Coils & Cables',
    badge: 'Rare',
    compatibility: ['Freedom'],
    isHsaEligible: true
  },

  // --- Med-El Specific ---
  {
    id: 'me1',
    name: 'DL-Coil Cover',
    description: 'Decorative cover for DL-Coil.',
    salesHook: 'Style your Sonnet. Durable covers that protect and personalize.',
    price: 15.00,
    rating: 4.3,
    reviews: 20,
    image: 'https://picsum.photos/seed/dlcoil/400/400',
    category: 'Covers & Skins',
    compatibility: ['Sonnet 2', 'Sonnet 1', 'Opus 2'],
    isHsaEligible: true,
    options: {
        colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'Anthracite', hex: '#333333' },
            { name: 'Nordic Grey', hex: '#CCCCCC' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Bordeaux Red', hex: '#800000' }
        ]
    }
  },
  {
    id: 'me2',
    name: 'WaterWear for Sonnet/Opus',
    description: 'Reusable waterproof skins (Pack of 3).',
    salesHook: 'Dive in. Fully waterproof protection for up to 9 hours per use.',
    price: 49.00,
    rating: 4.6,
    reviews: 55,
    image: 'https://picsum.photos/seed/waterwear/400/400',
    category: 'Covers & Skins',
    badge: 'Essential',
    compatibility: ['Sonnet 2', 'Sonnet 1', 'Opus 2', 'Opus 1'],
    isHsaEligible: true
  },
  {
    id: 'me3',
    name: 'FineTuner Echo Remote',
    description: 'Remote control for Med-El processors.',
    salesHook: 'Take control. Adjust volume and sensitivity with pocket-sized convenience.',
    price: 150.00,
    rating: 4.7,
    reviews: 10,
    image: 'https://picsum.photos/seed/remote/400/400',
    category: 'Wireless',
    compatibility: ['Sonnet 2', 'Sonnet 1'],
    isHsaEligible: true
  },

  // --- Accessories ---
  {
    id: 'acc1',
    name: 'Drying Capsules (Pack of 4)',
    description: 'Desiccant bricks for drying kits.',
    salesHook: 'Absorb moisture instantly. Essential for preventing corrosion in your processor.',
    price: 12.99,
    rating: 4.8,
    reviews: 500,
    image: 'https://picsum.photos/seed/bricks/400/400',
    category: 'Drying Care',
    compatibility: ['Universal'],
    isHsaEligible: true
  },
  {
    id: 'w1',
    name: 'Mini Microphone 2+',
    description: 'Stream speech directly to processor.',
    salesHook: 'Hear in noise like never before. Ideal for classrooms, restaurants, and meetings.',
    price: 245.00,
    rating: 4.7,
    reviews: 210,
    image: 'https://picsum.photos/seed/mic/400/400',
    category: 'Wireless',
    compatibility: ['N7', 'N8', 'N6', 'Marvel'],
    isHsaEligible: true
  }
];

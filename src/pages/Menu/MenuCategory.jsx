import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { menuData, menuCategories } from '../../data/menuData';
import { useCart } from '../../context/CartContext';

const MenuCategory = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [activeMood, setActiveMood] = React.useState('Energetic');
  const [activeTimer, setActiveTimer] = React.useState(null);
  const [votes, setVotes] = React.useState({ matcha: 64, coldbrew: 36 });
  const [ritual, setRitual] = React.useState({ base: null, complement: null });
  const [surpriseResult, setSurpriseResult] = React.useState(null);
  const [showSurpriseSection, setShowSurpriseSection] = React.useState(true);
  const [vaultStatus, setVaultStatus] = React.useState('initial'); // initial, requested, unlocked
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dietaryFilter, setDietaryFilter] = React.useState(null);
  const [items, setItems] = React.useState(menuData); // Fallback to static data

  React.useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/menu');
        const dbItems = await res.json();
        // Merge static data with live database items
        setItems([...menuData, ...dbItems]);
      } catch (err) {
        console.warn('Backend menu not available, using static ritual data.');
      }
    };
    fetchMenu();
  }, []);

  // WORKABLE LOGIC: Maps Dietary buttons to existing items for the demo
  const filteredSearchItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesDietary = true;
    if (dietaryFilter === 'vegan') {
      matchesDietary = ['Golden Sunrise Toast', 'Fruit Platter', 'Strawberry Smoothie'].includes(item.name);
    } else if (dietaryFilter === 'gluten') {
      matchesDietary = ['Fruit Platter', 'Mint Margarita Glow', 'Electric Blue Lemonade'].includes(item.name);
    } else if (dietaryFilter === 'dairy') {
      matchesDietary = ['Golden Sunrise Toast', 'Electric Blue Lemonade', 'Mint Margarita Glow', 'Zesty Lime Refresh'].includes(item.name);
    } else if (dietaryFilter === 'special') {
      matchesDietary = ['Artisanal Bistro Burger', 'Gold Dust Macchiato', 'Dynamite Gold Chicken'].includes(item.name);
    }

    return matchesSearch && matchesDietary;
  });

  const startTimer = (method) => {
    setActiveTimer(method);
    // In a real app, we'd use a countdown state, but for UI demo, 
    // the CSS transition triggered by state is effective.
  };

  const handleVote = (choice) => {
    setVotes(prev => ({ ...prev, [choice]: prev[choice] + 1 }));
  };

  const moods = {
    Energetic: { 
      name: "The Morning Blaze", 
      desc: "Double espresso with organic honey and smoked cinnamon. Immediate clarity.", 
      price: 8.50, 
      img: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
      stats: { spice: 40, sweet: 60, bold: 90 }
    },
    Indulgent: { 
      name: "Velvet Cacao Dream", 
      desc: "70% dark chocolate fondant with a molten gold caramel center. Pure luxury.", 
      price: 12.00, 
      img: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      stats: { spice: 10, sweet: 95, bold: 70 }
    },
    Healthy: { 
      name: "Green Vitality Bowl", 
      desc: "Organic kale, quinoa, and avocado with a lemon-tahini artisan dressing.", 
      price: 14.50, 
      img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      stats: { spice: 20, sweet: 15, bold: 30 }
    },
    Sophisticated: { 
      name: "Solar Gold Spritz", 
      desc: "Sparkling botanical infusion with saffron threads and citrus oils. Elegant.", 
      price: 10.50, 
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      stats: { spice: 80, sweet: 40, bold: 50 }
    }
  };

  if (!category) {
    return (
      <div className="space-y-40 py-24">
        {/* UNIQUE FEATURE: Visual Mosaic & Philosophy (Modern Magazine Style) */}
        <section className="relative">
           <div className="grid lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-4 flex flex-col justify-center space-y-8 bg-white/5 p-16 rounded-[4rem] border border-white/5">
                 <span className="text-gh-gold text-[10px] font-black tracking-[1em] uppercase block">Aesthete</span>
                 <h2 className="text-7xl font-heading leading-tight text-white">The Art <br/> of <span className="text-gh-gold italic">Taste</span></h2>
                 <p className="text-gray-500 text-lg font-light leading-relaxed">
                    We believe dining is a visual symphony. Every ingredient is chosen for its color, texture, and soul.
                 </p>
                 <div className="w-20 h-0.5 bg-gh-gold opacity-50"></div>
              </div>

              <div className="lg:col-span-5 h-[600px] rounded-[4rem] overflow-hidden group border border-white/5">
                 <img 
                   src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop" 
                   className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                   alt="Visual Vibe" 
                 />
              </div>

              <div className="lg:col-span-3 flex flex-col gap-10">
                 <div className="h-[350px] rounded-[3rem] overflow-hidden border border-white/5">
                    <img 
                      src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Texture" 
                    />
                 </div>
                 <div className="flex-1 bg-gh-gold/5 p-8 rounded-[2.5rem] border border-gh-gold/10 flex items-center justify-center text-center">
                    <p className="text-gh-gold font-heading italic text-2xl px-4">"Flavor is the shadow of memory."</p>
                 </div>
              </div>
           </div>
        </section>

        {/* UNIQUE FEATURE: The Chef's Mood Selection (Fully Functional) */}
        <section className="py-20">
           <div className="text-center space-y-4 mb-20">
              <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">Personalization</span>
              <h2 className="text-6xl font-heading text-white">What's your <span className="text-gh-gold italic">mood</span> today?</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {Object.keys(moods).map((m, i) => (
                <button 
                  key={m} 
                  onClick={() => setActiveMood(m)}
                  className={`group relative p-12 rounded-[3rem] bg-white/5 border transition-all duration-700 text-center overflow-hidden
                    ${activeMood === m ? 'border-gh-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'border-white/10 hover:border-gh-gold/50'}`}
                >
                   <div className="relative z-10 space-y-4">
                      <span className="text-5xl block transform group-hover:scale-125 transition-transform duration-500">
                        {m === 'Energetic' ? '☕' : m === 'Indulgent' ? '🍰' : m === 'Healthy' ? '🥗' : '🍸'}
                      </span>
                      <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors ${activeMood === m ? 'text-gh-gold' : 'text-gray-500'}`}>{m}</span>
                   </div>
                </button>
              ))}
           </div>

           <div className="bg-white/5 rounded-[4rem] p-12 border border-white/5 flex flex-col lg:flex-row gap-16 items-center animate-in fade-in slide-in-from-bottom-10 duration-1000" key={activeMood}>
              <div className="w-full lg:w-1/2 h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                 <img src={`${moods[activeMood].img}?q=80&w=1000&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Recommended" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                 <div className="badge bg-gh-gold text-black border-none px-6 py-4 font-black text-[10px] uppercase tracking-widest">Chef's Mood Pick</div>
                 <h3 className="text-6xl font-heading text-white">{moods[activeMood].name}</h3>
                 <p className="text-gray-400 text-xl font-light leading-relaxed">{moods[activeMood].desc}</p>
                 <div className="flex items-center gap-10 pt-10 border-t border-white/5">
                    <span className="text-4xl font-heading text-gh-gold">${moods[activeMood].price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart({ id: `special-${activeMood}`, name: moods[activeMood].name, price: moods[activeMood].price })}
                      className="btn btn-outline border-gh-gold text-gh-gold rounded-full px-12 py-4 h-auto hover:bg-gh-gold hover:text-black tracking-[0.3em] text-[10px] font-black transition-all duration-500 shadow-lg hover:shadow-gh-gold/20"
                    >
                      ADD TO RITUAL
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* UNIQUE FEATURE: The Golden Hour Timeline */}
        <section className="py-24">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-4">
                    <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">The Rhythm</span>
                    <h2 className="text-6xl font-heading text-white">Golden Hour <br/> <span className="text-gh-gold italic">Timeline</span></h2>
                 </div>
                 <div className="space-y-16 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gh-gold/20">
                    {[
                      { time: "07:00 AM", title: "The First Bloom", desc: "Our baristas begin the first light-roast extraction." },
                      { time: "10:30 AM", title: "Pastry Release", desc: "Fresh laminated doughs emerge from our stone ovens." },
                      { time: "04:00 PM", title: "The Gold Hour", desc: "As the light shifts, we transition to our boldest blends." }
                    ].map((step, i) => (
                      <div key={i} className="pl-12 relative group">
                         <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#080808] border border-gh-gold group-hover:bg-gh-gold transition-colors duration-500"></div>
                         <span className="text-gh-gold text-[10px] font-black tracking-widest">{step.time}</span>
                         <h4 className="text-white text-2xl font-heading mt-2">{step.title}</h4>
                         <p className="text-gray-500 font-light mt-2 max-w-sm">{step.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative h-[700px] rounded-[4rem] overflow-hidden border border-white/5">
                 <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-50" alt="Atmosphere" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-gh-gold/30 flex items-center justify-center animate-pulse">
                       <div className="w-24 h-24 rounded-full border border-gh-gold/60 flex items-center justify-center">
                          <span className="text-gh-gold text-xs font-black tracking-widest">LIVE</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* UNIQUE FEATURE: Artisanal Pairings */}
        <section className="py-24 border-t border-white/5">
           <div className="text-center mb-24">
              <span className="text-gh-gold text-[10px] font-black tracking-[1em] uppercase mb-4 block">The Perfect Match</span>
              <h2 className="text-5xl font-heading text-white">Artisanal <span className="text-gh-gold italic">Pairings</span></h2>
           </div>
           <div className="grid md:grid-cols-2 gap-12">
              {[
                { name: "The Morning Duo", items: "Single Origin + Almond Croissant", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
                { name: "The Sunset Ritual", items: "Hibiscus Spritz + Citrus Tart", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307" }
              ].map((pairing, i) => (
                <div key={i} className="group relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5">
                   <img src={`${pairing.img}?q=80&w=1000&auto=format&fit=crop`} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={pairing.name} />
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-700"></div>
                   <div className="absolute bottom-12 left-12">
                      <h3 className="text-3xl font-heading text-white mb-2">{pairing.name}</h3>
                      <p className="text-gh-gold text-[10px] font-black tracking-widest uppercase">{pairing.items}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* WORKING FEATURE: The Ritual Builder (Sales Tool - NO IMAGES) */}
        <section className="py-24 bg-white/[0.01] rounded-[4rem] px-16 border border-white/5">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/3 space-y-8">
                 <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">Ritual Builder</span>
                 <h2 className="text-5xl font-heading text-white">Create your <br/> <span className="text-gh-gold italic">Pairing</span></h2>
                 <p className="text-gray-500 font-light">Custom combinations designed to elevate your palate. Unlock special pricing when you bundle.</p>
              </div>
              <div className="lg:w-2/3 space-y-12">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <p className="text-gh-gold text-[10px] font-black uppercase tracking-widest">Step 1: Pick Base</p>
                       <div className="flex flex-col gap-4">
                          {["Espresso Ritual", "Cold Brew Soul", "Botanical Tea"].map(b => (
                            <button key={b} onClick={() => setRitual(prev => ({ ...prev, base: b }))}
                              className={`p-6 rounded-[1.5rem] border transition-all text-left ${ritual.base === b ? 'bg-gh-gold text-black border-gh-gold shadow-lg' : 'bg-white/5 text-white border-white/10 hover:border-gh-gold/50'}`}
                            > {b} </button>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-6">
                       <p className="text-gh-gold text-[10px] font-black uppercase tracking-widest">Step 2: Pick Complement</p>
                       <div className="flex flex-col gap-4">
                          {["Almond Croissant", "Chocolate Fondant", "Citrus Tart"].map(c => (
                            <button key={c} onClick={() => setRitual(prev => ({ ...prev, complement: c }))}
                              className={`p-6 rounded-[1.5rem] border transition-all text-left ${ritual.complement === c ? 'bg-gh-gold text-black border-gh-gold shadow-lg' : 'bg-white/5 text-white border-white/10 hover:border-gh-gold/50'}`}
                            > {c} </button>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="p-12 rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gh-gold/5 transition-opacity duration-1000 ${ritual.base && ritual.complement ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative z-10 space-y-2 text-center md:text-left">
                       <p className="text-white text-2xl font-heading">
                          {ritual.base && ritual.complement ? `${ritual.base} + ${ritual.complement}` : "Select your ritual components"}
                       </p>
                       <p className="text-gh-gold text-[10px] uppercase font-black tracking-widest opacity-60">Exclusive Bundle Price Applied</p>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                       <span className="text-4xl font-heading text-white">$14.00</span>
                       <div className="flex flex-col items-center gap-2">
                          <button 
                            disabled={!ritual.base || !ritual.complement}
                            onClick={() => {
                              if (ritual.base && ritual.complement) {
                                addToCart({ 
                                  id: `ritual-${Date.now()}`, 
                                  name: `${ritual.base} + ${ritual.complement}`, 
                                  price: 14.00,
                                  image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop" // Ritual placeholder
                                });
                                setRitual({ base: null, complement: null });
                              }
                            }}
                            className={`px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500
                              ${ritual.base && ritual.complement 
                                ? 'bg-gh-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105' 
                                : 'bg-white/5 text-gray-600 border border-white/10 opacity-50 cursor-not-allowed'}`}
                          >
                             ADD RITUAL TO CART
                          </button>
                          {!ritual.base || !ritual.complement ? (
                            <span className="text-[8px] text-gh-gold/40 uppercase tracking-widest animate-pulse">Select both items to enable</span>
                          ) : null}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
        {/* WORKING FEATURE: The Chef's Surprise (Interactive & Repeatable Discovery) */}
        <section className="py-24 border-t border-white/5 text-center space-y-16">
           <div className="space-y-4">
              <span className="text-gh-gold text-[10px] font-black tracking-[0.8em] uppercase block">Discovery</span>
              <h2 className="text-5xl font-heading text-white">The Chef's <span className="text-gh-gold italic">Surprise</span></h2>
              <p className="text-gray-500 max-w-xl mx-auto font-light">Can't decide? Let our Master Chef choose your next ritual for you. Use it as many times as you like.</p>
           </div>

           <div className="max-w-2xl mx-auto bg-white/5 p-16 rounded-[4rem] border border-white/10 space-y-10 group relative overflow-hidden transition-all duration-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-gh-gold/5 to-transparent opacity-10 group-hover:opacity-30 transition-opacity duration-1000"></div>
              
              <div className="relative z-10 min-h-[350px] flex flex-col items-center justify-center space-y-8">
                 {!surpriseResult ? (
                   <>
                      <div className="w-24 h-24 rounded-full border border-gh-gold/30 flex items-center justify-center animate-spin-slow">
                         <span className="text-3xl">🎲</span>
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-3xl font-heading text-white">Your Next Ritual Awaits</h3>
                         <p className="text-gray-500 font-light text-lg">Confused? We've curated 12 secret pairings just for you.</p>
                      </div>
                   </>
                 ) : (
                   <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 space-y-8" key={surpriseResult.name}>
                      <div className="w-64 h-64 rounded-[3rem] overflow-hidden border-2 border-gh-gold shadow-[0_0_50px_rgba(212,175,55,0.3)] mx-auto group">
                         <img src={`${surpriseResult.img}?q=80&w=600&auto=format&fit=crop`} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt="Surprise" />
                      </div>
                      <div className="space-y-3">
                         <span className="text-gh-gold text-[10px] font-black tracking-[0.6em] uppercase">Chef's Secret Pick</span>
                         <h3 className="text-4xl font-heading text-white">{surpriseResult.name}</h3>
                         <p className="text-gray-500 font-light italic max-w-sm mx-auto">"A perfect balance of texture and soul for your current vibe."</p>
                      </div>
                   </div>
                 )}
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
                 <button 
                   onClick={() => {
                      const pool = [
                        { name: "Artisanal Avocado Bloom", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
                        { name: "Electric Blue Macchiato", img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d" },
                        { name: "Spiced Honey Fondant", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307" },
                        { name: "Lavender Morning Crepe", img: "https://images.unsplash.com/photo-1519676867240-f03562e64548" },
                        { name: "Golden Hour Fruit Tart", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13" },
                        { name: "Velvet Berry Parfait", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777" },
                        { name: "Saffron Infused Croissant", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" },
                        { name: "Smoked Caramel Ritual", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772" }
                      ];
                      const random = pool[Math.floor(Math.random() * pool.length)];
                      setSurpriseResult(random);
                   }}
                   className="px-16 py-6 rounded-full bg-gh-gold text-black font-black text-[10px] uppercase tracking-[0.4em] hover:scale-110 active:scale-95 transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                 >
                    {surpriseResult ? "SHUFFLE AGAIN" : "SHUFFLE RITUAL"}
                 </button>
                 
                 {surpriseResult && (
                   <button 
                     onClick={() => {
                        addToCart({ id: `surprise-${Date.now()}`, name: surpriseResult.name, price: 15.00, image: surpriseResult.img });
                     }}
                     className="px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] hover:border-gh-gold transition-all duration-500"
                   >
                      ADD TO CART
                   </button>
                 )}
              </div>
           </div>
        </section>

        {/* ESSENTIAL FEATURE: The Intelligent Menu Search & Dietary Compass (Functional & Necessary) */}
        <section className="py-24 border-t border-white/5 bg-[#080808]">
           <div className="max-w-6xl mx-auto px-6 space-y-16">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                 <div className="space-y-4">
                    <span className="text-gh-gold text-[10px] font-black tracking-[1em] uppercase block">Navigation</span>
                    <h2 className="text-5xl font-heading text-white">Find Your <span className="text-gh-gold italic">Ritual</span></h2>
                 </div>
                 <div className="w-full md:w-[400px] relative group">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for bean, spice, or ritual..."
                      className="w-full bg-white/5 border border-white/10 rounded-full px-10 py-5 text-white font-light focus:border-gh-gold focus:outline-none transition-all placeholder:text-gray-700"
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-gh-gold opacity-30 group-hover:opacity-100 transition-opacity">
                       🔍
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { label: "Vegan Choice", icon: "🌱", value: "vegan", desc: "No animal products" },
                   { label: "Gluten Free", icon: "🌾", value: "gluten", desc: "Wheat-free rituals" },
                   { label: "Dairy Free", icon: "🥥", value: "dairy", desc: "No milk or lactose" },
                   { label: "House Specials", icon: "✨", value: "special", desc: "Master Chef's picks" }
                 ].map((filter, i) => (
                   <button 
                     key={i}
                     onClick={() => setDietaryFilter(dietaryFilter === filter.value ? null : filter.value)}
                     className={`group p-8 rounded-[2.5rem] transition-all duration-500 flex flex-col items-center text-center gap-4 relative overflow-hidden
                       ${dietaryFilter === filter.value ? 'bg-gh-gold text-black border-gh-gold scale-105' : 'bg-white/5 text-white border border-white/5 hover:bg-gh-gold hover:text-black hover:scale-105'}`}
                   >
                      <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-transform duration-500 group-hover:rotate-12
                        ${dietaryFilter === filter.value ? 'bg-black/10 border-black/20' : 'bg-white/5 border-white/10 group-hover:border-black/20 group-hover:bg-black/10'}`}>
                         <span className="text-2xl">{filter.icon}</span>
                      </div>
                      <div>
                         <span className="font-heading text-xl block">{filter.label}</span>
                         <span className={`text-[8px] font-black uppercase tracking-widest opacity-60`}>{filter.desc}</span>
                      </div>
                   </button>
                 ))}
              </div>

              {/* Dynamic Search Results */}
              {(searchQuery || dietaryFilter) && (
                <div className="pt-20 animate-in fade-in slide-in-from-top-10 duration-700">
                   <div className="mb-10 flex justify-between items-center border-b border-white/10 pb-6">
                      <h3 className="text-3xl font-heading text-white italic">Found {filteredSearchItems.length} matching <span className="text-gh-gold">rituals</span></h3>
                      <button 
                        onClick={() => { setSearchQuery(''); setDietaryFilter(null); }} 
                        className="bg-transparent border-none p-0 text-gh-gold text-[10px] font-black uppercase tracking-widest hover:underline cursor-pointer"
                      >
                         Clear Filters
                      </button>
                   </div>
                   <div className="grid md:grid-cols-3 gap-10">
                      {filteredSearchItems.length > 0 ? filteredSearchItems.map((item) => (
                        <div key={item.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 group hover:border-gh-gold transition-all">
                           <div className="h-40 rounded-2xl overflow-hidden mb-6">
                              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={item.name} />
                           </div>
                           <h4 className="text-white text-xl font-heading mb-2">{item.name}</h4>
                           <p className="text-gray-500 text-sm line-clamp-1 mb-4">{item.description}</p>
                           <button 
                             onClick={() => addToCart(item)}
                             className="w-full py-4 rounded-xl bg-gh-gold text-black text-[10px] font-black uppercase tracking-widest hover:scale-95 transition-all shadow-lg"
                           >
                              ADD TO CART • ${item.price.toFixed(2)}
                           </button>
                        </div>
                      )) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                           <p className="text-gray-500 text-xl font-light italic">"No rituals matched your unique preference."</p>
                           <button onClick={() => { setSearchQuery(''); setDietaryFilter(null); }} className="text-gh-gold text-[10px] font-black uppercase tracking-widest border border-gh-gold/20 px-8 py-3 rounded-full hover:bg-gh-gold hover:text-black transition-all">View All Menu</button>
                        </div>
                      )}
                   </div>
                </div>
              )}
           </div>
        </section>

        </div>
      );
   }

   const filteredItems = items.filter(item => item.category.toLowerCase().replace(/\s+/g, '-') === category);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-32 py-24">
      {filteredItems.map((item) => (
        <div key={item.id} className="group relative flex flex-col h-full bg-white/5 rounded-[4rem] border border-white/5 overflow-hidden transition-all duration-700 hover:border-gh-gold/50 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.2)]">
          <Link to={`/menu/item/${item.id}`} className="block relative h-[450px] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
            />
            
            {/* Wishlist Icon */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Simple wishlist toggle logic can be added here
              }}
              className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-xl hover:bg-white hover:text-red-500 transition-all duration-500 z-10"
            >
              ❤
            </button>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute bottom-10 left-10">
               <span className="text-gh-gold text-[10px] font-black tracking-[0.5em] uppercase mb-2 block">{item.vibe}</span>
               <h3 className="text-3xl font-heading text-white">{item.name}</h3>
            </div>
          </Link>

          <div className="p-10 space-y-6 flex-1 flex flex-col bg-[#0a0a0a]">
            <p className="text-gray-500 text-base font-light leading-relaxed line-clamp-2">{item.description}</p>
            
            <div className="flex flex-col gap-6 mt-auto">
              <span className="text-3xl font-heading text-gh-gold">${item.price.toFixed(2)}</span>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
                className="group/btn relative w-full h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 hover:bg-gh-gold hover:border-gh-gold hover:scale-[1.02]"
              >
                <span className="text-white group-hover/btn:opacity-0 transition-opacity duration-300 text-[10px] font-black uppercase tracking-[0.4em]">Add to Cart</span>
                <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500">
                  <span className="text-black text-2xl">🛒</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuCategory;

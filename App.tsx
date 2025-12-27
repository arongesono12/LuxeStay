
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import AuthScreen from './components/AuthScreen';
import HotelCard from './components/HotelCard';
import MapPlaceholder from './components/MapPlaceholder';
import FilterBar from './components/FilterBar';
import HotelDetails from './components/HotelDetails';
import { searchHotels } from './services/geminiService';
import { AppScreen, Hotel, User, Coordinates } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [favorites, setFavorites] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeTab, setActiveTab] = useState<'discover' | 'favorites'>('discover');

  useEffect(() => {
    const savedUser = localStorage.getItem('luxe_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setScreen(AppScreen.HOME);
    }
    const savedFavorites = localStorage.getItem('luxe_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('luxe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAuthSuccess = (email: string, name: string) => {
    const newUser = { id: Date.now().toString(), email, name };
    setUser(newUser);
    localStorage.setItem('luxe_user', JSON.stringify(newUser));
    setScreen(AppScreen.HOME);
    requestLocation();
  };

  const handleLogout = () => {
    localStorage.removeItem('luxe_user');
    setUser(null);
    setScreen(AppScreen.LOGIN);
  };

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const c = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCoords(c);
          performSearch("hoteles de lujo cerca de mí", { latitude: c.lat, longitude: c.lng });
        },
        () => performSearch("hoteles de lujo en ciudades exclusivas")
      );
    }
  };

  const performSearch = async (query: string, locationCoords?: { latitude: number; longitude: number }) => {
    setIsLoading(true);
    const result = await searchHotels(query, locationCoords || (coords ? { latitude: coords.lat, longitude: coords.lng } : undefined));
    setHotels(result.hotels);
    setIsLoading(false);
    setActiveTab('discover');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) performSearch(searchQuery);
  };

  const toggleFavorite = (hotel: Hotel) => {
    setFavorites(prev => {
      const isFav = prev.find(f => f.id === hotel.id);
      return isFav ? prev.filter(f => f.id !== hotel.id) : [...prev, hotel];
    });
  };

  const isFavorite = (hotelId: string) => favorites.some(f => f.id === hotelId);

  // Calcular el precio promedio en XAF para mantener consistencia con las tarjetas
  const averagePriceFormatted = useMemo(() => {
    if (hotels.length === 0) return null;
    
    const totalXAF = hotels.reduce((acc, hotel) => {
      const numericPart = hotel.pricePerNight.replace(/[^0-9]/g, '');
      const usdValue = parseInt(numericPart, 10) || 0;
      return acc + (usdValue * 600);
    }, 0);
    
    const avgXAF = totalXAF / hotels.length;
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      maximumFractionDigits: 0,
    }).format(avgXAF);
  }, [hotels]);

  if (screen === AppScreen.LOGIN || screen === AppScreen.SIGNUP) {
    return (
      <AuthScreen 
        mode={screen as AppScreen.LOGIN | AppScreen.SIGNUP}
        onAuthSuccess={handleAuthSuccess}
        onToggleMode={() => setScreen(screen === AppScreen.LOGIN ? AppScreen.SIGNUP : AppScreen.LOGIN)}
      />
    );
  }

  const displayedHotels = activeTab === 'discover' ? hotels : favorites;

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      {user && <Header userName={user.name} onLogout={handleLogout} />}
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {activeTab === 'discover' && (
          <div className="mb-12">
            <form onSubmit={handleSearchSubmit} className="relative max-w-3xl mx-auto mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore destinos de élite (ej. París, Maldivas, Dubai)..."
                className="w-full pl-14 pr-32 py-6 bg-white border border-gold-100/60 rounded-[2rem] shadow-xl shadow-gold-900/5 focus:ring-4 focus:ring-gold-400/10 focus:border-gold-400 outline-none transition-all text-gray-800 text-lg font-medium"
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-500">
                <i className="fas fa-search text-xl"></i>
              </div>
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-black rounded-2xl hover:from-gold-500 hover:to-gold-700 transition-all shadow-lg active:scale-95 text-xs uppercase tracking-widest"
              >
                Explorar
              </button>
            </form>
            
            <div className="flex justify-center">
               <FilterBar onFilterChange={(type, val) => console.log('filtro', type, val)} />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
              {activeTab === 'discover' ? 'Descubrimiento' : 'Colección Privada'}
            </h2>
            {activeTab === 'discover' && averagePriceFormatted && (
              <div className="flex items-center space-x-3 bg-gold-50/50 self-start px-4 py-2 rounded-xl border border-gold-100/50">
                <i className="fas fa-chart-line text-gold-500 text-xs"></i>
                <p className="text-xs font-bold text-gold-700 uppercase tracking-widest">
                  Precio promedio: <span className="text-gray-900 font-black ml-1">{averagePriceFormatted}</span>
                </p>
              </div>
            )}
            <p className="text-sm text-gray-400 font-medium tracking-wide">
              {activeTab === 'discover' ? `${hotels.length} estancias exclusivas curadas para usted` : 'Sus alojamientos favoritos guardados con distinción'}
            </p>
          </div>
          {activeTab === 'discover' && (
            <div className="bg-white/50 backdrop-blur border border-gold-100/50 rounded-2xl p-1.5 flex shadow-sm shrink-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${viewMode === 'list' ? 'bg-gold-500 text-white shadow-lg scale-105' : 'text-gold-700/60 hover:text-gold-700'}`}
              >
                <i className="fas fa-list-ul mr-2"></i> LISTA
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${viewMode === 'map' ? 'bg-gold-500 text-white shadow-lg scale-105' : 'text-gold-700/60 hover:text-gold-700'}`}
              >
                <i className="fas fa-map-marked-alt mr-2"></i> MAPA
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative">
              <div className="w-24 h-24 border-[3px] border-gold-100 border-t-gold-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-crown text-gold-500 text-2xl animate-pulse"></i>
              </div>
            </div>
            <p className="mt-8 text-gold-800/50 font-black uppercase tracking-[0.4em] text-[10px]">Curando Experiencias...</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {viewMode === 'map' && activeTab === 'discover' ? (
              <MapPlaceholder 
                hotels={displayedHotels} 
                userLocation={coords} 
                onSelectHotel={(h) => setSelectedHotel(h)} 
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayedHotels.map(hotel => (
                  <HotelCard 
                    key={hotel.id} 
                    hotel={hotel} 
                    onClick={() => setSelectedHotel(hotel)}
                    isFavorite={isFavorite(hotel.id)}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotel);
                    }}
                  />
                ))}
                {displayedHotels.length === 0 && (
                  <div className="col-span-full text-center py-40 bg-white/40 rounded-[3rem] border-2 border-dashed border-gold-200/50">
                    <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <i className={`fas ${activeTab === 'discover' ? 'fa-search' : 'fa-gem'} text-4xl text-gold-200`}></i>
                    </div>
                    <p className="text-gold-900/40 font-black uppercase tracking-widest text-sm">
                      {activeTab === 'discover' 
                        ? 'No se han hallado resultados para su criterio.' 
                        : 'Su colección privada está esperando su primera joya.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedHotel && (
        <HotelDetails 
          hotel={selectedHotel} 
          onBack={() => setSelectedHotel(null)}
          isFavorite={isFavorite(selectedHotel.id)}
          onToggleFavorite={() => toggleFavorite(selectedHotel)}
        />
      )}

      <footer className="bg-white/90 backdrop-blur-xl border-t border-gold-100/50 py-5 px-8 md:hidden sticky bottom-0 z-40 shadow-[0_-10px_30px_rgba(212,175,55,0.08)]">
        <div className="flex justify-around items-center">
          {[
            { id: 'discover', icon: 'fa-compass', label: 'Explorar' },
            { id: 'favorites', icon: 'fa-gem', label: 'Muestrario' },
            { id: 'bookings', icon: 'fa-calendar-check', label: 'Reservas' },
            { id: 'profile', icon: 'fa-user-circle', label: 'Perfil' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => tab.id === 'discover' || tab.id === 'favorites' ? setActiveTab(tab.id as any) : null}
              className={`flex flex-col items-center transition-all ${activeTab === tab.id ? 'text-gold-600 scale-110' : 'text-gray-300 hover:text-gold-400'}`}
            >
              <i className={`fas ${tab.icon} text-xl`}></i>
              <span className="text-[8px] mt-2 font-black uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && <div className="w-1 h-1 bg-gold-500 rounded-full mt-1.5"></div>}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;

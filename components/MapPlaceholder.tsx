
import React from 'react';
import { Hotel, Coordinates } from '../types';

interface MapPlaceholderProps {
  hotels: Hotel[];
  userLocation: Coordinates | null;
  onSelectHotel: (hotel: Hotel) => void;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ hotels, userLocation, onSelectHotel }) => {
  return (
    <div className="relative w-full h-[500px] bg-gold-50/30 rounded-[2.5rem] overflow-hidden border border-gold-100 shadow-inner">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gold-400 rounded-full animate-ping opacity-50"></div>
            <div className="relative bg-gold-600 w-5 h-5 rounded-full border-2 border-white shadow-lg shadow-gold-500/30"></div>
          </div>
        </div>
      )}

      {hotels.map((hotel, idx) => {
        const top = `${20 + (idx * 15) % 60}%`;
        const left = `${15 + (idx * 25) % 70}%`;
        
        return (
          <button
            key={hotel.id}
            onClick={() => onSelectHotel(hotel)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ top, left }}
          >
            <div className="flex flex-col items-center">
               <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-xl border border-gold-100 mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                 <p className="text-[10px] font-black whitespace-nowrap text-gray-900">{hotel.name}</p>
                 <p className="text-[9px] text-gold-600 font-bold">{hotel.pricePerNight}</p>
               </div>
               <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-700 rounded-2xl border-2 border-white flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
                 <i className="fas fa-hotel text-[12px]"></i>
               </div>
            </div>
          </button>
        );
      })}

      <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
        <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-gold-50 flex items-center justify-center text-gray-600 hover:text-gold-600 transition-all active:scale-90">
          <i className="fas fa-plus"></i>
        </button>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-gold-50 flex items-center justify-center text-gray-600 hover:text-gold-600 transition-all active:scale-90">
          <i className="fas fa-minus"></i>
        </button>
        <button className="w-12 h-12 bg-gold-500 rounded-2xl shadow-xl shadow-gold-200 flex items-center justify-center text-white transition-all active:scale-90">
          <i className="fas fa-location-arrow"></i>
        </button>
      </div>

      <div className="absolute top-6 left-6">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gold-600 border border-gold-100 shadow-md">
          <i className="fas fa-map-marked-alt mr-2"></i>
          Vista Satelital Luxe
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;


import React from 'react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onClick, isFavorite, onToggleFavorite }) => {
  const formatXAF = (priceStr: string) => {
    try {
      const numericPart = priceStr.replace(/[^0-9]/g, '');
      const usdValue = parseInt(numericPart, 10);
      if (isNaN(usdValue)) return 'XAF --';
      const xafValue = usdValue * 600;
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
        maximumFractionDigits: 0,
      }).format(xafValue);
    } catch (e) {
      return priceStr;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-white via-white to-gold-50/40 rounded-[2.5rem] overflow-hidden border border-gold-50 shadow-sm hover:shadow-2xl hover:border-gold-200/50 hover:scale-[1.01] transition-all duration-500 ease-out cursor-pointer group flex flex-col h-full"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-5 right-5 z-10">
          <button 
            onClick={onToggleFavorite}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 ${isFavorite ? 'bg-gold-400 text-white shadow-gold-500/50' : 'bg-white/90 backdrop-blur text-gray-700 hover:bg-white hover:text-gold-500'}`}
          >
            <i className={`${isFavorite ? 'fas animate-shake' : 'far'} fa-heart text-lg`}></i>
          </button>
        </div>
        
        <div className="absolute bottom-5 left-5">
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-gold-100/30 inline-flex items-center shadow-xl">
            <span className="text-gray-900 text-sm font-black tracking-tight">{formatXAF(hotel.pricePerNight)}</span>
            <span className="text-gold-600/70 text-[9px] ml-2 uppercase font-black tracking-widest">/ noche</span>
          </div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-black text-gray-900 text-xl leading-tight group-hover:text-gold-700 transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center text-gold-700 bg-gold-50/80 px-3 py-1.5 rounded-xl border border-gold-100/50 shadow-sm shrink-0">
            <i className="fas fa-star text-[10px] mr-1.5 text-gold-500"></i>
            <span className="text-xs font-black">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 font-medium mb-6 flex items-start leading-snug">
          <i className="fas fa-map-marker-alt mt-0.5 mr-2.5 text-gold-400 shrink-0"></i>
          {hotel.address}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gold-100/30">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gold-50 overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/100?u=${hotel.id}${i}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-[9px] font-black text-white border-2 border-white shadow-sm">+8</div>
          </div>
          <div className="text-gold-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center group-hover:translate-x-1 transition-transform">
            Ver Suite <i className="fas fa-arrow-right ml-2 text-[8px]"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;


import React from 'react';
import { Hotel, Coordinates } from '../types';

interface MapPlaceholderProps {
  hotels: Hotel[];
  userLocation: Coordinates | null;
  onSelectHotel: (hotel: Hotel) => void;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ hotels, userLocation, onSelectHotel }) => {
  // Función para formatear el precio a XAF (consistencia con el resto de la app)
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
    <div className="relative w-full h-[450px] md:h-[650px] bg-[#f9f7f2] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-gold-100 shadow-2xl transition-all duration-500">
      {/* Patrón de fondo elegante estilo mapa */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#d4af37 0.5px, transparent 0.5px), linear-gradient(90deg, #d4af37 0.5px, transparent 0.5px)', backgroundSize: '100px 100px' }}></div>
      
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="relative">
            <div className="absolute -inset-3 md:-inset-4 bg-gold-400 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-gradient-to-br from-gold-500 to-gold-700 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-2xl shadow-gold-500/50 flex items-center justify-center">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {hotels.map((hotel, idx) => {
        // Posicionamiento determinista pero variado para la simulación
        const top = `${20 + (idx * 17) % 65}%`;
        const left = `${15 + (idx * 23) % 70}%`;
        
        return (
          <button
            key={hotel.id}
            onClick={() => onSelectHotel(hotel)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
            style={{ top, left }}
          >
            <div className="flex flex-col items-center">
               {/* Tooltip Premium - Ajustado para ser más legible en móvil */}
               <div className="mb-2 md:mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none scale-75 md:scale-90 group-hover:scale-100 origin-bottom">
                 <div className="relative bg-white/95 backdrop-blur-md px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(135,95,31,0.15)] border border-gold-100 flex flex-col items-center min-w-[120px] md:min-w-[140px]">
                   <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] text-gray-900 mb-0.5 text-center leading-tight">
                     {hotel.name}
                   </span>
                   <div className="flex items-center space-x-1.5 md:space-x-2 mt-1">
                      <span className="text-[10px] md:text-xs font-black text-gold-600">
                        {formatXAF(hotel.pricePerNight)}
                      </span>
                      <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-gold-200 rounded-full"></div>
                      <div className="flex items-center text-[8px] md:text-[9px] text-gold-500 font-bold">
                        <i className="fas fa-star mr-1"></i>
                        {hotel.rating.toFixed(1)}
                      </div>
                   </div>
                   {/* Flecha del tooltip */}
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-white border-r border-b border-gold-100 rotate-45"></div>
                 </div>
               </div>

               {/* Icono del Marcador - Escala según el dispositivo */}
               <div className="relative">
                 <div className="w-9 h-9 md:w-11 md:h-11 bg-white rounded-xl md:rounded-2xl border border-gold-200 flex items-center justify-center text-gold-600 shadow-lg group-hover:shadow-gold-500/30 group-hover:bg-gold-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                   <i className="fas fa-hotel text-xs md:text-sm"></i>
                 </div>
                 {/* Indicador de precio rápido siempre visible */}
                 <div className="absolute -bottom-1.5 -right-1.5 bg-gold-600 text-white text-[7px] md:text-[8px] font-black px-1 md:px-1.5 py-0.5 rounded-md md:rounded-lg border border-white shadow-sm opacity-100 group-hover:opacity-0 transition-opacity">
                    {hotel.pricePerNight}
                 </div>
               </div>
            </div>
          </button>
        );
      })}

      {/* Controles del mapa - Reposicionados y redimensionados para móvil */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col space-y-3 md:space-y-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-2xl border border-gold-100 p-0.5 md:p-1 flex flex-col">
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-gold-600 transition-all hover:bg-gold-50 rounded-lg md:rounded-xl">
            <i className="fas fa-plus text-[10px] md:text-xs"></i>
          </button>
          <div className="h-px bg-gold-50 mx-2"></div>
          <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-gold-600 transition-all hover:bg-gold-50 rounded-lg md:rounded-xl">
            <i className="fas fa-minus text-[10px] md:text-xs"></i>
          </button>
        </div>
        <button className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl md:rounded-2xl shadow-xl shadow-gold-500/30 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95">
          <i className="fas fa-location-arrow text-xs md:text-sm"></i>
        </button>
      </div>

      {/* Leyenda de la vista - Adaptada para móvil */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 max-w-[calc(100%-2rem)]">
        <div className="bg-white/95 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-[1.25rem] flex items-center space-x-3 md:space-x-4 border border-gold-100 shadow-xl overflow-hidden">
          <div className="shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-gold-500 rounded-full animate-pulse"></div>
          <div className="flex flex-col min-w-0">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-gold-600 truncate">Localizador LuxeStay</span>
            <span className="text-[7px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate">En tiempo real • {hotels.length} estancias</span>
          </div>
        </div>
      </div>

      {/* Marca de agua elegante en la esquina superior derecha */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 opacity-20 pointer-events-none hidden md:block">
         <i className="fas fa-gem text-gold-500 text-xl"></i>
      </div>
    </div>
  );
};

export default MapPlaceholder;


import React from 'react';
import { Hotel } from '../types';

interface HotelDetailsProps {
  hotel: Hotel;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel, onBack, isFavorite, onToggleFavorite }) => {
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
    <div className="fixed inset-0 bg-[#FDFCF8] z-[60] overflow-y-auto animate-in slide-in-from-right duration-500">
      <div className="relative h-[60vh] min-h-[400px]">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FDFCF8]"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 w-12 h-12 bg-white/90 backdrop-blur rounded-2xl shadow-xl flex items-center justify-center text-gray-800 hover:bg-gold-500 hover:text-white transition-all active:scale-90"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button 
          onClick={onToggleFavorite}
          className={`absolute top-8 right-8 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all ${isFavorite ? 'bg-gold-400 text-white shadow-gold-500/50' : 'bg-white/20 backdrop-blur text-white hover:bg-white/50'}`}
        >
          <i className={`${isFavorite ? 'fas animate-shake' : 'far'} fa-heart text-xl`}></i>
        </button>
      </div>

      <div className="px-8 max-w-4xl mx-auto -mt-32 relative z-10 pb-32">
        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-gold-900/5 border border-gold-50">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex text-gold-400 text-xs">
                  {[1, 2, 3, 4, 5].map(s => <i key={s} className="fas fa-star mr-1"></i>)}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-600">Categoría Platino</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tighter italic">{hotel.name}</h2>
              <p className="text-gray-400 flex items-center font-medium">
                <i className="fas fa-map-marker-alt text-gold-500 mr-2"></i>
                {hotel.address}
              </p>
            </div>
            <div className="bg-gold-50 p-6 rounded-3xl text-center min-w-[140px] border border-gold-100 shadow-inner">
              <p className="text-[10px] text-gold-600 font-black uppercase tracking-widest mb-1">Puntuación</p>
              <p className="text-4xl font-black text-gold-700">{hotel.rating.toFixed(1)}</p>
              <p className="text-[9px] text-gold-500/60 font-bold mt-1 uppercase">Excepcional</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: 'fa-wifi', label: 'WiFi VIP' },
              { icon: 'fa-spa', label: 'Suite Spa' },
              { icon: 'fa-glass-cheers', label: 'Lounge Bar' },
              { icon: 'fa-concierge-bell', label: 'Butler 24/7' }
            ].map((amenity, idx) => (
              <div key={idx} className="bg-gold-50/30 border border-gold-100/50 p-4 rounded-2xl flex flex-col items-center text-center group hover:bg-gold-500 transition-colors">
                <i className={`fas ${amenity.icon} text-gold-500 mb-2 group-hover:text-white`}></i>
                <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-white">{amenity.label}</span>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center uppercase tracking-tighter">
              <div className="w-1 h-6 bg-gold-500 mr-3 rounded-full"></div>
              Propuesta de Valor
            </h3>
            <p className="text-gray-500 leading-[1.8] font-medium text-lg italic opacity-90">
              {hotel.description} Esta propiedad ha sido seleccionada por LuxeStay por su inquebrantable compromiso con la excelencia y su capacidad para transformar una estancia ordinaria en un legado de recuerdos extraordinarios.
            </p>
          </div>

          {hotel.reviewSnippets && (
            <div className="mb-12">
               <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Reseñas Selectas</h3>
               <div className="grid md:grid-cols-2 gap-4">
                  {hotel.reviewSnippets.map((review, i) => (
                    <div key={i} className="bg-[#FAF9F6] p-6 rounded-3xl border-l-4 border-gold-400 relative">
                      <i className="fas fa-quote-left absolute top-4 right-4 text-gold-100 text-3xl"></i>
                      <p className="text-gray-500 italic text-sm font-medium leading-relaxed relative z-10">"{review}"</p>
                      <p className="mt-4 text-[9px] font-black text-gold-600 uppercase tracking-widest">— Crítico Verificado</p>
                    </div>
                  ))}
               </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 items-center border-t border-gold-50 pt-10">
             <div className="flex-1">
                <p className="text-[10px] text-gold-600 uppercase font-black tracking-[0.2em] mb-1">Tarifa Preferencial</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-gray-900">{formatXAF(hotel.pricePerNight)}</span>
                  <span className="text-gray-400 text-sm font-bold ml-3 italic">por noche de estancia</span>
                </div>
             </div>
             <button className="w-full sm:w-auto bg-gradient-to-r from-gold-400 to-gold-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-gold-200/50 hover:scale-[1.03] active:scale-95 transition-all">
                Asegurar Reserva
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;


import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gold-50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <Logo className="w-16 h-16 transform group-hover:scale-105 transition-transform duration-500" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">LuxeStay</h1>
            <span className="text-[8px] font-black text-gold-600 tracking-[0.4em] mt-1 uppercase">Boutique Experience</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] text-gold-500 font-black uppercase tracking-[0.2em]">Miembro de Honor</span>
            <p className="text-sm font-black text-gray-900">{userName}</p>
          </div>
          <button 
            onClick={() => { if (window.confirm("¿Desea concluir su estancia?")) onLogout(); }}
            className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gold-600 hover:bg-gold-50 rounded-2xl transition-all border border-transparent hover:border-gold-100"
          >
            <i className="fas fa-power-off text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

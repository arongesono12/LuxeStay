
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="gold-shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D17E" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Arco de 5 Estrellas */}
        <g fill="url(#gold-shine)">
          <path d="M36 24l1.2-2.4 1.2 2.4 2.4.4-1.8 1.8.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.8-1.8 2.4-.4z" />
          <path d="M43 21l1.2-2.4 1.2 2.4 2.4.4-1.8 1.8.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.8-1.8 2.4-.4z" />
          <path d="M50 19l1.2-2.4 1.2 2.4 2.4.4-1.8 1.8.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.8-1.8 2.4-.4z" />
          <path d="M57 21l1.2-2.4 1.2 2.4 2.4.4-1.8 1.8.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.8-1.8 2.4-.4z" />
          <path d="M64 24l1.2-2.4 1.2 2.4 2.4.4-1.8 1.8.4 2.4-2.2-1.2-2.2 1.2.4-2.4-1.8-1.8 2.4-.4z" />
        </g>

        {/* Letra L Estilizada */}
        <path 
          d="M32 26c0-2 2-3 4-3h4v44c0 2 2 4 8 4h20c4 0 6 2 6 5s-2 6-10 6H38c-8 0-12-6-12-14V30c0-2 2-4 6-4z" 
          fill="url(#gold-shine)" 
          filter="url(#gold-glow)"
        />

        {/* Edificio Hotel dentro de la L */}
        <g transform="translate(42, 30)" filter="url(#gold-glow)">
          <path d="M0 6h28v28H0z" fill="url(#gold-shine)" />
          {/* Ventanas y detalles */}
          <rect x="3" y="10" width="5" height="5" fill="white" fillOpacity="0.5" />
          <rect x="11" y="10" width="6" height="6" fill="white" fillOpacity="0.7" rx="0.5" />
          <rect x="20" y="10" width="5" height="5" fill="white" fillOpacity="0.5" />
          <rect x="3" y="18" width="5" height="5" fill="white" fillOpacity="0.5" />
          <rect x="11" y="18" width="6" height="6" fill="white" fillOpacity="0.7" rx="0.5" />
          <rect x="20" y="18" width="5" height="5" fill="white" fillOpacity="0.5" />
          {/* Puerta principal */}
          <path d="M10 28h8v6h-8z" fill="white" fillOpacity="0.4" />
          {/* Bandera arriba */}
          <path d="M14 0v6h7V2l-7-2z" fill="url(#gold-shine)" />
        </g>

        {/* Curva decorativa inferior del logo */}
        <path 
          d="M26 74c15-4 30 8 45 0 5-3 10-10 10-10s-5 12-15 15c-15 4-30-5-45 0-5 2-8 5-8 5s5-8 13-10z" 
          fill="url(#gold-shine)" 
        />
      </svg>
    </div>
  );
};

export default Logo;

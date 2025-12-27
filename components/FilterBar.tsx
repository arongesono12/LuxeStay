
import React from 'react';

interface FilterBarProps {
  onFilterChange: (type: string, value: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const filters = [
    { id: 'rating', icon: 'fa-star', label: 'Eminente (4.5+)', color: 'text-gold-500' },
    { id: 'price', icon: 'fa-gem', label: 'Ultra Lujo', color: 'text-gold-600' },
    { id: 'distance', icon: 'fa-map-pin', label: 'Cercanía Real', color: 'text-gold-400' },
  ];

  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar px-4">
      {filters.map(f => (
        <button 
          key={f.id}
          onClick={() => onFilterChange(f.id, true)}
          className="flex-shrink-0 px-6 py-3 rounded-2xl border border-gold-100 bg-white text-xs font-black uppercase tracking-widest text-gray-700 hover:border-gold-400 hover:bg-gold-50 transition-all flex items-center shadow-sm active:scale-95"
        >
          <i className={`fas ${f.icon} ${f.color} mr-3`}></i>
          {f.label}
        </button>
      ))}
      
      <button className="flex-shrink-0 w-12 h-12 rounded-2xl border border-gold-100 bg-white flex items-center justify-center text-gray-400 hover:border-gold-400 hover:text-gold-500 transition-all shadow-sm">
        <i className="fas fa-sliders-h"></i>
      </button>
    </div>
  );
};

export default FilterBar;

import React from 'react';
import { Country } from '../data/countries';
import { Landmark, MapPin } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

export const ContinentColors: Record<string, { bg: string; text: string; border: string }> = {
  "North America": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "South America": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Europe": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Asia": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "Africa": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Oceania": { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
};

export const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  const badge = ContinentColors[country.continent] || { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };

  return (
    <div
      id={`country-card-${country.code}`}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Flag Header */}
      <div className="relative w-full aspect-[3/2] bg-slate-50 overflow-hidden border-b border-slate-100">
        <img
          src={`https://flagcdn.com/w160/${country.code}.png`}
          alt={`${country.name} Flag`}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback content in case of offline or errors
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Continent Badge */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${badge.bg} ${badge.text} ${badge.border} backdrop-blur-[2px] shadow-xs`}>
          {country.continent}
        </span>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg group-hover:text-blue-600 transition-colors leading-tight">
            {country.name}
          </h3>
          
          <div className="mt-3 space-y-1 text-slate-600 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">Capital:</span>
              <span className="text-slate-700 font-medium truncate">{country.capital}</span>
            </div>

            <div className="flex items-center gap-1.5 pt-0.5">
              <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-500">Landmark:</span>
              <span className="text-slate-700 truncate text-xs">{country.landmark}</span>
            </div>
          </div>
        </div>

        {/* Currency & Code Footer info bar */}
        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span className="font-mono uppercase bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-bold">
              {country.code.toUpperCase()}
            </span>
            <span className="font-medium text-slate-500">Code</span>
          </div>
          <div className="text-right">
            <span className="font-medium text-slate-700 font-mono">{country.currency.symbol} {country.currency.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

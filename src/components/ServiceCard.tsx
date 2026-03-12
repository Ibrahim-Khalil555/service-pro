import { ArrowRight, Clock, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ServiceCardProps {
  id: number;
  icon: ReactNode;
  duration: string;
  title: string;
  description: string;
  price: number;
}

export default function ServiceCard({ id, icon, duration, title, description, price }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/checkout', { state: { service: { id, title, price, icon: title } } });
  };

  return (
    <div className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5">
      {/* Top Row: Icon and Duration */}
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200">
          {icon}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-500">
            <Star className="h-3 w-3 fill-current" />
            <span>Top Rated</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 flex-1">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Pricing and Action */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-gray-400">Starting from</span>
          <span className="text-2xl font-black text-slate-900">${price}</span>
        </div>
        <button 
          onClick={handleBookNow}
          className="relative flex items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <span>Book Now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}



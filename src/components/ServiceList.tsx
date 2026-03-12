import { 
  Wrench, 
  Car, 
  Droplet, 
  Zap, 
  Paintbrush, 
  Sparkles, 
  Wind, 
  Hammer, 
  Monitor, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

// Icon mapping helper
const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Wrench: <Wrench className="h-6 w-6" />,
    Car: <Car className="h-6 w-6" />,
    Droplet: <Droplet className="h-6 w-6" />,
    Zap: <Zap className="h-6 w-6" />,
    Paintbrush: <Paintbrush className="h-6 w-6" />,
    Sparkles: <Sparkles className="h-6 w-6" />,
    Wind: <Wind className="h-6 w-6" />,
    Hammer: <Hammer className="h-6 w-6" />,
    Monitor: <Monitor className="h-6 w-6" />,
    Settings: <Settings className="h-6 w-6" />,
  };
  return icons[iconName] || <Settings className="h-6 w-6" />;
};

interface ServiceListProps {
  searchQuery: string;
  sortOption: string;
}

export default function ServiceList({ searchQuery, sortOption }: ServiceListProps) {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Could not load services. Please ensure Firebase is connected and seeded.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter logic
  const filteredServices = services.filter((service) => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesSearch;
  });

  // Sorting logic
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOption === 'Price: Low to High') {
      return a.price - b.price;
    } else if (sortOption === 'Price: High to Low') {
      return b.price - a.price;
    }
    return 0; // Default: preserve original order
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
        <span className="font-medium text-lg">Loading services…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-6">
          <Settings className="h-8 w-8 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Connection Required</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500">
          Showing {sortedServices.length} {sortedServices.length === 1 ? 'service' : 'services'}
        </p>
      </div>

      {/* Grid */}
      {sortedServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              {...service} 
              icon={getIcon(service.iconName || 'Settings')} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-gray-500">No services matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

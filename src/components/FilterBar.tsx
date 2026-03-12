import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
}

const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low'];

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  sortOption,
  setSortOption
}: FilterBarProps) {
  return (
    <div id="filter-bar" className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-16 lg:px-8">
      
      {/* Premium Search Bar */}
      <div className="group relative w-full sm:flex-1 sm:max-w-2xl transition-all duration-300">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors sm:h-6 sm:w-6" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-6 text-base font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 sm:py-5 sm:pl-16 sm:text-lg"
          placeholder="Search for services..."
        />
      </div>

      {/* Sophisticated Sort Component */}
      <div className="relative w-full sm:w-auto sm:shrink-0">
        <div className="group flex h-[64px] items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 shadow-sm transition-all duration-300 hover:border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/5 sm:h-[68px]">
          <ArrowUpDown className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors sm:h-5 sm:w-5" />
          <div className="relative flex-1 sm:flex-initial flex items-center">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full bg-transparent pr-10 text-sm font-bold text-slate-800 outline-none cursor-pointer sm:text-base border-none focus:ring-0"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option === 'Default' ? 'Sort By' : option.replace('Price: ', '')}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>

    </div>
  );
}


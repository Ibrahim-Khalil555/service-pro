import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ServiceList from '../components/ServiceList';

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Default');

  return (
    <div className="flex flex-col bg-white">
      {/* Header Space */}
      <div className="bg-slate-50 border-b border-slate-100 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto">
            Explore our wide range of professional automotive and home services, 
            tailored to meet your needs with precision and care.
          </p>
        </div>
      </div>

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      <div className="pb-20">
        <ServiceList 
          searchQuery={searchQuery}
          sortOption={sortOption}
        />
      </div>
    </div>
  );
}

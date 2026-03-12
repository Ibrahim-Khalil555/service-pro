import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ServiceList from '../components/ServiceList';
import Hero from '../components/Hero';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Default');

  return (
    <div className="flex flex-col">
      <Hero />
      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <ServiceList 
        searchQuery={searchQuery}
        sortOption={sortOption}
      />
    </div>
  );
}

// src/components/FilterDropdown.tsx
import React, { useState } from "react";

interface FilterDropdownProps {
  onFilterSelect: (value: string) => void;
  filterOptions: { key: string; value: string }[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onFilterSelect,
  filterOptions,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);
    onFilterSelect(selectedValue);
  };

  return (
    <div className="flex">
      <label htmlFor="filterDropdown" className="sr-only">
        Filter By:
      </label>
      <select
        id="filterDropdown"
        className="px-4 py-2 border rounded-md border-gray-300 text-black dark:bg-gray-600 dark:text-white outline outline-gray-700 dark:outline-black z-10 cursor-pointer"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        {filterOptions.map((filter) => (
          <option key={filter.key} value={filter.value}>
            {filter.key}
          </option>
        ))}
      </select>
      <div className="mr-2"></div>
    </div>
  );
};

export default FilterDropdown;

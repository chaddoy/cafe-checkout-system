import type { ChangeEvent } from 'react';
import type { SortBy } from '../../types';
import type { SortBarProps } from './types';

const SortBar = ({
  products,
  sortOptions,
  sortBy = null,
  setSortBy,
}: SortBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortBy;
    setSortBy(value || null);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <div className="text-sm text-gray-600">{products.length} products</div>

      <div className="flex items-center gap-3">
        <label htmlFor="sort" className="text-sm font-medium">
          Sort by:
        </label>
        <select
          name="sort"
          id="sort"
          className="border p-2 rounded-md"
          value={sortBy ?? ''}
          onChange={handleChange}
        >
          <option value="">None</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {sortBy && (
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md"
            onClick={() => setSortBy(null)}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default SortBar;

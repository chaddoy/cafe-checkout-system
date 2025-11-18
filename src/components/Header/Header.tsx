import type { HeaderProps } from './types';
import { useAppDispatch } from '../../store';
import { setSearchQuery } from '../../store/slices/product.slice';

const Header = ({ searchQuery, handleSearchChange }: HeaderProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between my-5">
      <h1 className="text-2xl font-bold">Cafe Checkout System</h1>

      <div className="flex w-full gap-2 lg:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 rounded-md w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <button
          type="button"
          className="bg-gray-200 text-gray-800 p-2 rounded-md"
          onClick={() => dispatch(setSearchQuery(''))}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Header;

import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search projects by title or technology..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;

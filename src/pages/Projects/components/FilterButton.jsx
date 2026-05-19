const FilterButton = ({ category, activeCategory, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        activeCategory === category
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {category}
    </button>
  );
};

export default FilterButton;

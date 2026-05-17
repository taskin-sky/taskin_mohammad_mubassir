// Remove in productionimport { useTheme } from '../../context/ThemeContext'

export default function ThemeDebugger() {
  const { isDark, toggleTheme } = useTheme();

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black bg-opacity-80 text-white p-2 rounded-lg text-xs">
      Theme: {isDark ? 'Dark' : 'Light'}
      <button onClick={toggleTheme} className="ml-2 px-1 bg-blue-500 rounded">
        Toggle
      </button>
    </div>
  );
}

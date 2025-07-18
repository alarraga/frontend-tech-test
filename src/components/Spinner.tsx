const Spinner = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-blue-500 border-gray-300" />
    <span className="ml-2 text-sm text-gray-500">Loading...</span>
  </div>
);

export default Spinner;

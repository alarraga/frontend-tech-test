interface Props {
  currency: string;
  status: string;
  setCurrency: (value: string) => void;
  setStatus: (value: string) => void;
  disabled: boolean;
}

const Filters: React.FC<Props> = ({ currency, status, setCurrency, setStatus, disabled }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
      <select
        disabled={disabled}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option value="">All</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="AUD">AUD</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        disabled={disabled}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <option value="">All</option>
        <option value="Success">Success</option>
        <option value="Failed">Failed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  </div>
);

export default Filters;

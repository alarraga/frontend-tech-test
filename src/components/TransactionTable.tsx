import { Transaction } from '../types';
import Spinner from './Spinner';

interface Props {
  transactions: Transaction[];
  loading: boolean;
  isFilterLoading: boolean;
  longLoad: boolean;
}

const statusColors: Record<string, string> = {
  Success: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
};

const TransactionTable: React.FC<Props> = ({ transactions, loading, isFilterLoading, longLoad }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border">Amount</th>
            <th className="px-4 py-3 border">Currency</th>
            <th className="px-4 py-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {isFilterLoading ? (
            <tr>
              <td colSpan={3} className="py-6 text-center">
                <Spinner />
                {longLoad && (
                  <p className="text-xs text-gray-400 mt-2">
                    This is taking longer than usual...
                  </p>
                )}
              </td>
            </tr>
          ) : loading && transactions.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-6 text-center">
                <Spinner />
                {longLoad && (
                  <p className="text-xs text-gray-400 mt-2">
                    This is taking longer than usual...
                  </p>
                )}
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-6 text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx, idx) => (
              <tr key={idx} className="even:bg-white odd:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border">${tx.amount.toFixed(2)}</td>
                <td className="px-4 py-2 border">{tx.currency}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[tx.status] || 'bg-gray-100 text-gray-700'}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

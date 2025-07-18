'use client';

import { useEffect, useState, useCallback } from 'react';
import { Transaction } from '../types';
import Filters from '../components/Filters';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currency, setCurrency] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [longLoad, setLongLoad] = useState(false);
  const [error, setError] = useState('');
  const [waitingForNewData, setWaitingForNewData] = useState(false);


  const fetchData = useCallback(async (retryCount = 3, delay = 1000) => {
    setLoading(true);
    setWaitingForNewData(true); // start waiting
    setError('');
    let attempt = 0;

    while (attempt < retryCount) {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          ...(currency && { currency }),
          ...(status && { status }),
        });

        const res = await fetch(`/api/transactions?${params}`);
        if (!res.ok) throw new Error('Server error');

        const data = await res.json();
        setTransactions(data.data);
        setTotalPages(data.totalPages);
        return;
      } catch (err) {
        attempt++;
        if (attempt === retryCount) {
          setError('Something went wrong. Please try again later.');
          setTransactions([]); // also clear bad data on final failure
        } else {
          await new Promise((r) => setTimeout(r, delay * attempt));
        }
      } finally {
        setLoading(false);
        setWaitingForNewData(false); // done waiting
      }
    }
  }, [page, pageSize, currency, status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLongLoad(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setLongLoad(false);
    }
  }, [loading]);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transaction Management</h1>

      <Filters
        currency={currency}
        status={status}
        setCurrency={setCurrency}
        setStatus={setStatus}
        disabled={loading}
      />

      <TransactionTable
        transactions={transactions}
        loading={loading && transactions.length === 0}
        isFilterLoading={waitingForNewData && transactions.length > 0}
        longLoad={longLoad}
      />

      {error && transactions.length === 0 && (
        <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
      )}

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </main>
  );
}

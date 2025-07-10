import { mockTransactions } from '@/__mock__';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const sizeParam = url.searchParams.get('pageSize');
  const page = pageParam ? parseInt(pageParam, 10) : undefined;
  const pageSize = sizeParam ? parseInt(sizeParam, 10) : undefined;
  const currency = url.searchParams.get('currency');
  const status = url.searchParams.get('status');

  // Simulate random 500 errors (30%) and artificial delays (30%)
  const rand = Math.random();
  if (rand < 0.3) {
    return NextResponse.json({ error: 'Random Failure' }, { status: 500 });
  }
  if (rand < 0.6) {
    await new Promise((r) => setTimeout(r, 10000));
  }

  // Filter data
  const filtered = mockTransactions
    .filter((transaction) => !currency || transaction.currency === currency)
    .filter((transaction) => !status || transaction.status === status);

  // If no pagination params provided, return all
  if (page === undefined && pageSize === undefined) {
    return NextResponse.json({ data: filtered, total: filtered.length });
  }

  // Apply pagination
  const total = filtered.length;
  const totalPages = pageSize ? Math.ceil(total / pageSize) : 1;
  const currentPage = page || 1;
  const size = pageSize || total;
  const start = (currentPage - 1) * size;
  const end = start + size;
  const data = filtered.slice(start, end);

  return NextResponse.json({
    data,
    page: currentPage,
    pageSize: size,
    total,
    totalPages,
  });
}

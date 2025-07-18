interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, setPage }) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={() => setPage(Math.max(page - 1, 1))}
      disabled={page === 1}
      className="px-4 py-2 border rounded-xl bg-white shadow text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      Prev
    </button>
    <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
    <button
      onClick={() => setPage(Math.min(page + 1, totalPages))}
      disabled={page === totalPages}
      className="px-4 py-2 border rounded-xl bg-white shadow text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;

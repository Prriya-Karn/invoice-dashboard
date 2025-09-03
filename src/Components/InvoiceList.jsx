import { useMemo, useState } from "react";
import InvoiceRow from "./InvoiceRow";

const statuses = ["All", "Approved", "Pending", "Mismatch"];

export default function InvoiceList({ invoices, onOpen }) {
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const perPage = 5;

    const filtered = useMemo(() => {
        return invoices.filter((inv) => {
            const hay = [inv.vendor, inv.invoiceNumber, inv.poNumber].join(" ").toLowerCase();
            const matchesQ = q ? hay.includes(q.toLowerCase()) : true;
            const matchesStatus = status === "All" ? true : inv.status === status;
            return matchesQ && matchesStatus;
        });
    }, [q, status, invoices]);
    const paginated = useMemo(() => {
        const start = (page - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, page]);


    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="mb-3 flex flex-wrap items-center gap-3">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search vendor, invoice#, PO#"
                    className="w-full md:w-72 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                >
                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs text-gray-500">
                <div className="col-span-3">Vendor</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Invoice #</div>
                <div className="col-span-2">PO #</div>
                <div className="col-span-1">Due</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
                {paginated.map((inv) => (
                    <InvoiceRow key={inv.id} invoice={inv} onOpen={onOpen} />
                ))}
                {paginated.length === 0 && (
                    <div className="p-6 text-center text-sm text-gray-500">No invoices found.</div>
                )}
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    disabled={page * perPage >= filtered.length}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 text-sm rounded-lg border disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}

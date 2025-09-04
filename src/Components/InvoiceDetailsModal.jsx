import toast from "react-hot-toast";

export default function InvoiceDetailsModal({ open, onClose, invoice, setInvoices }) {
    if (!open || !invoice) return null;

    const updateStatus = (status, reason = "") => {
        setInvoices(prev =>
            prev.map(inv =>
                inv.id === invoice.id ? { ...inv, status, mismatchReason: reason } : inv
            )
        );
        toast.success(`Invoice ${status} successfully! ✅`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg relative">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Invoice Details</h3>
                    <button onClick={onClose} className="rounded-lg px-2 py-1 text-sm ring-1 ring-gray-300 hover:bg-gray-100">
                        X
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Vendor:</span> <span className="font-medium">{invoice.vendor}</span></div>
                    <div><span className="text-gray-500">Invoice #:</span> <span className="font-medium">{invoice.invoiceNumber}</span></div>
                    <div><span className="text-gray-500">PO #:</span> <span className="font-medium">{invoice.poNumber}</span></div>
                    <div><span className="text-gray-500">Status:</span> <span className="font-medium">{invoice.status}</span></div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={() => updateStatus("Approved")}
                        className="rounded-lg bg-gray-900 text-white px-3 py-1.5 text-sm hover:opacity-90"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}

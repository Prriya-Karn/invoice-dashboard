import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

export default function InvoiceDetailsModal({ open, onClose, invoice }) {
    const queryClient = useQueryClient();

    if (!open || !invoice) return null;

    // 🔹 Update status in API + refresh dashboard
    const updateStatus = async (status, reason = "") => {
        try {
            await axios.patch(`http://localhost:4000/invoices/${invoice.id}`, {
                status,
                mismatchReason: reason,
            });
            queryClient.invalidateQueries(["invoices"]); // refresh
            onClose();
        } catch (err) {
            console.error("Error updating invoice:", err);
        }
    };


    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg relative">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Invoice Details</h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-2 py-1 text-sm ring-1 ring-gray-300 hover:bg-gray-100"
                    >
                        <X />
                    </button>
                </div>

                {/* Details */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <span className="text-gray-500">Vendor:</span>{" "}
                        <span className="font-medium">{invoice.vendor}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Invoice #:</span>{" "}
                        <span className="font-medium">{invoice.invoiceNumber}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">PO #:</span>{" "}
                        <span className="font-medium">{invoice.poNumber}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Status:</span>{" "}
                        <span
                            className={`font-medium ${invoice.status === "Approved"
                                ? "text-green-600"
                                : invoice.status === "Mismatch"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }`}
                        >
                            {invoice.status}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Due in:</span>{" "}
                        <span className="font-medium">{invoice.dueInDays} days</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Date:</span>{" "}
                        <span className="font-medium">{invoice.date}</span>
                    </div>

                    {/* Show mismatch reason if exists */}
                    {invoice.status === "Mismatch" && (
                        <div className="col-span-2">
                            <span className="text-gray-500">Reason:</span>{" "}
                            <span className="font-medium text-red-600">
                                {invoice.mismatchReason}
                            </span>
                        </div>
                    )}
                </div>

                {/* Actions */}
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

import { X } from "lucide-react";
import AddInvoiceForm from "./AddInvoiceForm";


export default function AddInvoiceModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add New Invoice</h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg px-2 py-1 text-sm ring-1 ring-gray-300 hover:bg-gray-100"
                    >
                        <X />
                    </button>
                </div>
                <AddInvoiceForm onSuccess={onClose} /> {/* pass onClose to close after submit */}
            </div>
        </div>
    );
}

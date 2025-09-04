import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";

const currency = (n) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function InvoiceRow({ invoice, onOpen }) {
    return (
        <div className="grid grid-cols-12 items-center gap-2 px-3 py-3 hover:bg-gray-50 rounded-xl">
            <div className="col-span-2  xl:font-medium">{invoice.vendor}</div>
            <div className="col-span-2">{currency(invoice.amount)}</div>
            <div className="col-span-2">{invoice.invoiceNumber}</div>
            <div className="col-span-2">{invoice.poNumber}</div>
            <div className="col-span-1">{invoice.dueInDays}d</div>
            <div className="col-span-2 flex items-center  gap-2">
                <StatusBadge status={invoice.status} />
            </div>

            <button onClick={() => onOpen(invoice)}
                className="inline-flex items-center justify-center rounded-lg  px-2 cursor-pointer"
                >
                <Eye size={16} />
            </button>
        </div>
    );
}

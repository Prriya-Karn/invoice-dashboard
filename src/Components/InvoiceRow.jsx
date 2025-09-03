import StatusBadge from "./StatusBadge";

const currency = (n) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);

export default function InvoiceRow({ invoice, onOpen }) {
    return (
        <div className="grid grid-cols-12 items-center gap-2 px-3 py-3 hover:bg-gray-50 rounded-xl">
            <div className="col-span-3 font-medium">{invoice.vendor}</div>
            <div className="col-span-2">{currency(invoice.amount)}</div>
            <div className="col-span-2">{invoice.invoiceNumber}</div>
            <div className="col-span-2">{invoice.poNumber}</div>
            <div className="col-span-1">{invoice.dueInDays}d</div>
            <div className="col-span-2 flex items-center justify-end gap-2">
                <StatusBadge status={invoice.status} />
                <button
                    onClick={() => onOpen(invoice)}
                    className="px-3 py-1.5 text-sm rounded-lg ring-1 ring-gray-300 hover:bg-gray-100"
                >
                    View
                </button>
            </div>
        </div>
    );
}

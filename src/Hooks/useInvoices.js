import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchData() {
    const [poRes, invoiceRes] = await Promise.all([
        axios.get("http://localhost:4000/purchaseOrders"),
        axios.get("http://localhost:4000/invoices"),
    ]);

    const pos = poRes.data;

    return invoiceRes.data.map(inv => {
        // If invoice already approved, don’t override
        if (inv.status === "Approved") return inv;

        const po = pos.find(p => p.poNumber === inv.poNumber);

        if (!po) {
            return { ...inv, status: "Mismatch", mismatchReason: "PO not found" };
        }

        if (po.vendor !== inv.vendor) {
            return { ...inv, status: "Mismatch", mismatchReason: "Vendor does not match PO" };
        }

        if (po.amount !== inv.amount) {
            return { ...inv, status: "Mismatch", mismatchReason: "Amount does not match PO" };
        }

        // If all good → default Pending
        return { ...inv, status: "Pending", mismatchReason: "" };
    });
}




export default function useInvoices() {
    return useQuery({
        queryKey: ["invoices"],
        queryFn: fetchData,
    });
}

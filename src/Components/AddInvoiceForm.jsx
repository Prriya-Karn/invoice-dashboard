import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function AddInvoiceForm() {
    const [form, setForm] = useState({
        vendor: "",
        amount: "",
        poNumber: "",
        invoiceNumber: "",
        date: "",
        status: "Pending",
        dueInDays: 7,
    });

    const queryClient = useQueryClient();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/invoices", {
            ...form,
            amount: parseFloat(form.amount),
        });
        queryClient.invalidateQueries(["invoices"]);
        setForm({ vendor: "", amount: "", poNumber: "", invoiceNumber: "", date: "", status: "Pending", dueInDays: 7 });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-sm border space-y-3">
            <h3 className="font-semibold text-lg">Add New Invoice</h3>
            <input name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor" className="w-full border px-3 py-2 rounded-lg" />
            <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" className="w-full border px-3 py-2 rounded-lg" />
            <input name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} placeholder="Invoice #" className="w-full border px-3 py-2 rounded-lg" />
            <input name="poNumber" value={form.poNumber} onChange={handleChange} placeholder="PO #" className="w-full border px-3 py-2 rounded-lg" />
            <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" />
            <button className="w-full bg-black text-white py-2 rounded-lg">Add Invoice</button>
        </form>
    );
}

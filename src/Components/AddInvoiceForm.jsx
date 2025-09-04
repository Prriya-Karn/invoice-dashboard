import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import styles
import toast from "react-hot-toast";

export default function AddInvoiceForm({ onSuccess }) {
  const [form, setForm] = useState({
    vendor: "",
    amount: "",
    poNumber: "",
    invoiceNumber: "",
    date: null, // change to null for DatePicker
    status: "Pending",
    dueInDays: 7,
  });

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  await axios.post("/api/invoices", {
    ...form,
    amount: parseFloat(form.amount),
    date: form.date ? form.date.toISOString().split("T")[0] : null,
  });
  queryClient.invalidateQueries(["invoices"]);
  toast.success("Invoice added successfully!");

  setForm({
    vendor: "",
    amount: "",
    poNumber: "",
    invoiceNumber: "",
    date: null,
    status: "Pending",
    dueInDays: 7,
  });
  if (onSuccess) onSuccess();
};

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-sm space-y-3">
      <input
        name="vendor"
        value={form.vendor}
        onChange={handleChange}
        placeholder="Vendor"
        className="w-full border px-3 py-2 rounded-lg"
      />
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border px-3 py-2 rounded-lg"
      />
      <input
        name="invoiceNumber"
        value={form.invoiceNumber}
        onChange={handleChange}
        placeholder="Invoice #"
        className="w-full border px-3 py-2 rounded-lg"
      />
      <input
        name="poNumber"
        value={form.poNumber}
        onChange={handleChange}
        placeholder="PO #"
        className="w-full border px-3 py-2 rounded-lg"
      />

<div className="w-full border rounded-lg">
  <DatePicker
    selected={form.date}
    onChange={handleDateChange}
    placeholderText="Select Invoice Date"
    dateFormat="yyyy-MM-dd"
    className="w-full px-3 py-2 bg-white rounded-lg focus:outline-none"
    wrapperClassName="w-full border rounded-lg"
  />
</div>



      <button className="w-full bg-black text-white py-2 rounded-lg">Add Invoice</button>
    </form>
  );
}

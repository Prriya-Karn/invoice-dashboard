import { useState } from "react";
import { motion } from "framer-motion";
import SummaryCard from "./components/SummaryCard";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import AddInvoiceForm from "./components/AddInvoiceForm";
import useInvoices from "./hooks/useInvoices";
import InvoiceChart from "./components/InvoiceChart";

export default function App() {
  const { data: invoices = [], isLoading, isError } = useInvoices();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const count = (status) => invoices.filter((i) => i.status === status).length;
  const total = invoices.length || 1;

  const metrics = {
    approvedPct: Math.round((count("Approved") / total) * 100),
    pendingPct: Math.round((count("Pending") / total) * 100),
    mismatchPct: Math.round((count("Mismatch") / total) * 100),
    total,
  };

  if (isLoading) return <div className="p-10">Loading invoices...</div>;
  if (isError) return <div className="p-10 text-red-600">Failed to load invoices</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">InvoiceApp</h2>
        <nav className="space-y-4">
          <a className="block font-medium text-gray-700 hover:text-black">📊 Dashboard</a>
          <a className="block font-medium text-gray-700 hover:text-black">📄 Invoices</a>
          <a className="block font-medium text-gray-700 hover:text-black">⚙️ Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Invoice Automation Dashboard</h1>
          <span className="text-sm text-gray-500">{metrics.total} invoices</span>
        </header>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <SummaryCard title="Approved" value={`${metrics.approvedPct}%`} percent={metrics.approvedPct} />
          <SummaryCard title="Pending" value={`${metrics.pendingPct}%`} percent={metrics.pendingPct} />
          <SummaryCard title="Mismatched" value={`${metrics.mismatchPct}%`} percent={metrics.mismatchPct} />
        </motion.div>

        {/* Chart + Add Invoice + List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <InvoiceChart invoices={invoices} />
            <AddInvoiceForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <InvoiceList invoices={invoices} onOpen={(inv) => { setCurrent(inv); setOpen(true); }} />
          </motion.div>
        </div>

        <InvoiceDetailsModal open={open} onClose={() => setOpen(false)} invoice={current} />
      </main>
    </div>
  );
}

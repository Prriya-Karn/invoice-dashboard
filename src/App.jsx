import { useState } from "react";
import { motion } from "framer-motion";
import SummaryCard from "./components/SummaryCard";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetailsModal from "./components/InvoiceDetailsModal";
import useInvoices from "./hooks/useInvoices";
import InvoiceChart from "./components/InvoiceChart";
import AddInvoiceModal from "./components/AddInvoiceModal";
import InvoiceBarChart from "./components/InvoiceBarChart";
import { Menu, X } from "lucide-react";


export default function App() {
  const { data: invoices = [], isLoading, isError } = useInvoices();
  console.log(invoices)
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <aside
        className={`
    fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl p-6 transform
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    transition-transform duration-300 ease-in-out
    lg:translate-x-0 lg:static lg:inset-auto
  `}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">InvoiceApp</h2>
          {/* Close button for mobile */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-4">
          <a className="block font-medium text-gray-700 hover:text-black">📊 Dashboard</a>
          <a className="block font-medium text-gray-700 hover:text-black">📄 Invoices</a>
          <a className="block font-medium text-gray-700 hover:text-black">⚙️ Settings</a>
        </nav>

        {/* Add Invoice button visible only below lg */}
        <div className="mt-10 lg:hidden">
          <button
            onClick={() => {
              setAddOpen(true);
              setSidebarOpen(false);
            }}
            className="w-full bg-black text-white py-2 px-4 rounded-lg"
          >
            ➕ Add Invoice
          </button>
        </div>
      </aside>


      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {/* Hamburger for mobile */}
            <button
              className="lg:hidden p-2 rounded-md border"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>
            <h1 className="lg:text-3xl text-xl sm:text-2xl font-bold">Invoice Automation Dashboard</h1>
          </div>
          <div className="flex justify-between gap-5 items-center">

            <button
              onClick={() => setAddOpen(true)}
              className="hidden lg:inline-block bg-black text-white py-2 px-4 cursor-pointer rounded-lg"
            >
              Add Invoice
            </button>


            <span className="text-sm text-gray-500">{metrics.total} invoices</span>
          </div>
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

        {/* Chart + List */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <InvoiceList invoices={invoices} onOpen={(inv) => { setCurrent(inv); setOpen(true); }} />
          </motion.div>

          <div className="grid w-full gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <InvoiceChart invoices={invoices} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <InvoiceBarChart invoices={invoices} />
            </motion.div>
          </div>
        </div>

        <InvoiceDetailsModal open={open} onClose={() => setOpen(false)} invoice={current} />
        <AddInvoiceModal open={addOpen} onClose={() => setAddOpen(false)} />
      </main>
    </div>
  );
}

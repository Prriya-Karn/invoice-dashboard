import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function InvoiceBarChart({ invoices }) {
    const data = [
        { status: "Approved", count: invoices.filter(i => i.status === "Approved").length },
        { status: "Pending", count: invoices.filter(i => i.status === "Pending").length },
        { status: "Mismatch", count: invoices.filter(i => i.status === "Mismatch").length },
    ];

    const COLORS = {
        Approved: "#22c55e",
        Pending: "#facc15",
        Mismatch: "#ef4444",
    };

    return (
        <div className="bg-white h-full p-4 rounded-2xl shadow-sm">
            <h3 className="text-sm font-medium mb-4">Invoice Status Overview</h3>
            {/* Force same height */}
            <div style={{ height: "256px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

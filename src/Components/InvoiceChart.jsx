import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function InvoiceChart({ invoices }) {
    const data = [
        { name: "Approved", value: invoices.filter((i) => i.status === "Approved").length },
        { name: "Pending", value: invoices.filter((i) => i.status === "Pending").length },
        { name: "Mismatch", value: invoices.filter((i) => i.status === "Mismatch").length },
    ];

    return (
        <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Invoices by Status</h3>
            <div style={{ height: "256px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

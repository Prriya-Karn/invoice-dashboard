import ProgressBar from "./ProgressBar";

export default function SummaryCard({ title, value, percent }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="flex items-baseline justify-between">
                <h3 className="text-sm text-gray-600">{title}</h3>
                <span className="text-xs text-gray-400">{percent}%</span>
            </div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
            <div className="mt-3">
                <ProgressBar value={percent} />
            </div>
        </div>
    );
}

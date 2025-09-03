import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

const color = {
    Approved: "text-green-700 bg-green-100 ring-green-200",
    Pending: "text-yellow-700 bg-yellow-100 ring-yellow-200",
    Mismatch: "text-red-700 bg-red-100 ring-red-200",
};

const Icon = ({ status }) => {
    if (status === "Approved") return <CheckCircle size={16} />;
    if (status === "Pending") return <Clock size={16} />;
    return <AlertTriangle size={16} />;
};

export default function StatusBadge({ status }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ring-1 ${color[status]}`}>
            <Icon status={status} />
            <span className="text-xs font-medium">{status}</span>
        </span>
    );
}

export default function ProgressBar({ value }) {
    return (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="h-full bg-gray-900 transition-all duration-500"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}

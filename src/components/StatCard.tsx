import "./StatCard.css";

interface StatCardProps {
    label: string;
    value: string;
    detail: string;
}

function StatCard ({ label, value, detail }: StatCardProps){
    return (
        <div className="stat-card">
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
            <p className="stat-detail">{detail}</p>
        </div>
    )
}

export default StatCard;
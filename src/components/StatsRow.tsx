import StatCard from "./StatCard";
import type { JobApplication } from "../types/JobApplication";
import { needsFollowUp, getResponseDueInDays } from "../utils/followUp";

interface StatsRowProps {
  applications: JobApplication[];
}

function StatsRow({ applications }: StatsRowProps) {
  const total = applications.length;
  const companyCount = new Set(applications.map((app) => app.company.toLowerCase().trim())).size;

  const inInterview = applications.filter((app) => app.status === "Interview").length;

  const offers = applications.filter((app) => app.status === "Offer").length;

  const responded = applications.filter(
    (app) => app.status === "Offer" || app.status === "Rejected"
  ).length;
  const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);

    const followUpCount = applications.filter(needsFollowUp).length;

    const interviewsWithDueDate = applications
    .filter((app) => app.status === "Interview")
    .map((app) => getResponseDueInDays(app))
    .filter((days): days is number => days !== null);

    const nextResponseDue = interviewsWithDueDate.length > 0 ? Math.min(...interviewsWithDueDate) : null;

  return (
    <div className="stats-row">
      <StatCard
        label="Total applications"
        value={String(total)}
        detail={`Across ${companyCount} companies`}
      />
            <StatCard
        label="In interview"
        value={String(inInterview)}
        detail={followUpCount > 0 ? `${followUpCount} need follow-up` : "Awaiting outcome"}
        />
        <StatCard
        label="Offers"
        value={String(offers)}
        detail={
            nextResponseDue !== null
            ? nextResponseDue >= 0
                ? `Response due in ${nextResponseDue} days`
                : "Response overdue"
            : "Total received"
        }
        />
      <StatCard
        label="Response rate"
        value={`${responseRate}%`}
        detail={`${responded} responses received`}
      />
    </div>
  );
}

export default StatsRow;
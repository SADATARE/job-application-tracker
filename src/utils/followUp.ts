import type { JobApplication } from '../types/JobApplication';

const FOLLOW_UP_DAYS = 7;
const RESPONSE_WINDOW_DAYS = 5;

function daysSince(dateString: string): number {
    const then = new Date(dateString).getTime();
    const now = new Date().getTime();
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor((now - then) / msPerDay)
}

export function needsFollowUp(app: JobApplication): boolean {
    if (app.status !== 'Applied' && app.status !== 'Interview') return false;
    return daysSince(app.lastUpdated) >= FOLLOW_UP_DAYS
}

export function getResponseDueInDays(app: JobApplication): number | null{
    if(app.status !== 'Interview') return null;
    const daysLeft = RESPONSE_WINDOW_DAYS - daysSince(app.lastUpdated);
    return daysLeft;
}
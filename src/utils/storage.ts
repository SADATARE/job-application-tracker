import type { JobApplication } from "../types/JobApplication";

const STORAGE_KEY = "trackr-applications";

export function loadApplications(): JobApplication[] | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as JobApplication[];
  } catch {
    return null;
  }
}

export function saveApplications(applications: JobApplication[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}
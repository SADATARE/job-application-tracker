export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: Status;
  postingUrl?: string;
  lastUpdated: string;
}

export type ApplicationFormData = Omit<JobApplication, "id" | "lastUpdated">;
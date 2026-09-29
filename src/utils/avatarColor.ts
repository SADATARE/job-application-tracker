const colors = ["#3b82f6", "#f97316", "#ec4899", "#22c55e", "#a855f7", "#eab308"];

export function getAvatarColor(company: string): string {
  const normalized = company.toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
export function formatDate(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-");
  if (!day) return iso;
  return `${year}. ${Number(month)}. ${Number(day)}.`;
}

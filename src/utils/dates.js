export function addDays(dateString , days) {
    const n = Number(days);
    if (!dateString || Number.isNaN(n)) return "";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "";
    d.setUTCDate(d.getUTCDate() + n); // "2026/10/11 is UTC date"
    return d.toISOString().slice(0 , 10); // back to "YYYY-MM-DD"
}

export function formatDate(value) {
  if (typeof value !== "string" || !value.includes("-")) return "--/--/----";
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
}
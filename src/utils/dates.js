export function addDays(dateString , days) {
    if (!dateString) return "";
    const d = new Date(dateString);
    d.setUTCDate(d.getUTCDate() + Number(days)); // "2026/10/11 is UTC date"
    return d.toISOString().slice(0 , 10); // back to "YYYY-MM-DD"
}
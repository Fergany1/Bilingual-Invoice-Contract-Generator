export function formatMoney(amount , currency ) {
    return new Intl.NumberFormat("en-US" , {
        style: 'currency',
        currency : currency || "EGP",
        minimumFractionDigits: 2,
    }).format(amount || 0);
}
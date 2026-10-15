// Two Helpers
export const toNum = (v) => parseFloat(v) || 0; // convert str to number
export const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100; // rounds to 2 decimal places 

export function calculateTotals(items , {taxRate = 0 , discount = 0 , amountPaid = 0} = {}) {
    const lines = items.map((item) => ({
        ...item,
        lineTotal: round2(toNum(item.quantity) * toNum(item.price))
    }));

    // reduce() adds up list , starts at 0 then add each line to the sum
    const subTotal = round2(lines.reduce((sum , l) => sum + l.lineTotal , 0));
    
    const discountAmount = Math.min(round2(toNum(discount)) , subTotal);
    const taxable = round2(subTotal - discountAmount);
    const tax = round2((taxable * toNum(taxRate)) / 100); // to get the numeric value of the tax percent(14%)

    const grandTotal = round2(taxable + tax);
    const balanceDue = round2(grandTotal - toNum(amountPaid));

    return{
        lines,
        subTotal,
        discountAmount,
        taxable,
        tax,
        grandTotal,
        balanceDue,
        toNum
    }
}

export function calculateTotals(items , taxRate = 0.10) {
    // 1. Get the sub-total using reduce()
    const subTotal = items.reduce((accumulator , item) => {
        // convert str -> Num OR Default to 0 if empty
        const currentPrice = parseFloat(item.price) || 0;
        const currentQuantity = parseFloat(item.quantity) || 0;

        // price * quantity and adds it up to accumulator
        return accumulator + (currentPrice * currentQuantity)
    } , 0)

    // 2. get estimated Tax 10%
    const tax = subTotal * taxRate;
    const grandTotal = tax + subTotal;

    return{ subTotal , tax , grandTotal}
}
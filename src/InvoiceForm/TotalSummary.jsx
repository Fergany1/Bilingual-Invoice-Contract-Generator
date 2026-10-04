import { useState } from "react";
import { useForm } from "../Hooks/useForm";

export default function TotalSummary() {
    const { values } = useForm()

    // 1. Get the sub-total using reduce()
    const subTotal = values.items.reduce((accumulator , item) => {
        // convert str -> Num OR Default to 0 if empty
        const currentPrice = parseFloat(item.price) || 0;
        const currentQuantity = parseFloat(item.quantity) || 0;

        // price * quantity and adds it up to accumulator
        return accumulator + (currentPrice * currentQuantity)
    } , 0)

    // 2. get estimated Tax 10%
    const taxRate = 0.10;
    const subTax = subTotal * taxRate;
    const grandTotal = subTax + subTotal;

    return (
        <div>
            <h2>Invoice Summary </h2>
            <p>Sub-Total : <strong>${subTotal.toFixed(2)}</strong></p>
            <p>Estiamted-Tax(10%) : <strong>${subTax.toFixed(2)}</strong></p>
            <br />
            <h3>Total: <strong>${grandTotal.toFixed(2)}</strong></h3>

        </div>
    )
}
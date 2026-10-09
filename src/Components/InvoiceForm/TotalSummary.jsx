import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";

export default function TotalSummary() {
    const { values } = useForm()

    const { subTotal , tax , grandTotal } = calculateTotals(values.items);

    return (
        <div>
            <h2>Invoice Summary </h2>
            <p>Sub-Total : <strong>${subTotal.toFixed(2)}</strong></p>
            <p>Estiamted-Tax(10%) : <strong>${tax.toFixed(2)}</strong></p>
            <br />
            <h3>Total: <strong>${grandTotal.toFixed(2)}</strong></h3>

        </div>
    )
}
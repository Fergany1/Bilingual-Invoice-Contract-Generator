import { useForm } from "../Hooks/useForm";

export function InvoicePreview() {
    const { values } = useForm();

    const subTotal = values.items.reduce((accu , item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseFloat(item.quantity) || 0;
        return accu + (price * quantity);
    } , 0);

    const taxTotal = subTotal * 0.10 // Tax 10%
    const grandTotal = subTotal + taxTotal;

    return (
        <div>
            {/*Invoice Preview Header*/}
            <div>
                <h2>Invoice Preview</h2>
                <div>
                    <p>Date : {values.se}</p>
                </div>
            </div>
        </div>
    )
}
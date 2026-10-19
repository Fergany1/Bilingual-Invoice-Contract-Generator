import { useForm } from "../../Hooks/useForm";

export function PaymentDetails() {
    const { values  , handleChange } = useForm();
    return (
        <div className="card">
            <h2>Payment Details</h2>
            <input 
            name="paymentMethod"
            value={values.paymentMethod}
            onChange={handleChange}
            placeholder="Bank Transfer , InstaPay , Wallet ..." />
            <textarea 
            name="paymentDetails"
            value={values.paymentDetails}
            onChange={handleChange}
            placeholder="Bank Name , Account Number / IBAN , Wallet Number"/>
            <textarea
            name="notes"
            value={values.notes}
            onChange={handleChange}
            placeholder="Terms , Thank-You Note ..." />
        </div>
    )
}
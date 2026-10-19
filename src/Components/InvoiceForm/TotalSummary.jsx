import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";
import { formatMoney } from "../../utils/formatMoney";

export default function TotalSummary() {
    const { values , handleChange } = useForm()

    const {         
        lines,
        subTotal,
        discountAmount,
        taxable,
        tax,
        grandTotal,
        balanceDue 
    } = calculateTotals(
        values.items,
        {
            taxRate: values.taxRate,
            discount: values.discount,
            amountPaid: values.amountPaid
        
        }
    );

    return (
        <div className="card">
            <h2>Invoice Summary</h2>
            <div className="fields">
                <label>
                    Discount 
                    <input 
                    type="number" name="discount" 
                    value={values.discount} onChange={handleChange}/>
                </label>
                <label>
                    Tax Rate (%) 
                    <input 
                    type="number" name="taxRate" 
                    value={values.taxRate} onChange={handleChange}/>
                </label>
                <label>
                    Amount Paid 
                    <input 
                    type="number" name="amountPaid" 
                    value={values.amountPaid} onChange={handleChange}/>
                </label>
            </div>

            <div className="summary">
                <p>Sub-Total: <strong>{formatMoney(subTotal , values.currency)}</strong></p>
                {discountAmount > 0 && <p>Discount: <strong>-{formatMoney(discountAmount , values.currency)}</strong></p>}
                <p>Tax ({values.taxRate}%): <strong>{formatMoney(tax , values.currency)}</strong></p>
                <h3>Total: <strong>{formatMoney(grandTotal , values.currency)}</strong></h3>
                <h3>Balance Due: <strong>{formatMoney(balanceDue , values.currency)}</strong></h3>
            </div>
        </div>
    )
}
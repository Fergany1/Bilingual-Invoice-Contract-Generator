import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";
import { formatMoney } from "../../utils/formatMoney";
import { addDays } from "../../utils/dates";
import { PaymentDetails } from "./PaymentDetails";

export function InvoicePreview() {
    const { values } = useForm();

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
        <div>
            {/*Invoice Preview Header*/}
            <div>
                <p>INV - {values.invoiceNumber}</p>
                <h2>Invoice Preview</h2>

                <div>
                    <p>Date : {values.issueDate || '--/--/---- '}</p>
                </div>
            </div>
            {/* Parties Context */}
            <div>
                <div>
                    <h4>From (Provider)</h4>
                    <p>{values.providerName || '---------'}</p>
                    <p>{values.providerEmail}</p>
                </div>
                <div>
                    <h4>Bill To (Client)</h4>
                    <p>{values.clientName || '----------'}</p>
                    <p>{values.companyName || '---------'}</p>
                    <p>{values.clientEmail}</p>
                </div>
            </div>
            {/* Data Rows Table Grid */}
            <table>
                <thead>
                    <tr>
                        <th>Item Title</th> 
                        <th>Service Item</th> 
                        <th>Qty</th> 
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((item , index) => (
                        <tr key={item.id || index}>
                            
                            <td>
                                {item.title || '------------'}
                            </td> 
                            <td>
                                {item.description || '--------------'}
                            </td>
                            <td>{item.quantity} {item.unit} </td> 
                            <td>{formatMoney(item.price , values.currency)}</td>
                            <td> 
                                {formatMoney(item.lineTotal , values.currency)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>Sub-Total: <strong>{formatMoney(subTotal , values.currency)}</strong></p>
                <p>Tax ({values.taxRate}%): <strong>{formatMoney(tax , values.currency)}</strong></p>
                {discountAmount > 0 && (
                <p>Discount: <strong>-{formatMoney(discountAmount, values.currency)}</strong></p>
                )}
                <br />
                <h3>Total: <strong>{formatMoney(grandTotal , values.currency)}</strong></h3>
                {parseFloat(values.amountPaid) > 0 && (
                <p>Paid: <strong>{formatMoney(values.amountPaid , values.currency)}</strong></p>
                )}
                <h3>Balance Due: <strong>{formatMoney(balanceDue , values.currency)}</strong></h3>
                <p>Issue-Date:<strong>{values.issueDate}</strong></p>
                <p>Due-Date: <strong>{addDays(values.issueDate , values.dueDate)}</strong></p>
            </div>
            <hr />
            {values.paymentDetails && (
                <div>
                    <h4>How To Pay</h4>
                    <p>{values.paymentMethod}</p>
                    <p
                    style={{ whiteSpace: 'pre-line'}}>
                        {values.paymentDetails}
                    </p>
                </div>
            )}
            {values.notes && <p style={{ whiteSpace: 'pre-line'}}>{values.notes}</p>}
            
        </div>
    )
}
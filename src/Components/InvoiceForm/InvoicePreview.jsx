import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";
import { formatMoney } from "../../utils/formatMoney";
import { addDays } from "../../utils/dates";

export function InvoicePreview() {
    const { values } = useForm();

    const { subTotal , tax , grandTotal } = calculateTotals(values.items)

    return (
        <div className="print-area">
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
                    <p>{values.companyNumber || '---------'}</p>
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
                    {values.items.map((item , index) => (
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
                                {formatMoney(item.subTotal , values.currency)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>SubTotal : <strong> ${subTotal.toFixed(2)} </strong></p>
                <p>Tax : <strong> ${tax.toFixed(2)} </strong></p>
                <br />
                <h4>GrandTotal: <strong> ${grandTotal.toFixed(2)} </strong></h4>
                <p>Issue-Date: {values.issueDate}</p>
                <p>Due-Date: {addDays(values.issueDate , values.dueDate)}</p>
            </div>
            
        </div>
    )
}
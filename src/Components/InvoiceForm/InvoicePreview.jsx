import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";

export function InvoicePreview() {
    const { values } = useForm();

    const { subTotal , tax , grandTotal } = calculateTotals(values.items)

    return (
        <div className="print-area">
            {/*Invoice Preview Header*/}
            <div>
                <h2>Invoice Preview</h2>
                <div>
                    <p>Date : {values.serviceDate || '--/--/---- '}</p>
                    <p>Technician : {values.technician || '-------------'}</p>
                </div>
            </div>
            {/* Parties Context */}
            <div>
                <div>
                    <h4>From (Provider)</h4>
                    <p>{values.providerName || 'N/A'}</p>
                    <p>{values.providerEmail}</p>
                </div>
                <div>
                    <h4>Bill To (Client)</h4>
                    <p>{values.clientName || 'N/A'}</p>
                    <p>{values.clientEmail}</p>
                </div>
            </div>
            {/* Data Rows Table Grid */}
            <table>
                <thead>
                    <tr>
                    
                        <th>Service Item</th> <br />
                        <th>Qty</th> <br />
                        <th>Price</th><br />
                        <th>Total</th><br />
                    </tr>
                </thead>
                <tbody>
                    {values.items.map((item , index) => (
                        <tr key={item.id || index}>
                            
                            <td>
                                {item.description}
                            </td><br />
                            <td>{item.quantity}</td> <br />
                            <td>${parseFloat(item.price || 0)}</td><br />
                            <td>
                                ${(parseFloat(item.price || 0) * (parseFloat(item.quantity || 0))).toFixed(2)}
                            </td><br />
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>SubTotal : <strong> ${subTotal.toFixed(2)} </strong></p>
                <p>Tax : <strong> ${tax.toFixed(2)} </strong></p>
                <br />
                <h4>GrandTotal: <strong> ${grandTotal.toFixed(2)} </strong></h4>
            </div>
            
        </div>
    )
}
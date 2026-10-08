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
                                {item.title || 'Untitled'}
                                {item.description}
                            </td>
                            <td>{item.quantity}</td>
                            <td>${parseFloat(item.price || 0)}</td>
                            <td>
                                ${(parseFloat(item.price || 0) * (parseFloat(item.quantity || 0))).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>SubTotal : ${subTotal.toFixed(2)}</p>
                <p>Tax : ${taxTotal.toFixed(2)}</p>
                <br />
                <h4>GrandTotal: ${grandTotal.toFixed(2)}</h4>
            </div>
        </div>
    )
}
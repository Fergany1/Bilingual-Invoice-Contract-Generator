import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";
import { formatMoney } from "../../utils/formatMoney";
import { addDays } from "../../utils/dates";
import { PaymentDetails } from "./PaymentDetails";
import { translations } from "../../i18n/translations";

export function InvoicePreview() {
    const { values } = useForm();
    const lang = values.lang || "en";
    const t = translations[lang].invoice;

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
        <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
            {/*Invoice Preview Header*/}
            <div>
                <p>{t.number} - {values.invoiceNumber}</p>
                <h2>{t.title}</h2>

                <div>
                    <p>{t.date} : {values.issueDate || '--/--/---- '}</p>
                </div>
            </div>
            {/* Parties Context */}
            <div>
                <div>
                    <h4>{t.from}</h4>
                    <p>{values.providerName || '---------'}</p>
                    <p>{values.providerEmail}</p>
                </div>
                <div>
                    <h4>{t.billto}</h4>
                    <p>{values.clientName || '----------'}</p>
                    <p>{values.companyName || '---------'}</p>
                    <p>{values.clientEmail}</p>
                </div>
            </div>
            {/* Data Rows Table Grid */}
            <table>
                <thead>
                    <tr>
                        <th>{t.item}</th> 
                        <th>{t.description}</th> 
                        <th>{t.qty}</th> 
                        <th>{t.price}</th>
                        <th>{t.total}</th>
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
                            <td>{item.quantity} {t.units[item.unit]} </td> 
                            <td>{formatMoney(item.price , values.currency)}</td>
                            <td> 
                                {formatMoney(item.lineTotal , values.currency)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <p>{t.subtotal}: <strong>{formatMoney(subTotal , values.currency)}</strong></p>
                <p>{t.tax} ({values.taxRate}%): <strong>{formatMoney(tax , values.currency)}</strong></p>
                {discountAmount > 0 && (
                <p>{t.discount}: <strong>-{formatMoney(discountAmount, values.currency)}</strong></p>
                )}
                <br />
                <h3>{t.total}: <strong>{formatMoney(grandTotal , values.currency)}</strong></h3>
                {parseFloat(values.amountPaid) > 0 && (
                <p>{t.paid}: <strong>{formatMoney(values.amountPaid , values.currency)}</strong></p>
                )}
                <h3>{t.balanceDue}: <strong>{formatMoney(balanceDue , values.currency)}</strong></h3>
                <p>{t.issueDate}:<strong>{values.issueDate}</strong></p>
                <p>{t.dueDate}: <strong>{addDays(values.issueDate , values.dueDate)}</strong></p>
            </div>
            <hr />
            {values.paymentDetails && (
                <div>
                    <h4>{t.howtopay}</h4>
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
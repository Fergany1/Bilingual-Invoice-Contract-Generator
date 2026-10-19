import { useForm } from "../../Hooks/useForm";
import { calculateTotals } from "../../utils/calculateTotals";
import { formatMoney } from "../../utils/formatMoney";
import { addDays , formatDate } from "../../utils/dates";
import { PaymentDetails } from "./PaymentDetails";
import { translations } from "../../i18n/translations";

export function InvoicePreview() {
    const { values } = useForm();
    const lang = values.lang || "en";
    const t = translations[lang].invoice;
    
    // Formating Money & Dates
    const money = (n) => formatMoney(n , values.currency);
    const dueDate = addDays(values.issueDate , values.dueDate);

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
        <div className="doc" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
            
            {/*Invoice Preview Header*/}
            <header className="doc-header">
                <div>
                    <h1>{t.title}</h1>
                    <p className="doc-number">{t.number} <bdi>{values.invoiceNumber}</bdi></p>
                </div>
                <div className="doc-meta">
                    <p><span>{t.issueDate}</span><bdi>{formatDate(values.issueDate)}</bdi></p>
                    <p><span>{t.dueDate}</span><bdi>{formatDate(values.dueDate)}</bdi></p>
                </div>
            </header>

            {/* Parties Context */}
            <section className="doc-parties">
                <div>
                    <h4 className="doc-label">{t.from}</h4>
                    <p className="doc-strong">{values.providerName || '-'}</p>
                    {values.providerAddress && <p>{values.providerAddress}</p>}
                    {values.providerNumber && <p>{values.providerNumber}</p>}
                    {values.providerEmail && <p>{values.providerEmail}</p>}
                </div>
                <div>
                    <h4 className="doc-label">{t.billTo}</h4>
                    <p className="doc-strong">{values.clientName || '-'}</p>
                    {values.companyName && <p>{values.companyName}</p>}
                    {values.shippingAddress && <p className="doc-pre">{values.shippingAddress}</p>}
                    {values.clientNumber && <p>{values.clientNumber}</p>}
                    {values.clientEmail && <p>{values.clientEmail}</p>}
                
                </div>
            </section>

            {/* Data Rows Table Grid */}
            <table className="doc-table">
                <thead>
                    <tr>
                        <th>{t.item}</th> 
                        <th className="num">{t.qty}</th> 
                        <th className="num">{t.price}</th>
                        <th className="num">{t.total}</th>
                    </tr>
                </thead>
                <tbody>
                    {lines.map((line , index) => (
                        <tr key={line.id || index}>
                            
                            <td>
                                <strong>{line.title}</strong>
                                {line.description && <div className="doc-muted doc-pre">{line.description}</div>}
                            </td> 
                            <td className="num"><bdi>{line.quantity}</bdi> {t.units[line.unit] || line.unit} </td> 
                            <td className="num"><bdi className="money">{money(line.price)}</bdi></td>
                            <td className="num"><bdi className="money">{money(line.subTotal)}</bdi></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/**Total Summary */}
            <section className="doc-totals">
                <div className="row"><span>{t.subtotal}</span><bdi className="money">{money(subTotal)}</bdi></div>
                {discountAmount > 0 && (
                <div className="row"><span>{t.discount}</span><bdi className="money">-{money(discountAmount)}</bdi></div>
                )}
                <div className="row">
                <span>{t.tax} (<bdi>{values.taxRate}%</bdi>)</span>
                <bdi className="money">{money(tax)}</bdi>
                </div>
                <div className="row grand"><span>{t.total}</span><bdi className="money">{money(grandTotal)}</bdi></div>
                {parseFloat(values.amountPaid) > 0 && (
                <div className="row"><span>{t.paid}</span><bdi className="money">-{money(values.amountPaid)}</bdi></div>
                )}
                <div className="row balance"><span>{t.balanceDue}</span><bdi className="money">{money(balanceDue)}</bdi></div>
            </section>

            {/**Payment Details */}
            {values.paymentDetails && (
                <section className="doc-section">
                    <h4>{t.howToPay}</h4>
                    {values.paymentMethod && <p className="doc-strong">{values.paymentMethod}</p>}
                    <p className="doc-pre">{values.paymentDetails}</p>
                </section>
            )}
            {values.notes && (
                <section className="doc-section">
                    <h4>{t.notes}</h4>
                    <p className="doc-pre">{values.notes}</p>
                </section>
            )}
                    
        </div>
    )
}
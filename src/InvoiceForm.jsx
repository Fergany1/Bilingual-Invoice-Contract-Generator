import ClientSelect from "./Components/InvoiceForm/ClientSelect";
import ServiceDetails from "./Components/InvoiceForm/ServiceDetails";
import TotalSummary from "./Components/InvoiceForm/TotalSummary";
import { PaymentDetails } from "./Components/InvoiceForm/PaymentDetails";
import { InvoicePreview } from "./Components/InvoiceForm/InvoicePreview";
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';
import { validate } from "./utils/validateInvoice";
import { SharePicker } from "./Components/Shared/SharePicker";
import { buildInvoiceMessage, buildWhatsAppUrl  } from "./utils/whatsapp";
import { formatMoney } from "./utils/formatMoney";
import { calculateTotals } from "./utils/calculateTotals";
import { addDays } from "./utils/dates";
import DocumentActions from "./Components/Shared/DocumentActions";


export default function InvoiceForm () {
    const { values } = useForm()
    const { grandTotal } = calculateTotals(values.items , {
        taxRate: values.taxRate,
        discount: values.discount,
        amountPaid: values.amountPaid,
    });
    const printRef = useRef(null);

    
    
    
    
    
    return(<>
        <div> {/* ClientSelect, ServicesDetails, TotalSummary */} </div>
        <ClientSelect /> <hr />
        <ServiceDetails /> <hr />
        <PaymentDetails /> <hr />
        <TotalSummary /> <hr /> <br />
        {/**Invoice Preview And BTNs for Print & Download */}
        <DocumentActions 
            targetRef={printRef}
            fileName={`invoice-${values.invoiceNumber}`}
            validate={() => validate(values)}
            buildMessage={(client) => buildInvoiceMessage({
                clientName: client.name,
                invoiceNumber: values.invoiceNumber,
                total: formatMoney(grandTotal , values.currency),
                dueDate: addDays(values.issueDate , values.dueDate),
                providerName: values.providerName,
            })}
            />

        <div
        style={{ display: 'flex', justifyContent: 'center', padding:'10px' }} 
        className="print-area" ref={printRef}> 
            <InvoicePreview />
        </div>
        
    </>)
}
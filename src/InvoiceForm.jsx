import ClientSelect from "./Components/InvoiceForm/ClientSelect";
import ServiceDetails from "./Components/InvoiceForm/ServiceDetails";
import TotalSummary from "./Components/InvoiceForm/TotalSummary";
import { PaymentDetails } from "./Components/InvoiceForm/PaymentDetails";
import { InvoicePreview } from "./Components/InvoiceForm/InvoicePreview";
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';
import { validateInvoice } from "./utils/validateInvoice";
import { useForm } from "./Hooks/useForm";
import { SharePicker } from "./Components/Shared/SharePicker";
import { buildInvoiceMessage, buildWhatsAppUrl , cleanPhone } from "./utils/whatsapp";
import { formatMoney } from "./utils/formatMoney";
import { calculateTotals } from "./utils/calculateTotals";
import { addDays } from "./utils/dates";


export default function InvoiceForm () {
    const { values } = useForm()
    const { grandTotal } = calculateTotals(values.items , {
        taxRate: values.taxRate,
        discount: values.discount,
        amountPaid: values.amountPaid,
    });
    const [ errors , setErrors ] = useState([])
    const [ showPicker , setShowPicker] = useState(false)
    const printRef = useRef(null);

    const guard = (action) => () => {
        const found = validateInvoice(values);
        setErrors(found);
        if( found.length === 0) action();
    }

    const pdfOptions = {
        margin: 10,
        filename: "invoice.pdf",
        html2canvas: { scale: 2 , scrollY: 0 } ,
        jsPDF: { format : 'a4'}, 
    };

    const handleDownload = () => {
        html2pdf()
            .set(pdfOptions)
            .from(printRef.current)
            .save()
        
    };

    const handleShareFile = async () => {
        const blob = await html2pdf()
            .set(pdfOptions)
            .from(printRef.current)
            .outputPdf("blob");

        const file = new File([blob],
            `invoice-${values.invoiceNumber}.pdf` , {
            type: "application/pdf",
        });

        const message = `invoice INV-${values.invoiceNumber}`;

        if( navigator.canShare?.({ files: [file] })) {
            try {
                await navigator.share({ files: [file] , text: message});
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        } else {
            alert("File Sharing isn't Supported Here , Use Download PDF Instead")
        }
    };


    const handlePick = (client) => {
        const message = buildInvoiceMessage({
            clientName: client.name,
            invoiceNumber: values.invoiceNumber,
            total: formatMoney(grandTotal , values.currency),
            dueDate: addDays(values.issueDate , values.dueDate),
            providerName: values.providerName,
        });

        window.open(buildWhatsAppUrl(client.phone , message) , "_blank");
        handleDownload();
        setShowPicker(false);
    };


    return(<>
        <div> {/* ClientSelect, ServicesDetails, TotalSummary */} </div>
        <ClientSelect /> <hr />
        <ServiceDetails /> <hr />
        <PaymentDetails /> <hr />
        <TotalSummary /> <hr /> <br />
        {/**Invoice Preview And BTNs for Print & Download */}
        <button 
        type="button"
        onClick={guard(() => window.print())}>
            Print
        </button> 
        <br />
        <button
        type="button"
        onClick={guard(handleDownload)}>
            Download PDF
        </button>
        <br />
        <button type="button" onClick={guard(() => setShowPicker(true))}>
            Share Via WhatsApp 
        </button>
        <button type="button" onClick={guard(handleShareFile)}>
            Share a PDF(Mobile 📲)
        </button>
            {showPicker && <SharePicker onPick={handlePick} onClose={() => setShowPicker(false)} />}
        {errors.length > 0 && (
            <ul>
                {errors.map((e) => 
                    <li key={e}> {e} </li>
                )}
            </ul>
        )}
        <div
        style={{ display: 'flex', justifyContent: 'center', padding:'10px' }} 
        className="print-area" ref={printRef}> 
            <InvoicePreview />
        </div>
        
    </>)
}
import ClientSelect from "./Components/InvoiceForm/ClientSelect";
import ServiceDetails from "./Components/InvoiceForm/ServiceDetails";
import TotalSummary from "./Components/InvoiceForm/TotalSummary";
import { PaymentDetails } from "./Components/InvoiceForm/PaymentDetails";
import { InvoicePreview } from "./Components/InvoiceForm/InvoicePreview";
import { useRef, useState } from "react";
import html2pdf from 'html2pdf.js';
import { validateInvoice } from "./utils/validateInvoice";
import { useForm } from "./Hooks/useForm";

export default function InvoiceForm () {
    const { values } = useForm()
    const [ errors , setErrors ] = useState([])

    const guard = (action) => () => {
        const found = validateInvoice(values);
        setErrors(found);
        if( found.length === 0) action();
    }

    const printRef = useRef(null);

    const handleDownload = () => {
        html2pdf()
            .set({
                margin: 10 ,
                filename: 'invoice.pdf',
                html2canvas: { scale: 2} ,
                jsPDF: { format : 'a4'}, 
            })
            .from(printRef.current)
            .save()
        
    }


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
        <button
        type="button"
        onClick={guard(handleDownload)}>
            Download PDF
        </button>
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
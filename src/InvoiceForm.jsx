import ClientSelect from "./Components/InvoiceForm/ClientSelect";
import ServiceDetails from "./Components/InvoiceForm/ServiceDetails";
import TotalSummary from "./Components/InvoiceForm/TotalSummary";
import { InvoicePreview } from "./Components/InvoiceForm/InvoicePreview";
import { useRef } from "react";
import html2pdf from 'html2pdf.js';

export default function InvoiceForm () {

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
        <ClientSelect /> <hr />
        <ServiceDetails /> <hr />
        <TotalSummary /> <hr /> <br />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            
            <button 
            type="button"
            onClick={() => window.print()}>
                Print
            </button>
            <button
            type="button"
            onClick={handleDownload}>
                Download PDF
            </button>
            <div> {/* ClientSelect, ServicesDetails, TotalSummary */} </div>
            <div  className="print-area" ref={printRef}> 
                <InvoicePreview />
             </div>
        </div>
    </>)
}
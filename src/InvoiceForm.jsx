import ClientSelect from "./InvoiceForm/ClientSelect";
import ServiceDetails from "./InvoiceForm/ServiceDetails";
import TotalSummary from "./InvoiceForm/TotalSummary";
import { InvoicePreview } from "./InvoiceForm/InvoicePreview";
export default function InvoiceForm () {

    return(<>
        <ClientSelect /> <hr />
        <ServiceDetails /> <hr />
        <TotalSummary /> <hr /> <br />
        <div 
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div> {/* ClientSelect, ServicesDetails, TotalSummary */} </div>
            <div> <InvoicePreview /> </div>
        </div>
    </>)
}
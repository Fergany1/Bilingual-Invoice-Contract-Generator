import ClientSelect from "./Components/InvoiceForm/ClientSelect";
import ServiceDetails from "./Components/InvoiceForm/ServiceDetails";
import TotalSummary from "./Components/InvoiceForm/TotalSummary";
import { InvoicePreview } from "./Components/InvoiceForm/InvoicePreview";
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
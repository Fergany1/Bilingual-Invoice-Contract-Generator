import ClientSelect from "./InvoiceForm/ClientSelect";
import ServiceDetails from "./InvoiceForm/ServiceDetails";
import TotalSummary from "./InvoiceForm/TotalSummary";
export default function InvoiceForm () {

    return(<>
        <ClientSelect /> <hr />
        <ServiceDetails /> <hr />
        <TotalSummary />
    </>)
}
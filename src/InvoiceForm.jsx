import ClientSelect from "./InvoiceForm/ClientSelect";
import ServicesDetails from "./InvoiceForm/ServicesDetails";
import TotalSummary from "./InvoiceForm/TotalSummary";
export default function InvoiceForm () {

    return(<>
        <ClientSelect /> <hr />
        <ServicesDetails /> <hr />
        <TotalSummary />
    </>)
}
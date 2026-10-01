import ClientSelect from "./InvoiceForm/ClientSelect";
import LineItemEditor from "./InvoiceForm/LineItemEditor";
export default function InvoiceForm () {

    return(<>
        <ClientSelect /> <hr />
        <LineItemEditor />
    </>)
}
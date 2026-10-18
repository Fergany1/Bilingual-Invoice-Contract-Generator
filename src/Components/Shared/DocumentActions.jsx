import { useState } from "react";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import { SharePicker } from "./SharePicker";
import html2pdf from "html2pdf.js";


export function DocumentActions({buildMessage , targetRef , fileName ,validate}){
    const [ errors , setErrors ] = useState([]);
    const [ showPicker , setShowPicker ] = useState(false);

    const pdfOptions = {
        margin: 10,
        fileName: `${fileName}.pdf`,
        html2canvas: { scale: 2 , scrollY: 0},
        jsPDF: { format: "a4"},
    };

    const guard = (action) => () => {
        const found = validate();
        setErrors(found);
        if (found.length === 0) action();
    };

    const download = () => html2pdf().set(pdfOptions)
                        .from(targetRef.current).save();
    
    const shareFile = async () => {
        const blob = await html2pdf().set(pdfOptions)
                .from(targetRef.current).outputPdf("blob");

        const file = new File([blob],
            `${fileName}.pdf` , { type: "application/pdf"});
        if (navigator.canShare?.({ files:[file]})) {
            try {
                await navigator.share({ files: [file] , text:fileName});
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        } else {
            alert("File Sharing Isn't Supported here , use Download PDF Instead");
        }
    };

    const pick = (client) => {
        window.open(buildWhatsAppUrl(client.phone, buildMessage(client)) , "_blank");
        download();
        setShowPicker(false);
    };

    return(
        <div>
            <button type="button" onClick={guard(() => window.print())}>Print</button>
            <button type="button" onClick={guard(download)}>DownLoad PDF</button>
            <button type="button" onClick={guard(() => setShowPicker(true))}>Share Via WhatsApp</button>
            <button type="button" onClick={guard(shareFile)}>Share PDF (Mobile)</button>
            
            {showPicker && <SharePicker onPick={pick} onClose={() => setShowPicker(false)} />}
            {errors.length > 0 && 
            <ul>
                {errors.map((e) => <li key={e}>
                    {e}
                </li>)}    
            </ul>}
        </div>
    )
}
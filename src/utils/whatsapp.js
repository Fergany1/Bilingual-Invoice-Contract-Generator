const DEFAULT_COUNTRY_CODE = "20";

export function cleanPhone(raw , countryCode = DEFAULT_COUNTRY_CODE){
    let digits = String(raw || "").replace(/\D/g , "");
    if(digits.startsWith("00")) digits = digits.slice(2);
    else if (digits.startsWith("0")) digits = countryCode + digits.slice(1);
    return digits;
}

export function buildWhatsAppUrl (phone , message) {
    return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`;
}

export function buildInvoiceMessage ({
    providerName , clientName , total , dueDate ,invoiceNumber
}) {
    return [
        `Hello ${clientName},`,
        `Find Invoice INV-${invoiceNumber} For ${total}.`,
        dueDate ? `Due-Data: ${dueDate}.` : "",
        'Thank U , ',
        providerName,
    ].filter(Boolean).join("\n")
}
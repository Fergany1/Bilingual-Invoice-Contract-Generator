export function validateInvoice(values) {
    const errors = [];
    if(!values.providerName.trim()) errors.push("Provider Name is Required !");
    if(!values.clientName.trim()) errors.push("Client Name is Required !");
    if(!values.issueDate) errors.push(" Issue Date is Required !");

    const validItems = values.items.filter((i) => i.title.trim());
    if (validItems.length === 0) errors.push('Add At Least One Item With A Title!');

    values.items.forEach((item , i) => {
        if(parseFloat(item.quantity) <= 0) 
            errors.push(`Row ${i + 1}: Quantity Must Be Above Zero!`);

        if(parseFloat(item.price) < 0) 
            errors.push(`Row ${i + 1}: Price Can't Be Negative !`);
    });

    return errors;
}
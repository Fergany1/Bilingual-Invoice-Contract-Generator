export function validate(values) {
    const errors = [];
    if(!values.providerName.trim()) errors.push("Provider Name is Required !");
    if(!values.clientName.trim()) errors.push("Client Name is Required !");
    if(!values.issueDate) errors.push(" Issue Date is Required !");

    const validItems = values.items.filter((i) => i.title?.trim());
    if (validItems.length === 0) errors.push('Add At Least One Item With A Title!');

    values.items.forEach((item , i) => {
        if (!item.title?.trim()) errors.push(`Row ${i + 1}: add a title or remove the row`);
        if (!(parseFloat(item.quantity) > 0)) errors.push(`Row ${i + 1}: quantity must be above zero!`);
        if (!(parseFloat(item.price) >= 0)) errors.push(`Row ${i + 1}: price must be a number, 0 or above!`);
    });

    return errors;
}
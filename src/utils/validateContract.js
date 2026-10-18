export function validateContract(values) {
  const errors = [];
  if (!values.contractProvider?.trim()) errors.push("Service provider name is required!");
  if (!values.contractClient?.trim()) errors.push("Client name is required!");
  if (!values.contractDate) errors.push("Contract date is required!");
  if (!values.scopeOfWork?.trim()) errors.push("Scope of work is required!");
  if (!values.isAgreed) errors.push("Please tick the checkbox to confirm the clauses!");
  return errors;
}
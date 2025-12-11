export const calculateTaxAmount = (subtotal) => {
  const taxRate = 0.1;
  const taxAmount = subtotal * taxRate;
  return parseFloat(taxAmount.toFixed(2));
};

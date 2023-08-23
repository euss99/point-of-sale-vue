export const formatCurrency = (amount) =>
  Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

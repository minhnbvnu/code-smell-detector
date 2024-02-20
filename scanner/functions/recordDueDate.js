function recordDueDate(invoice) {
  const today = new Date(Date.now());
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}
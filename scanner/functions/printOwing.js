function printOwing(invoice) {
  printBanner();
  let outstanding = calOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}
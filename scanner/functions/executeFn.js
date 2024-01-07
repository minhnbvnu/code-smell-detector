function executeFn(code, PDFDocument, lorem, waitForData, iframe) {
  var fn = new Function('PDFDocument', 'lorem', 'waitForData', 'iframe', code);
  fn(PDFDocument, lorem, waitForData, iframe);
}
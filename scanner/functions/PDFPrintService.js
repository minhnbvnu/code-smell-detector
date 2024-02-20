function PDFPrintService(pdfDocument, pagesOverview, printContainer, l10n) {
  this.pdfDocument = pdfDocument;
  this.pagesOverview = pagesOverview;
  this.printContainer = printContainer;
  this.l10n = l10n || _ui_utils.NullL10n;
  this.disableCreateObjectURL = pdfDocument.loadingParams["disableCreateObjectURL"];
  this.currentPage = -1;
  this.scratchCanvas = document.createElement("canvas");
}
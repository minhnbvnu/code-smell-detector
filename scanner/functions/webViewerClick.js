function webViewerClick(evt) {
  if (PDFViewerApplication.triggerDelayedFallback && PDFViewerApplication.pdfViewer.containsElement(evt.target)) {
    PDFViewerApplication.triggerDelayedFallback();
  }

  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }

  const appConfig = PDFViewerApplication.appConfig;

  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}
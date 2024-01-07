function reportPageStatsPDFBug({
  pageNumber
}) {
  if (typeof Stats === "undefined" || !Stats.enabled) {
    return;
  }

  const pageView = PDFViewerApplication.pdfViewer.getPageView(pageNumber - 1);
  const pageStats = pageView?.pdfPage?.stats;

  if (!pageStats) {
    return;
  }

  Stats.add(pageNumber, pageStats);
}
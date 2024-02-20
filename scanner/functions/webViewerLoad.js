function webViewerLoad() {
  const config = getViewerConfiguration();
  window.PDFViewerApplication = pdfjsWebApp.PDFViewerApplication;
  window.PDFViewerApplicationOptions = pdfjsWebAppOptions.AppOptions;
  const event = document.createEvent("CustomEvent");
  event.initCustomEvent("webviewerloaded", true, true, {});
  document.dispatchEvent(event);
  pdfjsWebApp.PDFViewerApplication.run(config);
}
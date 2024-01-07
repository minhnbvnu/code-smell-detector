function webViewerResetPermissions() {
  const {
    appConfig
  } = PDFViewerApplication;

  if (!appConfig) {
    return;
  }

  appConfig.viewerContainer.classList.remove(ENABLE_PERMISSIONS_CLASS);
}
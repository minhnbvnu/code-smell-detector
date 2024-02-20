function instantTimeout () {
  timeoutRunning = true;
  setTimeout(() => {
    if (isInstantPreview) {
      if (previewActive)
        _uc.sss.unregisterSheet(previewCode, previewOrigin);
      else if (style?.enabled)
        style.unregister();
      previewCode = Services.io.newURI('data:text/css;charset=UTF-8,' + encodeURIComponent(codeElementWrapper.value));
      previewOrigin = origin;
      previewActive = true;
      _uc.sss.loadAndRegisterSheet(previewCode, previewOrigin);
      toggleUI('preview-button', false);
      if (origin === _uc.sss.AGENT_SHEET || lastOrigin === _uc.sss.AGENT_SHEET) {
        lastOrigin = origin;
        UC.styloaix.forceRefresh();
      }
    }
    if (isInstantCheck)
      checkForErrors();
    timeoutRunning = false;
  }, interval)
}
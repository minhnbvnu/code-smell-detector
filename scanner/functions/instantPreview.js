function instantPreview (bool, persist) {
  if (persist)
    xPref.set(UC.styloaix.PREF_INSTANTPREVIEW, bool);
  isInstantPreview = bool
  if (isInstantPreview && !timeoutRunning)
    instantTimeout();

  sourceEditor.focus();
}
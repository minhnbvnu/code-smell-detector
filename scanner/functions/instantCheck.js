function instantCheck (bool, persist) {
  if (persist)
    xPref.set(UC.styloaix.PREF_INSTANTCHECK, bool);
  isInstantCheck = bool
  if (isInstantCheck && !timeoutRunning)
    instantTimeout();

  sourceEditor.focus();
}
async function detectFacebookOnPage () {
  if (!checkForTrackers) {
    return;
  }

  patternDetection(PASSIVE_SHARE_PATTERN_DETECTION_SELECTORS, "share-passive");
  patternDetection(SHARE_PATTERN_DETECTION_SELECTORS, "share");
  patternDetection(LOGIN_PATTERN_DETECTION_SELECTORS, "login");

  const relayAddonEnabled = await getRelayAddonEnabledFromBackground();

  // Check if any FB trackers were blocked, scoped to only the active tab
  const trackersDetectedOnCurrentPage = await checkIfTrackersAreDetectedOnCurrentPage();

  // Check if user dismissed the Relay prompt
  const relayAddonPromptDismissed = await getLocalStorageSettingFromBackground("hideRelayEmailBadges");

  const checkboxTicked = localStorage.getItem("checkbox-ticked");

  if (relayAddonPromptDismissed && !relayAddonEnabled && !relayAddonPromptDismissed.hideRelayEmailBadges && trackersDetectedOnCurrentPage && checkboxTicked !== "true") {
    patternDetection(EMAIL_PATTERN_DETECTION_SELECTORS, "email");
    updateSettings();
  }

  escapeKeyListener();
}
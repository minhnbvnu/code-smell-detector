async function getLocalStorageSettingFromBackground(setting) {
  // Send request to background determine if to show Relay email field prompt
  const backgroundResp = await browser.runtime.sendMessage({
    message: "check-settings",
    setting
  });

  return backgroundResp;
}
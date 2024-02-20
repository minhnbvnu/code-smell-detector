async function isRelayAddonEnabled () {
  try {
    const relayAddonInfo = await browser.management.get(RELAY_ADDON_ID);
    if (relayAddonInfo.enabled) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}
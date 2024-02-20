async function getRelayAddonEnabledFromBackground() {
  const relayAddonEnabled = await browser.runtime.sendMessage({
    message: "get-relay-enabled"
  });
  return relayAddonEnabled;
}
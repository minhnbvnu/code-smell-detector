function findPin(client, nodeType, pinLabel) {
  return client.$(
    `.NodePinsOverlay[data-label="${nodeType}"] .PinOverlay[data-label="${pinLabel}"]`
  );
}
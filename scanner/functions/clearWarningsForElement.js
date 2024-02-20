function clearWarningsForElement({
  bridge,
  id,
  rendererID
}) {
  bridge.send('clearWarningsForFiberID', {
    rendererID,
    id
  });
}
function clearErrorsForElement({
  bridge,
  id,
  rendererID
}) {
  bridge.send('clearErrorsForFiberID', {
    rendererID,
    id
  });
}
function backendAPI_copyInspectedElementPath({
  bridge,
  id,
  path,
  rendererID
}) {
  bridge.send('copyElementPath', {
    id,
    path,
    rendererID
  });
}
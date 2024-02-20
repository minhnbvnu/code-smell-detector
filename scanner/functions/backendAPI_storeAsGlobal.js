function backendAPI_storeAsGlobal({
  bridge,
  id,
  path,
  rendererID
}) {
  bridge.send('storeAsGlobal', {
    count: storeAsGlobalCount++,
    id,
    path,
    rendererID
  });
}
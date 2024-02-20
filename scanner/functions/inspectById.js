async function inspectById(objectId) {
  return await captureMessage('objectInspector:updateObject', async () => {
    EmberDebug.port.trigger('objectInspector:inspectById', {
      objectId,
    });
  });
}
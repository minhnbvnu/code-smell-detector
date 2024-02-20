async function digDeeper(objectId, property) {
  return await captureMessage('objectInspector:updateObject', async () => {
    EmberDebug.port.trigger('objectInspector:digDeeper', {
      objectId,
      property,
    });
  });
}
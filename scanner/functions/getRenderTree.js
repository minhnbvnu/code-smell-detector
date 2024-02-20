async function getRenderTree() {
  let message = await captureMessage('view:renderTree', async () => {
    EmberDebug.port.trigger('view:getTree', {});
  });

  if (message) {
    return message.tree;
  }
}
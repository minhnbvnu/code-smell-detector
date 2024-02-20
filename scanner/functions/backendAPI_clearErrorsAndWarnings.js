function backendAPI_clearErrorsAndWarnings({
  bridge,
  store
}) {
  store.rootIDToRendererID.forEach(rendererID => {
    bridge.send('clearErrorsAndWarnings', {
      rendererID
    });
  });
}
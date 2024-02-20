function renderToJSON(whatToRender) {
  const container = reconciler.createContainer({}, false, false);
  reconciler.updateContainer(whatToRender, container, null, null);
  return container.containerInfo.resultObj;
}
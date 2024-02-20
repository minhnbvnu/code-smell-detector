async function highlightsPromise(testedRoute, isGlimmerComponent) {
  await visit('/home');
  enableHighlight();
  // Glimmer component does support highlight. so there should not be any highlights
  const numberOfHighlights = isGlimmerComponent
    ? 0
    : mockedRoutes[testedRoute].expectedRender.length;
  const observedHighlights = [];
  if (!isComponentHighlightSupported) {
    await visit('/' + testedRoute);
    return observedHighlights;
  }
  const observer = new MutationObserver(function (records) {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.className === 'ember-inspector-render-highlight') {
          observedHighlights.push(node);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true });
  await visit('/' + testedRoute);
  if (numberOfHighlights > 0) {
    await waitUntil(() => observedHighlights.length === numberOfHighlights, {
      timeout: 2000,
    });
  } else {
    await waitUntil(() => {
      // Check for the settled state minus hasPendingTimers
      let { hasRunLoop, hasPendingRequests, hasPendingWaiters } =
        getSettledState();
      if (hasRunLoop || hasPendingRequests || hasPendingWaiters) {
        return false;
      }
      return true;
    });
  }
  observer.disconnect();
  return observedHighlights;
}
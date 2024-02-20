function clearCacheBecauseOfError(refresh) {
  Object(react["startTransition"])(() => {
    const map = inspectedElementCache_createMap();
    refresh(inspectedElementCache_createMap, map);
  });
}
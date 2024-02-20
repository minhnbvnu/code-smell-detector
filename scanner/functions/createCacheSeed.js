function createCacheSeed(element, inspectedElement) {
  const newRecord = {
    status: inspectedElementCache_Resolved,
    value: inspectedElement
  };
  const map = inspectedElementCache_createMap();
  map.set(element, newRecord);
  return [inspectedElementCache_createMap, map];
}
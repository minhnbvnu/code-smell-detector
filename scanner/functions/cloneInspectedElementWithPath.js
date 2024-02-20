function cloneInspectedElementWithPath(inspectedElement, path, value) {
  const hydratedValue = hydrateHelper(value, path);
  const clonedInspectedElement = { ...inspectedElement
  };
  Object(hydration["b" /* fillInPath */])(clonedInspectedElement, value, path, hydratedValue);
  return clonedInspectedElement;
}
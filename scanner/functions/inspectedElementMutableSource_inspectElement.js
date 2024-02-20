function inspectedElementMutableSource_inspectElement({
  bridge,
  element,
  path,
  rendererID
}) {
  const {
    id
  } = element; // This could indicate that the DevTools UI has been closed and reopened.
  // The in-memory cache will be clear but the backend still thinks we have cached data.
  // In this case, we need to tell it to resend the full data.

  const forceFullData = !inspectedElementCache.has(id);
  return inspectElement({
    bridge,
    forceFullData,
    id,
    path,
    rendererID
  }).then(data => {
    const {
      type
    } = data;
    let inspectedElement;

    switch (type) {
      case 'error':
        {
          const {
            message,
            stack,
            errorType
          } = data; // create a different error class for each error type
          // and keep useful information from backend.

          let error;

          if (errorType === 'user') {
            error = new UserError(message);
          } else if (errorType === 'unknown-hook') {
            error = new UnknownHookError(message);
          } else {
            error = new Error(message);
          } // The backend's stack (where the error originated) is more meaningful than this stack.


          error.stack = stack || error.stack;
          throw error;
        }

      case 'no-change':
        // This is a no-op for the purposes of our cache.
        inspectedElement = inspectedElementCache.get(id);

        if (inspectedElement != null) {
          return [inspectedElement, type];
        } // We should only encounter this case in the event of a bug.


        throw Error(`Cached data for element "${id}" not found`);

      case 'not-found':
        // This is effectively a no-op.
        // If the Element is still in the Store, we can eagerly remove it from the Map.
        inspectedElementCache.del(id);
        throw Error(`Element "${id}" not found`);

      case 'full-data':
        const fullData = data; // New data has come in.
        // We should replace the data in our local mutable copy.

        inspectedElement = convertInspectedElementBackendToFrontend(fullData.value);
        inspectedElementCache.set(id, inspectedElement);
        return [inspectedElement, type];

      case 'hydrated-path':
        const hydratedPathData = data;
        const {
          value
        } = hydratedPathData; // A path has been hydrated.
        // Merge it with the latest copy we have locally and resolve with the merged value.

        inspectedElement = inspectedElementCache.get(id) || null;

        if (inspectedElement !== null) {
          // Clone element
          inspectedElement = { ...inspectedElement
          }; // Merge hydrated data

          Object(hydration["b" /* fillInPath */])(inspectedElement, value, path, hydrateHelper(value, path));
          inspectedElementCache.set(id, inspectedElement);
          return [inspectedElement, type];
        }

        break;

      default:
        // Should never happen.
        if (false) {}

        break;
    }

    throw Error(`Unable to inspect element with id "${id}"`);
  });
}
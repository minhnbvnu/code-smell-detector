function inspectElement(requestID, id, path, forceFullData) {
    if (path !== null) {
      mergeInspectedPaths(path);
    }

    if (isMostRecentlyInspectedElement(id) && !forceFullData) {
      if (!hasElementUpdatedSinceLastInspected) {
        if (path !== null) {
          let secondaryCategory = null;

          if (path[0] === 'hooks') {
            secondaryCategory = 'hooks';
          } // If this element has not been updated since it was last inspected,
          // we can just return the subset of data in the newly-inspected path.


          return {
            id,
            responseID: requestID,
            type: 'hydrated-path',
            path,
            value: Object(backend_utils["a" /* cleanForBridge */])(Object(utils["n" /* getInObject */])(mostRecentlyInspectedElement, path), createIsPathAllowed(null, secondaryCategory), path)
          };
        } else {
          // If this element has not been updated since it was last inspected, we don't need to return it.
          // Instead we can just return the ID to indicate that it has not changed.
          return {
            id,
            responseID: requestID,
            type: 'no-change'
          };
        }
      }
    } else {
      currentlyInspectedPaths = {};
    }

    hasElementUpdatedSinceLastInspected = false;

    try {
      mostRecentlyInspectedElement = inspectElementRaw(id);
    } catch (error) {
      // the error name is synced with ReactDebugHooks
      if (error.name === 'ReactDebugToolsRenderError') {
        let message = 'Error rendering inspected element.';
        let stack; // Log error & cause for user to debug

        console.error(message + '\n\n', error);

        if (error.cause != null) {
          const fiber = findCurrentFiberUsingSlowPathById(id);
          const componentName = fiber != null ? getDisplayNameForFiber(fiber) : null;
          console.error('React DevTools encountered an error while trying to inspect hooks. ' + 'This is most likely caused by an error in current inspected component' + (componentName != null ? `: "${componentName}".` : '.') + '\nThe error thrown in the component is: \n\n', error.cause);

          if (error.cause instanceof Error) {
            message = error.cause.message || message;
            stack = error.cause.stack;
          }
        }

        return {
          type: 'error',
          errorType: 'user',
          id,
          responseID: requestID,
          message,
          stack
        };
      } // the error name is synced with ReactDebugHooks


      if (error.name === 'ReactDebugToolsUnsupportedHookError') {
        return {
          type: 'error',
          errorType: 'unknown-hook',
          id,
          responseID: requestID,
          message: 'Unsupported hook in the react-debug-tools package: ' + error.message
        };
      } // Log Uncaught Error


      console.error('Error inspecting element.\n\n', error);
      return {
        type: 'error',
        errorType: 'uncaught',
        id,
        responseID: requestID,
        message: error.message,
        stack: error.stack
      };
    }

    if (mostRecentlyInspectedElement === null) {
      return {
        id,
        responseID: requestID,
        type: 'not-found'
      };
    } // Any time an inspected element has an update,
    // we should update the selected $r value as wel.
    // Do this before dehydration (cleanForBridge).


    updateSelectedElement(mostRecentlyInspectedElement); // Clone before cleaning so that we preserve the full data.
    // This will enable us to send patches without re-inspecting if hydrated paths are requested.
    // (Reducing how often we shallow-render is a better DX for function components that use hooks.)

    const cleanedInspectedElement = { ...mostRecentlyInspectedElement
    }; // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.context = Object(backend_utils["a" /* cleanForBridge */])(cleanedInspectedElement.context, createIsPathAllowed('context', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.hooks = Object(backend_utils["a" /* cleanForBridge */])(cleanedInspectedElement.hooks, createIsPathAllowed('hooks', 'hooks')); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.props = Object(backend_utils["a" /* cleanForBridge */])(cleanedInspectedElement.props, createIsPathAllowed('props', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.state = Object(backend_utils["a" /* cleanForBridge */])(cleanedInspectedElement.state, createIsPathAllowed('state', null));
    return {
      id,
      responseID: requestID,
      type: 'full-data',
      // $FlowFixMe[prop-missing] found when upgrading Flow
      value: cleanedInspectedElement
    };
  }
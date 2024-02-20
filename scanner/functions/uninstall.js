function uninstall(elements) {
      if (!elements) {
        return reporter$$1.error('At least one element is required.');
      }

      if (isElement(elements)) {
        // A single element has been passed in.
        elements = [elements];
      } else if (isCollection(elements)) {
        // Convert collection to array for plugins.
        // TODO: May want to check so that all the elements in the collection are valid elements.
        elements = toArray(elements);
      } else {
        return reporter$$1.error('Invalid arguments. Must be a DOM element or a collection of DOM elements.');
      }

      forEach$1(elements, function(element) {
        eventListenerHandler.removeAllListeners(element);
        detectionStrategy.uninstall(element);
        stateHandler.cleanState(element);
      });
    }
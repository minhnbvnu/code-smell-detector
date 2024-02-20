function getListeners(element) {
      var id = idHandler.get(element);

      if (id === undefined) {
        return [];
      }

      return eventListeners[id] || [];
    }
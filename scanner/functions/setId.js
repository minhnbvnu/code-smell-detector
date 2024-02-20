function setId(element) {
      var state = getState(element);

      if (!state) {
        throw new Error('setId required the element to have a resize detection state.');
      }

      var id = idGenerator.generate();

      state.id = id;

      return id;
    }
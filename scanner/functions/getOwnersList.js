function getOwnersList(id) {
    const fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber == null) {
      return null;
    }

    const {
      _debugOwner
    } = fiber;
    const owners = [fiberToSerializedElement(fiber)];

    if (_debugOwner) {
      let owner = _debugOwner;

      while (owner !== null) {
        owners.unshift(fiberToSerializedElement(owner));
        owner = owner._debugOwner || null;
      }
    }

    return owners;
  }
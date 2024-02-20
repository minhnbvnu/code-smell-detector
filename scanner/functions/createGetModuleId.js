function createGetModuleId() {
    let nextId = 1;
    const knownIds = new Map();
    function createId(path) {
      const id = nextId;
      nextId += 1;
      knownIds.set(path, id);
      return id;
    }

    return ({path}) => knownIds.get(path) || createId(path);
  }
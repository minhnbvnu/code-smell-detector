function getParentFibers(fiber) {
    const parents = [];
    let parent = fiber;

    while (parent !== null) {
      parents.push(parent);
      parent = parent.return;
    }

    return parents;
  }
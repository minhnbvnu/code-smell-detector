function recordResetChildren(fiber, childSet) {
    if (constants["F" /* __DEBUG__ */]) {
      debug('recordResetChildren()', childSet, fiber);
    } // The frontend only really cares about the displayName, key, and children.
    // The first two don't really change, so we are only concerned with the order of children here.
    // This is trickier than a simple comparison though, since certain types of fibers are filtered.


    const nextChildren = []; // This is a naive implementation that shallowly recourses children.
    // We might want to revisit this if it proves to be too inefficient.

    let child = childSet;

    while (child !== null) {
      findReorderedChildrenRecursively(child, nextChildren);
      child = child.sibling;
    }

    const numChildren = nextChildren.length;

    if (numChildren < 2) {
      // No need to reorder.
      return;
    }

    pushOperation(constants["A" /* TREE_OPERATION_REORDER_CHILDREN */]);
    pushOperation(getFiberIDThrows(fiber));
    pushOperation(numChildren);

    for (let i = 0; i < nextChildren.length; i++) {
      pushOperation(nextChildren[i]);
    }
  }
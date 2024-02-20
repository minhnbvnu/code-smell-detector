function recordReorder(internalInstance, id, nextChildren) {
    pushOperation(constants["o" /* TREE_OPERATION_REORDER_CHILDREN */]);
    pushOperation(id);
    const nextChildIDs = nextChildren.map(getID);
    pushOperation(nextChildIDs.length);

    for (let i = 0; i < nextChildIDs.length; i++) {
      pushOperation(nextChildIDs[i]);
    }
  }
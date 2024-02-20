function handleMutations(mutations, handler) {
        var addedNodes = getAddedNodes(mutations);
        handler(addedNodes);
      }
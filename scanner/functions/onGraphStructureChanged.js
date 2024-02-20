function onGraphStructureChanged(changes) {
    changes.forEach(change => {
      if (change.changeType === 'add' && change.node) {
        addNode(change.node);
      }
    })
  }
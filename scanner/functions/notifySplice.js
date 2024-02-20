function notifySplice(inst, array, path, index, addedCount, removed) {
    notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }
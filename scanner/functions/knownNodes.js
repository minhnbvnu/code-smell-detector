function knownNodes(mutation) {
    var nodes = concat.call([],
      Array.prototype.slice.call(mutation.addedNodes),
      mutation.target
    );
    return filter.call(nodes, watches.isWatched).length > 0;
  }
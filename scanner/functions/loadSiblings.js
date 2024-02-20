function loadSiblings(parent, results) {
    let q = fullQuery(parent).toLocaleLowerCase();
    var parentNode = graph.getNode(parent);

    if (!parentNode) {
      throw new Error('Parent is missing for ' + parent);
    }

    results.filter(x => x.toLocaleLowerCase().indexOf(q) === 0)
      .map(x => x.substring(q.length))
      .forEach(other => {
        const hasOtherNode = graph.hasNode(other);
        const hasOtherLink = graph.getLink(other, parent) || graph.getLink(parent, other);
        if (hasOtherNode) {
          if (!hasOtherLink) {
            graph.addLink(parent, other);
          }
          return;
        }

        let depth = parentNode.data.depth + 1;
        graph.addNode(other, {depth});
        graph.addLink(parent, other);
        if (depth < MAX_DEPTH) queue.push(other);
      });

    setTimeout(loadNext, requestDelay);
  }
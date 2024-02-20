function addEdges(from, to, dependencyNode, fromNode) {
  if (from && to) {
    if (dependencyNode.path.indexOf("Properties.Events") > 0) {
      edges.push({
        to: from,
        from: to,
        label: "Invoke",
      });
    } else {
      const descriptor = jsonUtil.pathToDescriptor(
        dependencyNode.path,
        filterConfig
      );
      if (
        edges.filter(
          (p) => p.from === from && p.to === to && p.label === descriptor
        ).length
      ) {
        return;
      }

      edges.push({
        from,
        to,
        label: descriptor,
        color: {
          color: colorHash.hex(descriptor),
        },
      });
    }
  }
}
function addVertices(resource, dependencies, type, prefix) {
  if (vertices.filter((p) => p.name === prefix + "." + resource).length === 0) {
    vertices.push({
      name: `${prefix}.${resource}`,
      dependencies: dependencies,
      type: type,
      vertex: graph.insertVertex(
        parent,
        null,
        resource,
        locationCache[resource] ? locationCache[resource].x : 70,
        locationCache[resource] ? locationCache[resource].y : 0,
        50,
        50,
        iconMap.getIcon(type)
      ),
    });
  }
}
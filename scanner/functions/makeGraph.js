function makeGraph(template, prefix, doReset, renderAll) {
  if (doReset) {
    reset();
  }
  jsonUtil.createPseudoResources(template);

  const resources = Object.keys(template.Resources);
  try {
    for (const resource of resources) {
      const resObj = template.Resources[resource];
      const type = resObj.Type;
      types.add(type);
      if (resObj.Template) {
        nested.push(resource);
        makeGraph(resObj.Template, resource, false, renderAll);
      }
      const dependencies = getDependencies(template, resource);
      addnodes(
        resource,
        dependencies,
        type,
        template.Resources[resource],
        prefix,
        renderAll
      );
    }

    for (const sourceVertex of nodes) {
      for (const dependencyNode of sourceVertex.dependencies) {
        for (const dependency of dependencyNode.value) {
          const targets = nodes.filter(
            (p) => p.id === prefix + "." + dependency.split(".").pop()
          );
          const targetVertex = targets[0];
          if (!targetVertex) {
            continue;
          }
          let from = sourceVertex.id;
          let to = targetVertex.id;
          addEdges(from, to, dependencyNode, sourceVertex);
        }
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
  return { nodes, edges };
}
function addnodes(
  resource,
  dependencies,
  type,
  resourceObject,
  prefix,
  renderAll
) {
  delete resourceObject.Template;
  if (nodes.filter((p) => p.id === resource).length === 0) {
    nodes.push({
      id: `${prefix}.${resource}`,
      dependencies: dependencies,
      prefix: prefix,
      hidden: prefix != "root" && !renderAll,
      type: type,
      label: resource,
      shape: "image",
      image: createImage(type),
      title: `${
        useJson
          ? JSON.stringify(resourceObject, null, 2)
          : yamlDump(resourceObject).replace(/>/g, "").replace(/</g, "")
      }`,
      resource: resourceObject,
    });
  }
}
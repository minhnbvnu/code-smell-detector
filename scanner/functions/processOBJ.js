function processOBJ(obj, mtl, options = {}) {
  const tri = {
    vertices: [],
    normals: [],
    colors: [],
    texCoords: [],
    heights: [],
    pickingColors: []
  };

  const
    items = [],
    optionColor = Qolor.parse(options.color).toArray(),
    position = options.position;

  const meshes = OBJ.parse(obj, mtl, options.flipYZ);

  meshes.forEach((mesh, index) => {
    // APP.events.emit('loadfeature', mesh); // TODO

    tri.vertices.push(...mesh.vertices);
    tri.normals.push(...mesh.normals);
    tri.texCoords.push(...mesh.texCoords);

    const
      id = options.id || mesh.id,
      properties = {},
      colorVariance = (id / 2 % 2 ? -1 : +1) * (id % 2 ? 0.03 : 0.06),
      color = optionColor || mesh.color || DEFAULT_COLOR,
      vertexCount = mesh.vertices.length / 3,
      pickingColor = getPickingColor(index);

    for (let i = 0; i < vertexCount; i++) {
      tri.colors.push(color[0]+colorVariance, color[1]+colorVariance, color[2]+colorVariance);
      tri.heights.push(mesh.height);
      tri.pickingColors.push(...pickingColor);
    }

    properties.height = mesh.height;
    properties.color = mesh.color;
    properties.bounds = getOBJBounds(mesh.vertices);

    items.push({ id: id, properties: properties, vertexCount: vertexCount });
  });

  postResult(items, position, tri);
}
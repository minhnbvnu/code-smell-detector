constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.POLYLINE;
    this.data.vertices = [];
    const rawVertices = parameters.dict.getArray("Vertices");

    if (!Array.isArray(rawVertices)) {
      return;
    }

    for (let i = 0, ii = rawVertices.length; i < ii; i += 2) {
      this.data.vertices.push({
        x: rawVertices[i],
        y: rawVertices[i + 1]
      });
    }
  }
function Mesh(stream, matrix, xref, resources, pdfFunctionFactory, localColorSpaceCache) {
    if (!(0, _primitives.isStream)(stream)) {
      throw new _util.FormatError("Mesh data is not a stream");
    }

    const dict = stream.dict;
    this.matrix = matrix;
    this.shadingType = dict.get("ShadingType");
    this.type = "Pattern";
    const bbox = dict.getArray("BBox");

    if (Array.isArray(bbox) && bbox.length === 4) {
      this.bbox = _util.Util.normalizeRect(bbox);
    } else {
      this.bbox = null;
    }

    const cs = _colorspace.ColorSpace.parse({
      cs: dict.getRaw("ColorSpace") || dict.getRaw("CS"),
      xref,
      resources,
      pdfFunctionFactory,
      localColorSpaceCache
    });

    this.cs = cs;
    this.background = dict.has("Background") ? cs.getRgb(dict.get("Background"), 0) : null;
    const fnObj = dict.getRaw("Function");
    const fn = fnObj ? pdfFunctionFactory.createFromArray(fnObj) : null;
    this.coords = [];
    this.colors = [];
    this.figures = [];
    const decodeContext = {
      bitsPerCoordinate: dict.get("BitsPerCoordinate"),
      bitsPerComponent: dict.get("BitsPerComponent"),
      bitsPerFlag: dict.get("BitsPerFlag"),
      decode: dict.getArray("Decode"),
      colorFn: fn,
      colorSpace: cs,
      numComps: fn ? 1 : cs.numComps
    };
    const reader = new MeshStreamReader(stream, decodeContext);
    let patchMesh = false;

    switch (this.shadingType) {
      case ShadingType.FREE_FORM_MESH:
        decodeType4Shading(this, reader);
        break;

      case ShadingType.LATTICE_FORM_MESH:
        const verticesPerRow = dict.get("VerticesPerRow") | 0;

        if (verticesPerRow < 2) {
          throw new _util.FormatError("Invalid VerticesPerRow");
        }

        decodeType5Shading(this, reader, verticesPerRow);
        break;

      case ShadingType.COONS_PATCH_MESH:
        decodeType6Shading(this, reader);
        patchMesh = true;
        break;

      case ShadingType.TENSOR_PATCH_MESH:
        decodeType7Shading(this, reader);
        patchMesh = true;
        break;

      default:
        (0, _util.unreachable)("Unsupported mesh type.");
        break;
    }

    if (patchMesh) {
      updateBounds(this);

      for (let i = 0, ii = this.figures.length; i < ii; i++) {
        buildFigureFromPatch(this, i);
      }
    }

    updateBounds(this);
    packData(this);
  }
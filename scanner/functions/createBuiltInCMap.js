async function createBuiltInCMap(name, fetchBuiltInCMap) {
    if (name === "Identity-H") {
      return new IdentityCMap(false, 2);
    } else if (name === "Identity-V") {
      return new IdentityCMap(true, 2);
    }

    if (!BUILT_IN_CMAPS.includes(name)) {
      throw new Error("Unknown CMap name: " + name);
    }

    if (!fetchBuiltInCMap) {
      throw new Error("Built-in CMap parameters are not provided.");
    }

    const {
      cMapData,
      compressionType
    } = await fetchBuiltInCMap(name);
    var cMap = new CMap(true);

    if (compressionType === _util.CMapCompressionType.BINARY) {
      return new BinaryCMapReader().process(cMapData, cMap, useCMap => {
        return extendCMap(cMap, fetchBuiltInCMap, useCMap);
      });
    }

    if (compressionType === _util.CMapCompressionType.NONE) {
      var lexer = new _parser.Lexer(new _stream.Stream(cMapData));
      return parseCMap(cMap, lexer, fetchBuiltInCMap, null);
    }

    throw new Error("TODO: Only BINARY/NONE CMap compression is currently supported.");
  }
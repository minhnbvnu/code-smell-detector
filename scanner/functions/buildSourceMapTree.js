function buildSourceMapTree(input, loader, relativeRoot) {
    const maps = asArray(input).map(decodeSourceMap);
    const map = maps.pop();
    for (let i = 0; i < maps.length; i++) {
      if (maps[i].sources.length !== 1) {
        throw new Error(`Transformation map ${i} must have exactly one source file.
Did you specify these with the most recent transformation maps first?`);
      }
    }
    const { sourceRoot, sources, sourcesContent } = map;
    const children = sources.map((sourceFile, i) => {
      const uri = resolve$1(sourceFile || "", resolve$1(sourceRoot || "", stripFilename(relativeRoot)));
      const sourceMap = loader(uri);
      if (!sourceMap) {
        const sourceContent = sourcesContent ? sourcesContent[i] : null;
        return new OriginalSource(uri, sourceContent);
      }
      return buildSourceMapTree(decodeSourceMap(sourceMap), loader, uri);
    });
    let tree = new SourceMapTree(map, children);
    for (let i = maps.length - 1; i >= 0; i--) {
      tree = new SourceMapTree(maps[i], [tree]);
    }
    return tree;
  }
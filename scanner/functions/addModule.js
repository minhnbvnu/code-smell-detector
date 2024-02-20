function addModule({bundle, code, sourceCode, sourcePath, map, virtual, polyfill}) {
  return bundle.addModule(
    resolverFor(code, map),
    null,
    {isPolyfill: () => polyfill},
    createModuleTransport({
      code,
      sourceCode,
      sourcePath,
      map,
      virtual,
      polyfill,
    }),
  );
}
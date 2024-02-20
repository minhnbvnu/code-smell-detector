function buildUnbundleSourcemap(bundle) {
  const generator = new sourceMap.SourceMapGenerator({});

  let offset = 0;
  bundle.getUnbundle('INDEX').allModules.forEach(module => {
    if (module.map) { // assets have no sourcemap
      const consumer = new SourceMapConsumer(module.map);
      consumer.eachMapping(mapping => {
        generator.addMapping({
          original: {
            line: mapping.originalLine,
            column: mapping.originalColumn,
          },
          generated: {
            line: mapping.generatedLine + offset,
            column: mapping.generatedColumn,
          },
          source: module.sourcePath,
        });
      });

      generator.setSourceContent(module.sourcePath, module.sourceCode);
    }

    // some modules span more than 1 line
    offset += module.code.split('\n').length;
  });

  return generator.toString();
}
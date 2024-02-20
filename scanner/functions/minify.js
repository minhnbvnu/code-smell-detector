function minify(filename, code, sourceMap) {
  const minifyResult = uglify.minify(code, {
    fromString: true,
    inSourceMap: sourceMap,
    outSourceMap: true,
    output: {
      ascii_only: true,
      screw_ie8: true,
    },
  });

  minifyResult.map = JSON.parse(minifyResult.map);
  minifyResult.map.sources = [filename];
  return minifyResult;
}
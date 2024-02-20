function lineToLineSourceMap(source, filename) {
  // The first line mapping in our package is the base64vlq code for zeros (A).
  const firstLine = 'AAAA;';

  // Most other lines in our mappings are all zeros (for module, column etc)
  // except for the lineno mappinp: curLineno - prevLineno = 1; Which is C.
  const line = 'AACA;';

  return {
    version: 3,
    sources: [filename],
    mappings: firstLine + Array(countLines(source)).join(line),
  };
}
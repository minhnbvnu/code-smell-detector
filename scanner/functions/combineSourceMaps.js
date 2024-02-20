function combineSourceMaps({modules, withCustomOffsets}) {
  let offsets;
  const sections = [];
  const sourceMap = {
    version: 3,
    sections,
  };

  if (withCustomOffsets) {
    offsets = sourceMap.x_facebook_offsets = [];
  }

  let line = 0;
  modules.forEach(({code, id, map, name}) => {
    const hasOffset = withCustomOffsets && id != null;
    const column = hasOffset ? wrapperEnd(code) : 0;
    sections.push(Section(line, column, map || lineToLineSourceMap(code, name)));
    if (hasOffset) {
      offsets[id] = line;
    }
    line += countLines(code);
  });

  return sourceMap;
}
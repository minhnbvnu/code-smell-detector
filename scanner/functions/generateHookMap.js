function generateHookMap(sourceAST) {
  const hookNamesMapping = getHookNamesMappingFromAST(sourceAST);
  const namesMap = new Map();
  const names = [];
  const mappings = [];
  let currentLine = null;
  hookNamesMapping.forEach(({
    name,
    start
  }) => {
    let nameIndex = namesMap.get(name);

    if (nameIndex == null) {
      names.push(name);
      nameIndex = names.length - 1;
      namesMap.set(name, nameIndex);
    } // TODO: We add a -1 at the end of the entry so we can later
    // encode/decode the mappings by reusing the encode/decode functions
    // from the `sourcemap-codec` library. This library expects segments
    // of specific sizes (i.e. of size 4) in order to encode them correctly.
    // In the future, when we implement our own encoding, we will not
    // need this restriction and can remove the -1 at the end.


    const entry = [start.line, start.column, nameIndex, -1];

    if (currentLine !== start.line) {
      currentLine = start.line;
      mappings.push([entry]);
    } else {
      const current = mappings[mappings.length - 1];
      current.push(entry);
    }
  });
  return {
    names,
    mappings
  };
}
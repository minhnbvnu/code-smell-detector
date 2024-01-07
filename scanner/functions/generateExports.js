function generateExports(symbols) {
  const namespaces = {};
  const imports = {};
  const blocks = [];
  symbols.forEach(function (symbol) {
    const name = symbol.name;
    if (!name.includes('#')) {
      const imp = getImport(symbol);
      if (imp) {
        imports[imp] = true;
      }
      const line = formatSymbolExport(symbol, namespaces, imports);
      if (line) {
        blocks.push(line);
      }
    }
  });
  const nsdefs = [];
  const ns = Object.keys(namespaces).sort();
  for (let i = 0, ii = ns.length; i < ii; ++i) {
    if (namespaces[ns[i]]) {
      nsdefs.push(`${ns[i]} = {};`);
    }
  }
  const defs = ['\nvar ol = {};'].concat(nsdefs, [...new Set(blocks)]);
  const lines = Object.keys(imports).concat(defs.sort());
  lines.push('', 'export default ol;');
  return lines.join('\n');
}
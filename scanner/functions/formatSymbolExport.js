function formatSymbolExport(symbol, namespaces, imports) {
  const name = symbol.name;
  const parts = name.split('~');
  const nsParts = parts[0].replace(/^module\:/, '').split(/[\/\.]/);
  const last = nsParts.length - 1;
  const imp = getImport(symbol, nsParts[last]);
  if (imp) {
    const isNamed = parts[0].includes('.');
    const importName = isNamed
      ? '_' + nsParts.slice(0, last).join('_') + '$' + nsParts[last]
      : '$' + nsParts.join('$');
    let line = nsParts[0];
    for (let i = 1, ii = nsParts.length; i < ii; ++i) {
      line += `.${nsParts[i]}`;
      namespaces[line] =
        (line in namespaces ? namespaces[line] : true) && i < ii - 1;
    }
    line += ` = ${importName};`;
    imports[imp] = true;
    return line;
  }
  return '';
}
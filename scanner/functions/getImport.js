function getImport(symbol, member) {
  const defaultExport = symbol.name.split('~');
  if (symbol.isDefaultExport) {
    const from = defaultExport[0].replace(/^module\:/, './');
    const importName = from.replace(/[.\/]+/g, '$');
    return `import ${importName} from '${from}.js';`;
  }
  const namedExport = symbol.name.split('.');
  if (
    member &&
    namedExport.length > 1 &&
    (defaultExport.length <= 1 || defaultExport[0].includes('.'))
  ) {
    const from = namedExport[0].replace(/^module\:/, './');
    const importName = from.replace(/[.\/]+/g, '_');
    return `import {${member} as ${importName}$${member}} from '${from}.js';`;
  }
  return '';
}
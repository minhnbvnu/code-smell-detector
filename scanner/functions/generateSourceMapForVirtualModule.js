function generateSourceMapForVirtualModule(module) {
  // All lines map 1-to-1
  let mappings = 'AAAA;';

  for (let i = 1; i < module.code.split('\n').length; i++) {
    mappings +=  'AACA;';
  }

  return {
    version: 3,
    sources: [ module.sourcePath ],
    names: [],
    mappings: mappings,
    file: module.sourcePath,
    sourcesContent: [ module.sourceCode ],
  };
}
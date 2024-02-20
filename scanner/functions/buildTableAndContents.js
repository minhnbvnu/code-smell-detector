function buildTableAndContents(startupCode, modules, encoding) {
  const buffers = buildModuleBuffers(startupCode, modules, encoding);
  const table = buildModuleTable(buffers, encoding);

  return [fileHeader, table].concat(buffers.map(({buffer}) => buffer));
}
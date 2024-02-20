function buildModuleBuffers(startupCode, modules, encoding) {
  return (
    [moduleToBuffer('', startupCode, encoding, true)].concat(
      modules.map(module =>
        moduleToBuffer(
          String(module.id),
          module.code,
          encoding,
        )
      )
    )
  );
}
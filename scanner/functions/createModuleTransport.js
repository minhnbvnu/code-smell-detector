function createModuleTransport(data) {
  return new ModuleTransport({
    code: '',
    id: '',
    sourceCode: '',
    sourcePath: '',
    ...data,
  });
}
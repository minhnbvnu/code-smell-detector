function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}
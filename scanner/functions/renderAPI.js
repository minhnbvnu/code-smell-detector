function renderAPI(type) {
  return function(filepath) {
    let json;
    try {
      json = jsDocs(fs.readFileSync(filepath).toString());
    } catch (e) {
      console.error('Cannot parse file', filepath, e);
      json = {};
    }
    return componentsToMarkdown(type, json, filepath, componentCount++);
  };
}
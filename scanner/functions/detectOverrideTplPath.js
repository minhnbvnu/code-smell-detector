async function detectOverrideTplPath(tplPath) {
  if (!tplPath) {
    return;
  }
  const overrideTplPath = path.resolve(path.dirname(tplPath), 'template.override.yml');
  if (await fs.pathExists(overrideTplPath)) {
    return overrideTplPath;
  }
  return;
}
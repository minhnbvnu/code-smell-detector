function getDependencies(jsSource, pkg) {
  const dependencies = {
    ol: pkg.version,
  };

  let importMatch;
  while ((importMatch = importRegEx.exec(jsSource))) {
    const imp = importMatch[1];
    if (!imp.startsWith('ol/') && imp != 'ol') {
      const parts = imp.split('/');
      const dep = imp.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
      if (dep in pkg.devDependencies) {
        dependencies[dep] = pkg.devDependencies[dep];
      } else if (dep in pkg.dependencies) {
        dependencies[dep] = pkg.dependencies[dep];
      }
    }
  }
  return dependencies;
}
function dependenciesObjectToPatterns(dependencies) {
  if (!dependencies) {
    return [];
  }
  return Object.keys(dependencies).map(name => `${name}@${(dependencies || {})[name]}`);
}
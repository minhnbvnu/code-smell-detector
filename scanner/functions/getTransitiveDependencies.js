function getTransitiveDependencies(lockfile, roots) {
  // Queue of dependency patterns to visit; set of already-visited patterns
  const queue = [];
  const patterns = new Set();

  const enqueue = pattern => {
    if (patterns.has(pattern)) {
      return;
    }
    patterns.add(pattern);
    queue.push(pattern);
  };

  roots.forEach(enqueue);

  // Final result set
  const transitiveDependencies = new Set();

  while (queue.length > 0) {
    const pattern = queue.shift();
    const lockManifest = lockfile.getLocked(pattern);

    if (!lockManifest) {
      continue;
    }

    // Add the dependency to the result set
    transitiveDependencies.add(`${lockManifest.name}@${lockManifest.version}`);

    // Enqueue any dependencies of the dependency for processing

    const dependencyPatterns = dependenciesObjectToPatterns(lockManifest.dependencies);
    dependencyPatterns.forEach(enqueue);

    const optionalDependencyPatterns = dependenciesObjectToPatterns(lockManifest.optionalDependencies);
    optionalDependencyPatterns.forEach(enqueue);
  }

  return transitiveDependencies;
}
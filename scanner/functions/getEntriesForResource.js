function getEntriesForResource(resource) {
  let entriesForResource = cache_entries.get(resource);

  if (entriesForResource === undefined) {
    const config = resourceConfigs.get(resource);
    entriesForResource = config !== undefined && config.useWeakMap ? new WeakMap() : new Map();
    cache_entries.set(resource, entriesForResource);
  }

  return entriesForResource;
}
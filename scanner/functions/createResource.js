function createResource(fetch, hashInput, config = {}) {
  const resource = {
    clear() {
      cache_entries.delete(resource);
    },

    invalidate(key) {
      const entriesForResource = getEntriesForResource(resource);
      entriesForResource.delete(key);
    },

    read(input) {
      // Prevent access outside of render.
      readContext(CacheContext);
      const key = hashInput(input);
      const result = accessResult(resource, fetch, input, key);

      switch (result.status) {
        case Pending:
          {
            const suspender = result.value;
            throw suspender;
          }

        case Resolved:
          {
            const value = result.value;
            return value;
          }

        case Rejected:
          {
            const error = result.value;
            throw error;
          }

        default:
          // Should be unreachable
          return undefined;
      }
    },

    preload(input) {
      // Prevent access outside of render.
      readContext(CacheContext);
      const key = hashInput(input);
      accessResult(resource, fetch, input, key);
    },

    write(key, value) {
      const entriesForResource = getEntriesForResource(resource);
      const resolvedResult = {
        status: Resolved,
        value
      };
      entriesForResource.set(key, resolvedResult);
    }

  };
  resourceConfigs.set(resource, config);
  return resource;
}
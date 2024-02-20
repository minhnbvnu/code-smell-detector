function hydrateHelper(dehydratedData, path) {
  if (dehydratedData !== null) {
    const {
      cleaned,
      data,
      unserializable
    } = dehydratedData;

    if (path) {
      const {
        length
      } = path;

      if (length > 0) {
        // Hydration helper requires full paths, but inspection dehydrates with relative paths.
        // In that event it's important that we adjust the "cleaned" paths to match.
        return Object(hydration["c" /* hydrate */])(data, cleaned.map(cleanedPath => cleanedPath.slice(length)), unserializable.map(unserializablePath => unserializablePath.slice(length)));
      }
    }

    return Object(hydration["c" /* hydrate */])(data, cleaned, unserializable);
  } else {
    return null;
  }
}
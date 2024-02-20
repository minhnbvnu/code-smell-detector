function retrieveSourceMap(source) {
  let mapURL;
  return retrieveSourceMapURL(source)
    .then(
      (sourceMappingURL) => {
        if (!sourceMappingURL) {
          throw notFoundError;
        }

        // Support source map URLs relative to the source URL
        mapURL = relativeToAbsolute(source, sourceMappingURL);
        return mapURL;
      },
      null,
      'ember-inspector'
    )
    .then(retrieveFile, null, 'ember-inspector')
    .then(
      (sourceMapData) => {
        if (!sourceMapData) {
          return null;
        }
        return {
          url: mapURL,
          map: sourceMapData,
        };
      },
      null,
      'ember-inspector'
    );
}
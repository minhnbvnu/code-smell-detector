function futureState(stateName, urlPrefix, url, type, parent) {
  return {
    name: stateName,       // Fully qualified name of future state
    urlPrefix: urlPrefix,       // Deprecated; Placeholder URL prefix used to indicate a future state lives at or below here
    url: url,                   // The url portion used to indicate a future state lives at, or below here.
                                // Concat'd with the parent state's url similar to a regular state.url definition
    type: type,                 // Type of future state, used to build the real state definition
    parent: parent              // The parent state or parent state name, (used to build the UrlMatcher)
  };
}
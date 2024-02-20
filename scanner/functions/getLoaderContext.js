function getLoaderContext(context, options, previousContext = null) {
    if (previousContext) {
      return previousContext;
    }
    const resolvedContext = {
      fetch: getFetchFunction(options, context),
      ...context
    };
    if (!Array.isArray(resolvedContext.loaders)) {
      resolvedContext.loaders = null;
    }
    return resolvedContext;
  }
function interceptedResolveFilename(request, parent) {
    if (/\/Platform\/[\w]+$/.test(request)) {
      request = `${request}.ios`;
    }
    return originalResolveFilename(request, parent);
  }
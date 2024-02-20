function findLoaderByMIMEType(loaders, mimeType) {
    for (const loader of loaders) {
      if (loader.mimeTypes && loader.mimeTypes.includes(mimeType)) {
        return loader;
      }
      if (mimeType === `application/x.${loader.id}`) {
        return loader;
      }
    }
    return null;
  }
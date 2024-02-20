function findLoaderByExtension(loaders, extension) {
    extension = extension.toLowerCase();
    for (const loader of loaders) {
      for (const loaderExtension of loader.extensions) {
        if (loaderExtension.toLowerCase() === extension) {
          return loader;
        }
      }
    }
    return null;
  }
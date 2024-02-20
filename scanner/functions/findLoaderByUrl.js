function findLoaderByUrl(loaders, url) {
    const match = url && EXT_PATTERN.exec(url);
    const extension = match && match[1];
    return extension ? findLoaderByExtension(loaders, extension) : null;
  }
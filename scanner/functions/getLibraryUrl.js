function getLibraryUrl(library, moduleName, options) {
    if (library.startsWith("http")) {
      return library;
    }
    const modules = options.modules || {};
    if (modules[library]) {
      return modules[library];
    }
    if (!isBrowser2) {
      return `modules/${moduleName}/dist/libs/${library}`;
    }
    if (options.CDN) {
      assert3(options.CDN.startsWith("http"));
      return `${options.CDN}/${moduleName}@${VERSION2}/dist/libs/${library}`;
    }
    if (isWorker) {
      return `../src/libs/${library}`;
    }
    return `modules/${moduleName}/src/libs/${library}`;
  }
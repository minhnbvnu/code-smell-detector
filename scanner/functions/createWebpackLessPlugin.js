function createWebpackLessPlugin(loaderContext, implementation) {
  const resolve = loaderContext.getResolve({
    dependencyType: "less",
    conditionNames: ["less", "style", "..."],
    mainFields: ["less", "style", "main", "..."],
    mainFiles: ["index", "..."],
    extensions: [".less", ".css"],
    preferRelative: true,
  });

  class WebpackFileManager extends implementation.FileManager {
    supports(filename) {
      if (filename[0] === "/" || IS_NATIVE_WIN32_PATH.test(filename)) {
        return true;
      }

      if (this.isPathAbsolute(filename)) {
        return false;
      }

      return true;
    }

    // Sync resolving is used at least by the `data-uri` function.
    // This file manager doesn't know how to do it, so let's delegate it
    // to the default file manager of Less.
    // We could probably use loaderContext.resolveSync, but it's deprecated,
    // see https://webpack.js.org/api/loaders/#this-resolvesync
    supportsSync() {
      return false;
    }

    async resolveFilename(filename, currentDirectory) {
      // Less is giving us trailing slashes, but the context should have no trailing slash
      const context = currentDirectory.replace(trailingSlash, "");

      let request = filename;

      // A `~` makes the url an module
      if (MODULE_REQUEST_REGEX.test(filename)) {
        request = request.replace(MODULE_REQUEST_REGEX, "");
      }

      if (IS_MODULE_IMPORT.test(filename)) {
        request = request[request.length - 1] === "/" ? request : `${request}/`;
      }

      return this.resolveRequests(context, [...new Set([request, filename])]);
    }

    async resolveRequests(context, possibleRequests) {
      if (possibleRequests.length === 0) {
        return Promise.reject();
      }

      let result;

      try {
        result = await resolve(context, possibleRequests[0]);
      } catch (error) {
        const [, ...tailPossibleRequests] = possibleRequests;

        if (tailPossibleRequests.length === 0) {
          throw error;
        }

        result = await this.resolveRequests(context, tailPossibleRequests);
      }

      return result;
    }

    async loadFile(filename, ...args) {
      let result;

      try {
        if (IS_SPECIAL_MODULE_IMPORT.test(filename)) {
          const error = new Error();

          error.type = "Next";

          throw error;
        }

        result = await super.loadFile(filename, ...args);
      } catch (error) {
        if (error.type !== "File" && error.type !== "Next") {
          return Promise.reject(error);
        }

        try {
          result = await this.resolveFilename(filename, ...args);
        } catch (webpackResolveError) {
          error.message =
            `Less resolver error:\n${error.message}\n\n` +
            `Webpack resolver error details:\n${webpackResolveError.details}\n\n` +
            `Webpack resolver error missing:\n${webpackResolveError.missing}\n\n`;

          return Promise.reject(error);
        }

        loaderContext.addDependency(result);

        return super.loadFile(result, ...args);
      }

      const absoluteFilename = path.isAbsolute(result.filename)
        ? result.filename
        : path.resolve(".", result.filename);

      loaderContext.addDependency(path.normalize(absoluteFilename));

      return result;
    }
  }

  return {
    install(lessInstance, pluginManager) {
      pluginManager.addFileManager(new WebpackFileManager());
    },
    minVersion: [3, 0, 0],
  };
}
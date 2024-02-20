async function getCodeFromLess(testId, options = {}, context = {}) {
  let pathToFile;

  if (context.packageExportsCustomConditionTestVariant === 1) {
    pathToFile = path.resolve(
      __dirname,
      "..",
      "fixtures",
      "node_modules/package-with-exports-and-custom-condition/style-1.less",
    );
  } else if (context.packageExportsCustomConditionTestVariant === 2) {
    pathToFile = path.resolve(
      __dirname,
      "..",
      "fixtures",
      "node_modules/package-with-exports-and-custom-condition/style-2.less",
    );
  } else {
    pathToFile = path.resolve(__dirname, "..", "fixtures", testId);
  }

  const defaultOptions = {
    plugins: [],
    relativeUrls: true,
    filename: pathToFile,
  };
  const lessOptions = options.lessOptions || {};

  let data = await fs.promises.readFile(pathToFile);

  if (typeof options.additionalData !== "undefined") {
    data =
      typeof options.additionalData === "function"
        ? `${await options.additionalData(data, {
            rootContext: path.resolve(__dirname, "../fixtures"),
            resourcePath: pathToFile,
          })}`
        : `${options.additionalData}\n${data}`;
  }

  const mergedOptions = {
    ...defaultOptions,
    ...lessOptions,
  };

  mergedOptions.plugins.unshift(new CustomImportPlugin());

  return less.render(data.toString(), mergedOptions);
}
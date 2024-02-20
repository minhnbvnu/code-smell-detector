function getLessImplementation(loaderContext, implementation) {
  let resolvedImplementation = implementation;

  if (!implementation || typeof implementation === "string") {
    const lessImplPkg = implementation || "less";

    // eslint-disable-next-line import/no-dynamic-require, global-require
    resolvedImplementation = require(lessImplPkg);
  }

  // eslint-disable-next-line consistent-return
  return resolvedImplementation;
}
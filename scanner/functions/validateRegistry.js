function validateRegistry(runtime, options) {
  if (options.indexUrl && options.registry) {
    throw new Error(`'--index-url' and '--registry' cannot be specified together.`);
  }

  if (options.indexUrl && !(runtime.indexOf('python') > -1)) {
    throw new Error(`'--index-url' needs to be used with '--runtime' python2.7/python3.6, and you are currently using ${runtime}`);
  }

  if (options.registry && !(runtime.indexOf('node') > -1)) {
    throw new Error(`'--registry' needs to be used with '--runtime' nodejs6/nodejs8/nodejs10/nodejs12, and you are currently using ${runtime}`);
  }
}
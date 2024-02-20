function doBuildPaths(paths) {
  if (typeof paths === 'string') {
    return paths;
  } else if (paths instanceof Array) {
    return paths.join('\n');
  }
  throw Error(`The ${ typeof paths } type not supported.`);
}
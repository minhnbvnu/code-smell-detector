function validateTplName(...tplPaths) {
  for (const tplPath of tplPaths) {
    if (!(path.basename(tplPath).endsWith('.yml') || path.basename(tplPath).endsWith('.yaml'))) {
      throw new Error(red(`The template file name must end with yml or yaml.`));
    }
  }
}
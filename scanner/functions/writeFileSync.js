function writeFileSync(scope, path, data) {
  logger.info(scope, 'generating %s', chalk.cyan(path));
  if (fs.existsSync(path)) {
    if (!argv.force)
      return logger.error(scope,
          '%s already exists, use `-f` to continue', chalk.cyan(path));
    logger.warn(scope, 'will overwrite %s', chalk.cyan(path));
  }
  if (Function.isFunction(data))
    data = data();
  fs.writeFileSync(path, data.content || data);
  if (data.mode) {
    logger.info(scope, 'setting mode of %s to %s',
        chalk.cyan(path), chalk.cyan(data.mode.toString(8)));
    fs.chmodSync(path, data.mode);
  }
  logger.info(scope, 'created %s', chalk.cyan(path));
}
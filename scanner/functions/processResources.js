function processResources(error, resources, source, options, module, callback) {
  if (error) {
    logger.debug('Resources: **not found**');
    return callback(error);
  }

  const stringifiedResources = Array.isArray(resources) ? resources.join('\n') : resources;
  const output = getOutput(source, stringifiedResources, options);

  logger.debug('Resources: \n', `/* ${module} */ \n`, output);

  return callback(null, output);
}
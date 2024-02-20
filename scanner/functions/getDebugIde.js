function getDebugIde(options = {}) {
  if (options.config) {
    const debugIde = options.config;

    const ide = _.find(allowedDebugIdes, (allowedDebugIde) => {
      if (allowedDebugIde === debugIde.toLowerCase()) {
        return allowedDebugIde;
      }
    });

    if (!ide) {
      throw new Error(red(`Error parsing debug config. Option is one of: ${JSON.stringify(allowedDebugIdes)}`));
    }

    return ide;
  }

  return null;
}
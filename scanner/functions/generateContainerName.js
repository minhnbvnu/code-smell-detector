function generateContainerName(serviceName, functionName, debugPort) {
  return `fun-local-${serviceName}-${functionName}`.replace(/ /g, '')
    + (debugPort ? '-debug' : '-run');
}
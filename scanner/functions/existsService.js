function existsService(serviceName, content) {
  if (!content.Resources) {
    throw new Error(red('The template file format in the current directory is incorrect.'));
  }
  const service = content.Resources[serviceName];
  if (service && service.Type === SERVICE_TYPE) {
    if (service.Type === SERVICE_TYPE) {
      return true;
    }
    throw new Error(red(`The resource that needs to be imported already exists: ${serviceName}, type: ${service.Type}.`));
  }
  return false;
}
function checkResource(resourceName, content) {
  const resource = content.Resources[resourceName];
  if (resource) {
    if (resource.Type === SERVICE_TYPE) {
      throw new Error(red(`The service that needs to be imported already exists: ${resourceName}.`));
    }
    if (resource.Type === CUSTOM_DOMAIN_TYPE) {
      throw new Error(red(`The custom domain that needs to be imported already exists: ${resourceName}.`));
    }
    throw new Error(red(`The resource that needs to be imported already exists: ${resourceName}, type: ${resource.Type}.`));
  }
}
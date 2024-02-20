function checkService(serviceMetas, content, skipIfExists) {
  for (const serviceMeta of serviceMetas) {
    try {
      checkResource(serviceMeta.serviceName, content);
      serviceMeta.exists = false;
    } catch (error) {
      if (!skipIfExists) {
        throw error;
      }
      serviceMeta.exists = true;
    }
  }
}
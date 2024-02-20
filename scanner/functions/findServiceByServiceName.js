function findServiceByServiceName (resources, name) {

  for (let { serviceName, serviceRes } of findServices(resources)) {

    if (serviceName === name) {
      return {
        serviceName,
        serviceRes
      };
    }
  }
  return {};
}
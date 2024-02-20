function findServices(resources) {
  const services = [];

  iterateResources(resources, SERVICE_RESOURCE, (serviceName, serviceRes) => {
    services.push({
      serviceName,
      serviceRes
    });
  });

  return services;
}
function getDefaultService(tpl) {
  const services = findServices(tpl.Resources);

  if (services.length === 1) {
    return services[0].serviceName;
  }
  throw new Error(red('There should be one and only one service in your template.[yml|yaml] when ignoring service in nas path.'));
}
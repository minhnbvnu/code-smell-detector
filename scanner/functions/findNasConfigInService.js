function findNasConfigInService(serviceRes) {
  if (!serviceRes) { return null; }

  const serviceProps = serviceRes.Properties;

  if (!serviceProps) { return null; }

  return serviceProps.NasConfig;
}
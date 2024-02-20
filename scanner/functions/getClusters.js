function getClusters() {
  const stringifiedConfig = localStorage.getItem(customClusterConfigKey);
  const config = stringifiedConfig ? JSON.parse(stringifiedConfig) : null;
  return  config ? [...CLUSTERS, config] : CLUSTERS;
}
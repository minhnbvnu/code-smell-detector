function addCustomCluster(name, apiUrl) {
  const stringifiedConfig = JSON.stringify({name: name, label: name, apiUrl: apiUrl, clusterSlug: null});
  localStorage.setItem(customClusterConfigKey, stringifiedConfig);
}
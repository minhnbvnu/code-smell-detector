function clusterForEndpoint(endpoint) {
  return getClusters().find(({ apiUrl }) => apiUrl === endpoint);
}
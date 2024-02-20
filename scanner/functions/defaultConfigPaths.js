function defaultConfigPaths () {
  if (process.env.KUBECONFIG) {
    // From https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable
    // KUBECONFIG can support multiple config files.
    const delimiter = process.platform === 'win32' ? ';' : ':'
    return process.env.KUBECONFIG.split(delimiter)
  }
  const homeDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
  return [path.join(homeDir, '.kube', 'config')]
}
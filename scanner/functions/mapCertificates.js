function mapCertificates (cfgPath, config) {
  const configDir = path.dirname(cfgPath)

  if (config.clusters) {
    config.clusters.filter(cluster => cluster.cluster['certificate-authority']).forEach(cluster => {
      cluster.cluster['certificate-authority'] = path.resolve(configDir, cluster.cluster['certificate-authority'])
    })
  }

  if (config.users) {
    config.users.filter(user => user.user['client-certificate']).forEach(user => {
      user.user['client-certificate'] = path.resolve(configDir, user.user['client-certificate'])
    })

    config.users.filter(user => user.user['client-key']).forEach(user => {
      user.user['client-key'] = path.resolve(configDir, user.user['client-key'])
    })
  }

  return config
}
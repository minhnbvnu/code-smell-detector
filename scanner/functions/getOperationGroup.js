function getOperationGroup (operation) {
  const kubernetesAction = operation['x-kubernetes-action']
  const group = {
    get: 'read',
    list: 'read',
    watch: 'read',
    watchlist: 'read',

    delete: 'write',
    deletecollection: 'write',
    patch: 'write',
    post: 'write',
    put: 'write',

    connect: 'proxy'
  }[kubernetesAction]
  return group || 'misc'
}
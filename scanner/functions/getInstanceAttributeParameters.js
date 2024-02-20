function getInstanceAttributeParameters(shim, mongo) {
  let params = {
    host: null,
    port_path_or_id: null,
    database_name: null
  }

  if (mongo?.s?.topology) {
    shim.logger.trace('Adding datastore instance attributes from mongo.s.db + mongo.s.topology')
    const databaseName = mongo?.s?.db?.databaseName || mongo?.s?.namespace?.db || null
    const topology = mongo.s.topology
    params = getParametersFromTopology(topology, databaseName)
  } else if (mongo?.s?.db?.s?.client?.s?.options?.hosts?.length) {
    const databaseName = mongo?.s?.db?.databaseName || null
    const hosts = mongo.s.db.s.client.s.options.hosts
    params = getParametersFromHosts(hosts, databaseName)
  } else {
    shim.logger.trace('Could not find datastore instance attributes.')
  }

  return params
}
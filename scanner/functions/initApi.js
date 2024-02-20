function initApi({ agent, apiPath }) {
  const API = require(`./${apiPath}`)

  const api = new API(agent)
  require.cache.__NR_cache = module.exports = api
  return api
}
function getSolcoverJS(config){
  return `module.exports = ${JSON.stringify(config, null, ' ')}`
}
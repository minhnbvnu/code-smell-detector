async function getMasterQQ () {
  return (await import('../../../lib/config/config.js')).default.masterQQ
}
function testListNoBlocklistRedundancies (t, config) {
  const cleanConfig = cleanBlocklist(config)
  t.ok(cleanConfig.blacklist.length === config.blacklist.length, `blocklist contains ${config.blacklist.length-cleanConfig.blacklist.length} redundant entries. run 'yarn clean:blocklist'.`)
}
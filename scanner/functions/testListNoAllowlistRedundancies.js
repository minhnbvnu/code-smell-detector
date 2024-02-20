function testListNoAllowlistRedundancies (t, config) {
  const cleanConfig = cleanAllowlist(config)
  t.ok(cleanConfig.whitelist.length === config.whitelist.length, `allowlist contains ${config.whitelist.length-cleanConfig.whitelist.length} redundant entries. run 'yarn clean:allowlist'.`)
}
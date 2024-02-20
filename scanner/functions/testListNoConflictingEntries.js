function testListNoConflictingEntries (t, config) {
  const allowlistSet = new Set(config['whitelist']);
  const blocklistSet = new Set(config['blacklist']);

  const intersection = Array.from(allowlistSet).filter(v => blocklistSet.has(v));

  for (const item of intersection) {
    t.fail(`domain ${item} appears on both the allowlist and blocklist`);
  }
}
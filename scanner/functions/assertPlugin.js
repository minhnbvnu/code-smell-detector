async function assertPlugin(info, t) {
  /** @type {{default: Plugin}} */
  const pluginMod = await import(info.name)
  const plugin = pluginMod.default

  for (const check of info.checks) {
    const name = check.name + ':' + check.configuration

    // type-coverage:ignore-next-line -- `TestContext` not exposed from `node:test`.
    await t.test(name, async function () {
      await assertCheck(plugin, info, check)
    })
  }
}
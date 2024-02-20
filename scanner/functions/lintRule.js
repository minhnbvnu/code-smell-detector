function lintRule(meta, rule) {
  const id = typeof meta === 'string' ? meta : meta.origin
  const url = typeof meta === 'string' ? undefined : meta.url
  const parts = id.split(':')
  /* c8 ignore next -- Possibly useful if externalised later. */
  const source = parts[1] ? parts[0] : undefined
  const ruleId = parts[1]

  Object.defineProperty(plugin, 'name', {value: id})

  return plugin

  /**
   * @param {[level: Label | Severity, option?: Option] | Label | Option | Severity} [config]
   *   Config.
   * @returns
   *   Transform, if on.
   */
  function plugin(config) {
    const [severity, options] = coerce(ruleId, config)

    const fatal = severity === 2

    if (!severity) return

    /**
     * @param {Tree} tree
     *   Tree.
     * @param {VFile} file
     *   File.
     * @param {import('unified').TransformCallback<Tree>} next
     *   Next.
     * @returns {undefined}
     *   Nothing.
     */
    return function (tree, file, next) {
      let index = file.messages.length - 1

      wrap(rule, function (error) {
        const messages = file.messages

        /* c8 ignore next 8 -- add the error,
         * if not already properly added.
         * Only happens for incorrect plugins. */
        // @ts-expect-error: errors could be `messages`.
        if (error && !messages.includes(error)) {
          try {
            file.fail(error)
          } catch {}
        }

        while (++index < messages.length) {
          Object.assign(messages[index], {fatal, ruleId, source, url})
        }

        next()
      })(tree, file, options)
    }
  }
}
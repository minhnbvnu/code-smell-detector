async function assertCheck(plugin, info, check) {
  /** @type {{config: unknown}} */
  const {config} = JSON.parse(check.configuration)
  /** @type {PluggableList} */
  const extras = []
  const value = controlPictures(check.input)

  if (check.directive) extras.push(remarkDirective)
  if (check.frontmatter) extras.push(remarkFrontmatter)
  if (check.gfm) extras.push(remarkGfm)
  if (check.math) extras.push(remarkMath)
  if (check.mdx) extras.push(remarkMdx)

  const file = await remark()
    .use(plugin, config)
    .use(extras)
    .process(new VFile({path: check.name, value}))

  for (const message of file.messages) {
    assert.equal(message.ruleId, info.ruleId)
    assert.equal(
      message.url,
      'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-' +
        info.ruleId +
        '#readme'
    )
  }

  assert.deepEqual(
    file.messages.map(String).map(function (value) {
      return value.slice(value.indexOf(':') + 1)
    }),
    check.output
  )

  if (!check.positionless) {
    const file = await remark()
      .use(function () {
        return function (tree) {
          removePosition(tree)
        }
      })
      .use(plugin, config)
      .use(extras)
      .process(new VFile({path: check.name, value}))

    assert.deepEqual(file.messages, [])
  }
}
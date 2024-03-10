async function generateReadme(state) {
  const packageUrl = new URL(state.name + '/', packagesUrl)
  const moduleUrl = new URL('index.js', packageUrl)
  /** @type {[VFile, Record<string, unknown>]} */
  const [indexFile, indexModule] = await Promise.all([
    read(moduleUrl),
    import(moduleUrl.href)
  ])

  const file = new VFile(new URL('readme.md', packageUrl))

  // Check identifier name.
  if (!isIdentifierName(state.id)) {
    const message = indexFile.message('Expected a valid identifier as name')
    message.fatal = true
  }

  if (
    presets.some(function (d) {
      return d.name === state.name
    })
  ) {
    if (
      !('default' in indexModule) ||
      !indexModule.default ||
      typeof indexModule.default !== 'object'
    ) {
      const message = indexFile.message('Expected `export default` in preset')
      message.fatal = true
    }
  } else if (
    plugins.some(function (d) {
      return d.name === state.name
    })
  ) {
    const name = state.name.startsWith('remark-lint-') ? state.origin : state.id

    assert(name)
    if (
      !('default' in indexModule) ||
      !indexModule.default ||
      typeof indexModule.default !== 'function'
    ) {
      const message = indexFile.message('Expected `export default` in plugin')
      message.fatal = true
    } else if (indexModule.default.name !== name) {
      const message = indexFile.message(
        'Unexpected export default `' +
          indexModule.default.name +
          '`, expected `' +
          name +
          '`'
      )
      message.fatal = true
    }
  }

  /** @type {Specifiers} */
  const specifiers = {
    default:
      'default' in indexModule && indexModule.default ? state.id : undefined,
    named: Object.keys(indexModule).filter(function (d) {
      return d !== 'default'
    })
  }

  const block = parse(String(indexFile), {spacing: 'preserve'})
  const fileInfo = block[0] || {}

  const description = stripIndent(fileInfo.description || '').trim()

  const explicitDocs = fromMarkdown(description, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()]
  })

  /** @type {Record<string, Array<TopLevelContent>>} */
  const categories = {}
  let category = 'intro'
  let contentIndex = -1

  while (++contentIndex < explicitDocs.children.length) {
    const node = /** @type {TopLevelContent} */ (
      explicitDocs.children[contentIndex]
    )

    if (node.type === 'heading' && node.depth === 2) {
      category = slug(toString(node))
    }

    if (!(category in categories)) {
      categories[category] = []
    }

    categories[category].push(node)
  }

  if (!categories.intro || categories.intro.length === 0) {
    indexFile.message('Missing `intro` section in description')
  }

  if (!categories.use) {
    if (
      plugins.some(function (d) {
        return d.name === state.name
      }) ||
      presets.some(function (d) {
        return d.name === state.name
      })
    ) {
      categories.use = generateReadmePluggableUseSection(state)
    } else {
      indexFile.message('Missing `use` section in description')
    }
  }

  if (!categories.api) {
    indexFile.message('Missing `api` section in description')
    categories.api = []
  }

  const [apiHeading, ...apiRest] = categories.api || []

  if (categories.intro) {
    state.urls.set('github-remark', 'https://github.com/remarkjs/remark')
    state.urls.set(
      'github-remark-lint',
      'https://github.com/remarkjs/remark-lint'
    )
    state.urls.set('github-unified', 'https://github.com/unifiedjs/unified')
    /** @type {Root} */
    const fragment = {type: 'root', children: categories.intro}
    findAndReplace(
      fragment,
      ['remark-lint', 'remark', 'unified'].map(function (d) {
        return [
          new RegExp('\\b' + d + '\\b(?!-)', 'g'),
          function () {
            const code = d === 'remark-lint'
            /** @type {PhrasingContent} */
            let result = code
              ? {type: 'inlineCode', value: d}
              : {type: 'text', value: d}

            result = {
              type: 'linkReference',
              identifier: 'github-' + d,
              referenceType: code ? 'full' : 'collapsed',
              children: [result]
            }

            if (d === 'remark' || d === 'unified') {
              result = {type: 'strong', children: [result]}
            }

            return result
          }
        ]
      })
    )
  }

  /** @type {Array<TopLevelContent>} */
  const topLevelContent = [
    ...generateReadmeHead(state),
    ...generateReadmeMeta(state),
    ...(categories.intro || []),
    {type: 'heading', depth: 2, children: [{type: 'text', value: 'Contents'}]},
    ...(categories['what-is-this'] || []),
    ...(categories['when-should-i-use-this'] || []),
    ...generateReadmeIncludes(state),
    ...generateReadmeInstall(state, specifiers),
    ...(categories.use || []),
    ...(apiHeading
      ? [apiHeading, ...generateReadmeApiByline(state, specifiers), ...apiRest]
      : []),
    ...(categories.recommendation || []),
    ...(categories.fix || []),
    ...(categories.examples || generateReadmeExample(state)),
    ...generateReadmeTail(state)
  ]

  /** @type {Root} */
  const tree = {type: 'root', children: topLevelContent}
  /** @type {Set<string>} */
  const used = new Set()

  visit(tree, function (node, index, parent) {
    if (node.type === 'definition' && parent && typeof index === 'number') {
      const id = normalizeIdentifier(node.identifier).toLowerCase()
      state.urls.set(id, node.url)
      parent.children.splice(index, 1)
      return index
    }
  })

  visit(tree, function (node) {
    if ('identifier' in node && 'referenceType' in node) {
      const id = normalizeIdentifier(node.identifier).toLowerCase()

      if (state.urls.has(id)) {
        used.add(id)
      } else {
        file.message(
          'Missing link reference in `state.urls` for `' + id + '`',
          node
        )
      }
    }
  })

  for (const identifier of [...used].sort()) {
    const url = state.urls.get(identifier)
    assert(url)
    tree.children.push({type: 'definition', identifier, url})
  }

  file.value = toMarkdown(tree, {extensions: [gfmToMarkdown()]})
  file.data.changed = true

  return [file, indexFile]
}
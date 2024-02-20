function generateReadmePluggableUseSection(state) {
  const addRemark =
    state.name !== 'remark-lint' &&
    plugins.some(function (d) {
      return d.name === state.name
    })
  /** @type {Array<[string, string]>} */
  const imports = [
    [state.id, state.name],
    ['remarkParse', 'remark-parse'],
    ['remarkStringify', 'remark-stringify'],
    ['{read}', 'to-vfile'],
    ['{unified}', 'unified'],
    ['{reporter}', 'vfile-reporter']
  ]

  if (addRemark) {
    imports.push(['remarkLint', 'remark-lint'])
  }

  imports.sort(function (a, b) {
    return a[1].localeCompare(b[1])
  })

  const apiLines = [
    ...imports.map(function (d) {
      return 'import ' + d[0] + " from '" + d[1] + "'"
    }),
    '',
    "const file = await read('example.md')",
    '',
    'await unified()',
    '  .use(remarkParse)'
  ]

  if (addRemark) {
    apiLines.push('  .use(remarkLint)')
  }

  apiLines.push(
    '  .use(' + state.id + ')',
    '  .use(remarkStringify)',
    '  .process(file)',
    '',
    'console.error(reporter(file))'
  )

  const cliLines = [' …', ' "remarkConfig": {', '   "plugins": [', '     …']

  if (addRemark) {
    cliLines.push('     "remark-lint",')
  }

  cliLines.push('+    "' + state.name + '",', '     …', '   ]', ' }', ' …')

  // Idea: use estree, prettier?
  const api = apiLines.join('\n')
  const cli = cliLines.join('\n')

  return [
    {type: 'heading', depth: 2, children: [{type: 'text', value: 'Use'}]},
    {
      type: 'paragraph',
      children: [{type: 'text', value: 'On the API:'}]
    },
    {
      type: 'code',
      lang: 'js',
      value: api
    },
    {type: 'paragraph', children: [{type: 'text', value: 'On the CLI:'}]},
    {
      type: 'code',
      lang: 'sh',
      value:
        'remark --frail' +
        (addRemark ? ' --use remark-lint' : '') +
        ' --use ' +
        state.name +
        ' .'
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'On the CLI in a config file (here a '
        },
        {
          type: 'inlineCode',
          value: 'package.json'
        },
        {
          type: 'text',
          value: '):'
        }
      ]
    },
    {
      type: 'code',
      lang: 'diff',
      value: cli
    }
  ]
}
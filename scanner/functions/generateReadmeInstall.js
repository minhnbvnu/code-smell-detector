function generateReadmeInstall(state, specifiers) {
  let defaultImportSummary = specifiers.default
  /** @type {string | undefined} */
  let specifiersImportSummary

  const named = [...specifiers.named].sort()

  if (named.length > 3) {
    // Star import will include the default.
    defaultImportSummary = undefined
    specifiersImportSummary = '* as ' + state.id
  } else if (named.length > 0) {
    specifiersImportSummary = '{' + named.join(', ') + '}'
  }

  const importCodeSummary =
    defaultImportSummary && specifiersImportSummary
      ? defaultImportSummary + ', ' + specifiersImportSummary
      : defaultImportSummary || specifiersImportSummary
  assert(importCodeSummary)

  state.urls.set(
    'github-gist-esm',
    'https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c'
  )
  state.urls.set('npm-install', 'https://docs.npmjs.com/cli/install')
  state.urls.set('esm-sh', 'https://esm.sh')

  return [
    {
      type: 'heading',
      depth: 2,
      children: [{type: 'text', value: 'Install'}]
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'This package is '},
        {
          type: 'linkReference',
          identifier: 'github-gist-esm',
          referenceType: 'full',
          children: [{type: 'text', value: 'ESM only'}]
        },
        {
          type: 'text',
          value: '.\nIn Node.js (version 16+),\ninstall with '
        },
        {
          type: 'linkReference',
          identifier: 'npm-install',
          referenceType: 'collapsed',
          children: [{type: 'text', value: 'npm'}]
        },
        {type: 'text', value: ':'}
      ]
    },
    {type: 'code', lang: 'sh', value: 'npm install ' + state.name},
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'In Deno with '},
        {
          type: 'linkReference',
          identifier: 'esm-sh',
          label: 'esm-sh',
          referenceType: 'full',
          children: [{type: 'inlineCode', value: 'esm.sh'}]
        },
        {type: 'text', value: ':'}
      ]
    },
    {
      type: 'code',
      // Idea: use estree, prettier?
      lang: 'js',
      value:
        'import ' +
        importCodeSummary +
        " from 'https://esm.sh/" +
        state.name +
        '@' +
        state.versionMajor +
        "'"
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'In browsers with '},
        {
          type: 'linkReference',
          identifier: 'esm-sh',
          label: 'esm-sh',
          referenceType: 'full',
          children: [{type: 'inlineCode', value: 'esm.sh'}]
        },
        {type: 'text', value: ':'}
      ]
    },
    {
      type: 'code',
      lang: 'html',
      value:
        '<script type="module">\n  import ' +
        importCodeSummary +
        " from 'https://esm.sh/" +
        state.name +
        '@' +
        state.versionMajor +
        "?bundle'\n</script>"
    }
  ]
}
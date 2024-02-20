function generateReadmeTail(state) {
  const org = state.remote.split('/').slice(0, -1).join('/')
  const health = org + '/.github'
  const hMain = health + '/blob/main'

  state.urls.set('github-dotfiles-coc', hMain + '/code-of-conduct.md')
  state.urls.set('github-dotfiles-contributing', hMain + '/contributing.md')
  state.urls.set('github-dotfiles-health', health)
  state.urls.set('github-dotfiles-support', hMain + '/support.md')
  state.urls.set('file-license', state.remote + '/blob/main/license')
  state.urls.set('author', String(state.author.url || ''))

  return [
    {
      type: 'heading',
      depth: 2,
      children: [{type: 'text', value: 'Compatibility'}]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value:
            'Projects maintained by the unified collective are compatible with maintained\nversions of Node.js.\n\nWhen we cut a new major release, we drop support for unmaintained versions of\nNode.\nThis means we try to keep the current release line,\n'
        },
        {
          type: 'inlineCode',
          value: state.name + '@' + state.versionMajor
        },
        {
          type: 'text',
          value: ',\ncompatible with Node.js 12.'
        }
      ]
    },
    {
      type: 'heading',
      depth: 2,
      children: [{type: 'text', value: 'Contribute'}]
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'See '},
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'github-dotfiles-contributing',
          children: [{type: 'inlineCode', value: 'contributing.md'}]
        },
        {type: 'text', value: ' in '},
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'github-dotfiles-health',
          children: [{type: 'inlineCode', value: 'remarkjs/.github'}]
        },
        {type: 'text', value: ' for ways\nto get started.\nSee '},
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'github-dotfiles-support',
          children: [{type: 'inlineCode', value: 'support.md'}]
        },
        {type: 'text', value: ' for ways to get help.'}
      ]
    },
    {
      type: 'paragraph',
      children: [
        {type: 'text', value: 'This project has a '},
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'github-dotfiles-coc',
          children: [{type: 'text', value: 'code of conduct'}]
        },
        {
          type: 'text',
          value:
            '.\nBy interacting with this repository, organization, or community you agree to\nabide by its terms.'
        }
      ]
    },
    {
      type: 'heading',
      depth: 2,
      children: [{type: 'text', value: 'License'}]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'file-license',
          children: [{type: 'text', value: String(state.license || '')}]
        },
        {type: 'text', value: ' © '},
        {
          type: 'linkReference',
          referenceType: 'full',
          identifier: 'author',
          children: [{type: 'text', value: String(state.author.name || '')}]
        }
      ]
    }
  ]
}
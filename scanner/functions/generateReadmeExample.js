function generateReadmeExample(state) {
  const info = plugins.find(function (d) {
    return d.name === state.name
  })
  /** @type {Array<TopLevelContent>} */
  const children = []
  const checks = info?.checks || []
  let first = true

  for (const check of checks) {
    if (first) {
      children.push({
        type: 'heading',
        depth: 2,
        children: [{type: 'text', value: 'Examples'}]
      })

      first = false
    }

    children.push({
      type: 'heading',
      depth: 5,
      children: [{type: 'inlineCode', value: check.name}]
    })

    /** @type {{config: unknown}} */
    const {config} = JSON.parse(check.configuration)

    if (config !== true) {
      children.push({
        type: 'paragraph',
        children: [
          {type: 'text', value: 'When configured with '},
          {type: 'inlineCode', value: inspect(config)},
          {type: 'text', value: '.'}
        ]
      })
    }

    const empty = check.input.trim() === ''

    state.urls.set(
      'github-remark-directive',
      'https://github.com/remarkjs/remark-directive'
    )
    state.urls.set(
      'github-remark-frontmatter',
      'https://github.com/remarkjs/remark-frontmatter'
    )
    state.urls.set(
      'github-remark-gfm',
      'https://github.com/remarkjs/remark-gfm'
    )
    state.urls.set(
      'github-remark-math',
      'https://github.com/remarkjs/remark-math'
    )
    state.urls.set(
      'github-remark-mdx',
      'https://mdxjs.com/packages/remark-mdx/'
    )

    if (!empty) {
      children.push({
        type: 'heading',
        depth: 6,
        children: [{type: 'text', value: 'In'}]
      })

      /** @type {Array<PhrasingContent>} */
      const phrasing = []

      if (check.directive) {
        if (phrasing.length > 0) {
          phrasing.push({type: 'text', value: ',\n'})
        }

        phrasing.push(
          {type: 'text', value: 'directives ('},
          {
            type: 'linkReference',
            identifier: 'github-remark-directive',
            referenceType: 'full',
            children: [{type: 'inlineCode', value: 'remark-directive'}]
          },
          {type: 'text', value: ')'}
        )
      }

      if (check.frontmatter) {
        if (phrasing.length > 0) {
          phrasing.push({type: 'text', value: ',\n'})
        }

        phrasing.push(
          {type: 'text', value: 'frontmatter ('},
          {
            type: 'linkReference',
            identifier: 'github-remark-frontmatter',
            referenceType: 'full',
            children: [{type: 'inlineCode', value: 'remark-frontmatter'}]
          },
          {type: 'text', value: ')'}
        )
      }

      if (check.gfm) {
        if (phrasing.length > 0) {
          phrasing.push({type: 'text', value: ',\n'})
        }

        phrasing.push(
          {type: 'text', value: 'GFM ('},
          {
            type: 'linkReference',
            identifier: 'github-remark-gfm',
            referenceType: 'full',
            children: [{type: 'inlineCode', value: 'remark-gfm'}]
          },
          {type: 'text', value: ')'}
        )
      }

      if (check.math) {
        if (phrasing.length > 0) {
          phrasing.push({type: 'text', value: ',\n'})
        }

        phrasing.push(
          {type: 'text', value: 'math ('},
          {
            type: 'linkReference',
            identifier: 'github-remark-math',
            referenceType: 'full',
            children: [{type: 'inlineCode', value: 'remark-math'}]
          },
          {type: 'text', value: ')'}
        )
      }

      if (check.mdx) {
        if (phrasing.length > 0) {
          phrasing.push({type: 'text', value: ',\n'})
        }

        phrasing.push(
          {type: 'text', value: 'MDX ('},
          {
            type: 'linkReference',
            identifier: 'github-remark-mdx',
            referenceType: 'full',
            children: [{type: 'inlineCode', value: 'remark-mdx'}]
          },
          {type: 'text', value: ')'}
        )
      }

      if (phrasing.length > 0) {
        children.push({
          type: 'blockquote',
          children: [
            {
              type: 'paragraph',
              children: [
                {type: 'text', value: '👉 '},
                {
                  type: 'strong',
                  children: [{type: 'text', value: 'Note'}]
                },
                {type: 'text', value: ': this example uses\n'},
                ...phrasing,
                {type: 'text', value: '.'}
              ]
            }
          ]
        })
      }

      children.push({
        type: 'code',
        lang: check.mdx ? 'mdx' : 'markdown',
        value: check.input
      })
    }

    children.push({
      type: 'heading',
      depth: 6,
      children: [{type: 'text', value: 'Out'}]
    })

    if (check.output.length === 0) {
      children.push({
        type: 'paragraph',
        children: [{type: 'text', value: 'No messages.'}]
      })
    } else {
      children.push({
        type: 'code',
        lang: 'text',
        value: check.output.join('\n')
      })
    }
  }

  return children
}
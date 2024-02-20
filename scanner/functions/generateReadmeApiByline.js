function generateReadmeApiByline(state, specifiers) {
  /** @type {Paragraph} */
  const byline = {type: 'paragraph', children: []}
  const named = [...specifiers.named].sort()

  if (named.length > 0) {
    byline.children.push({
      type: 'text',
      value:
        'This package exports the identifier' +
        (named.length === 1 ? '' : 's') +
        '\n'
    })

    let index = -1

    while (++index < named.length) {
      if (index !== 0) {
        byline.children.push(
          named.length === 2
            ? {type: 'text', value: ' and\n'}
            : named.length - 1 === index
              ? {type: 'text', value: ', and\n'}
              : {type: 'text', value: ',\n'}
        )
      }

      const specifier = named[index]

      byline.children.push({
        type: 'linkReference',
        identifier: 'api-' + dashCase(specifier),
        referenceType: 'full',
        children: [{type: 'inlineCode', value: specifier}]
      })
    }

    byline.children.push({type: 'text', value: '.'})
  } else {
    byline.children.push({
      type: 'text',
      value: 'This package exports no identifiers.'
    })
  }

  state.urls.set('typescript', 'https://www.typescriptlang.org')

  const types = [...state.types].sort()

  if (types.length === 0) {
    byline.children.push(
      {type: 'text', value: '\nIt exports no additional '},
      {
        type: 'linkReference',
        identifier: 'typescript',
        referenceType: 'collapsed',
        children: [{type: 'text', value: 'TypeScript'}]
      },
      {type: 'text', value: ' types.'}
    )
  } else {
    byline.children.push(
      {type: 'text', value: '\nIt exports the '},
      {
        type: 'linkReference',
        identifier: 'typescript',
        referenceType: 'collapsed',
        children: [{type: 'text', value: 'TypeScript'}]
      },
      {
        type: 'text',
        value: ' type' + (types.length === 1 ? '' : 's') + '\n'
      }
    )

    let index = -1

    while (++index < types.length) {
      if (index !== 0) {
        byline.children.push(
          types.length === 2
            ? {type: 'text', value: ' and\n'}
            : types.length - 1 === index
              ? {type: 'text', value: ', and\n'}
              : {type: 'text', value: ',\n'}
        )
      }

      const type = types[index]

      byline.children.push({
        type: 'linkReference',
        identifier: 'api' + dashCase(type),
        referenceType: 'full',
        children: [{type: 'inlineCode', value: type}]
      })
    }

    byline.children.push({type: 'text', value: '.'})
  }

  if (specifiers.default) {
    byline.children.push(
      {type: 'text', value: '\nThe default export is\n'},
      {
        type: 'linkReference',
        identifier: 'api-' + dashCase(specifiers.default),
        referenceType: 'full',
        children: [{type: 'inlineCode', value: specifiers.default}]
      },
      {type: 'text', value: '.'}
    )
  } else {
    byline.children.push({type: 'text', value: '\nThere is no default export.'})
  }

  return [byline]
}
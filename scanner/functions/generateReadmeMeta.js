function generateReadmeMeta(state) {
  const ghSlug = state.remote.split('/').slice(-2).join('/')
  const ghUrl = 'https://github.com/' + ghSlug

  state.urls.set('badge-build-url', ghUrl + '/actions')
  state.urls.set('badge-build-image', ghUrl + '/workflows/main/badge.svg')
  state.urls.set('badge-coverage-url', 'https://codecov.io/github/' + ghSlug)
  state.urls.set(
    'badge-coverage-image',
    'https://img.shields.io/codecov/c/github/' + ghSlug + '.svg'
  )
  state.urls.set(
    'badge-downloads-url',
    'https://www.npmjs.com/package/' + state.name
  )
  state.urls.set(
    'badge-downloads-image',
    'https://img.shields.io/npm/dm/' + state.name + '.svg'
  )
  state.urls.set('badge-size-url', 'https://bundlejs.com/?q=' + state.name)
  state.urls.set(
    'badge-size-image',
    'https://img.shields.io/bundlejs/size/' + state.name
  )
  state.urls.set('badge-funding-url', 'https://opencollective.com/unified')
  state.urls.set(
    'badge-funding-sponsors-image',
    'https://opencollective.com/unified/sponsors/badge.svg'
  )
  state.urls.set(
    'badge-funding-backers-image',
    'https://opencollective.com/unified/backers/badge.svg'
  )
  state.urls.set(
    'badge-chat-url',
    'https://github.com/remarkjs/remark/discussions'
  )
  state.urls.set(
    'badge-chat-image',
    'https://img.shields.io/badge/chat-discussions-success.svg'
  )

  return [
    {
      type: 'paragraph',
      children: [
        {
          type: 'linkReference',
          identifier: 'badge-build-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-build-image',
              referenceType: 'full',
              alt: 'Build'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-coverage-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-coverage-image',
              referenceType: 'full',
              alt: 'Coverage'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-downloads-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-downloads-image',
              referenceType: 'full',
              alt: 'Downloads'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-size-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-size-image',
              referenceType: 'full',
              alt: 'Size'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-funding-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-funding-sponsors-image',
              referenceType: 'full',
              alt: 'Sponsors'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-funding-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-funding-backers-image',
              referenceType: 'full',
              alt: 'Backers'
            }
          ]
        },
        {type: 'text', value: '\n'},
        {
          type: 'linkReference',
          identifier: 'badge-chat-url',
          referenceType: 'full',
          children: [
            {
              type: 'imageReference',
              identifier: 'badge-chat-image',
              referenceType: 'full',
              alt: 'Chat'
            }
          ]
        }
      ]
    }
  ]
}
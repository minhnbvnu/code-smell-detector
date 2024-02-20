function generateReadmeIncludes(state) {
  /** @type {Array<[presetName: string, options: unknown]>} */
  const inPresets = []
  /** @type {Array<[name: string, options: unknown]>} */
  let pluginsInPreset = []

  for (const preset of presets) {
    if (preset.name === state.name) {
      pluginsInPreset = preset.plugins
    }

    for (const [name, options] of preset.plugins) {
      if (name === state.name) {
        inPresets.push([preset.name, options])
      }
    }
  }

  pluginsInPreset.sort(function (a, b) {
    return collator.compare(a[0], b[0])
  })

  inPresets.sort(function (a, b) {
    return collator.compare(a[0], b[0])
  })

  /** @type {Array<TopLevelContent>} */
  const children = []

  if (
    presets.some(function (d) {
      return d.name === state.name
    })
  ) {
    assert(pluginsInPreset.length > 0, 'expected plugins in preset')
    /** @type {Array<TopLevelContent>} */
    children.push(
      {
        type: 'heading',
        depth: 2,
        children: [{type: 'text', value: 'Plugins'}]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'This preset includes the following plugins:'
          }
        ]
      },
      {
        type: 'table',
        align: [],
        children: [
          {
            type: 'tableRow',
            children: [
              {
                type: 'tableCell',
                children: [{type: 'text', value: 'Plugin'}]
              },
              {
                type: 'tableCell',
                children: [{type: 'text', value: 'Options'}]
              }
            ]
          },
          ...pluginsInPreset.map(function ([name, options]) {
            /** @type {TableContent} */
            const row = {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'link',
                      url: state.remote + '/tree/main/packages/' + name,
                      children: [{type: 'inlineCode', value: name}]
                    }
                  ]
                },
                {
                  type: 'tableCell',
                  children: options
                    ? [{type: 'inlineCode', value: inspect(options)}]
                    : []
                }
              ]
            }

            return row
          })
        ]
      }
    )
  }

  if (
    plugins.some(function (d) {
      return d.name === state.name
    })
  ) {
    children.push({
      type: 'heading',
      depth: 2,
      children: [{type: 'text', value: 'Presets'}]
    })

    if (inPresets.length === 0) {
      children.push({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'This plugin is not included in presets maintained here.'
          }
        ]
      })
    } else {
      children.push(
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'This plugin is included in the following presets:'
            }
          ]
        },
        {
          type: 'table',
          align: [],
          children: [
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [{type: 'text', value: 'Preset'}]
                },
                {
                  type: 'tableCell',
                  children: [{type: 'text', value: 'Options'}]
                }
              ]
            },
            ...inPresets.map(function ([name, options]) {
              /** @type {TableContent} */
              const row = {
                type: 'tableRow',
                children: [
                  {
                    type: 'tableCell',
                    children: [
                      {
                        type: 'link',
                        url: state.remote + '/tree/main/packages/' + name,
                        children: [{type: 'inlineCode', value: name}]
                      }
                    ]
                  },
                  {
                    type: 'tableCell',
                    children: options
                      ? [{type: 'inlineCode', value: inspect(options)}]
                      : []
                  }
                ]
              }

              return row
            })
          ]
        }
      )
    }
  }

  return children
}
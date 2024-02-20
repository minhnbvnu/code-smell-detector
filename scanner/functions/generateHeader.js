function generateHeader () {
      const contents = []

      const title = regionText.value || lang.defaultHead
      const titleOption = {
        class: 'rg-header-text',
        title
      }
      contents.push(h('div', titleOption, title))

      const btnOption = {
        type: 'button',
        title: lang.clear,
        onClick: clear
      }
      const btn = h('button', btnOption, h(IconTrash))
      contents.push(h('div', { class: 'rg-header-control' }, btn))

      return h('div', { class: 'rg-header' }, contents)
    }
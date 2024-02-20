function generateContent () {
      const child = []

      const items = getLevelList(level.value)

      if (items && items.value) {
        child.push(
          ...items.value.map(val => {
            const option = {
              key: val.key,
              class: { 'rg-item': true, active: match(val) },
              onMouseup: () => { pick(val) }
            }
            return h('li', option, val.value)
          })
        )
      }

      if (!child.length) {
        child.push(h('li', { class: 'rg-message-box' }, lang.noMatch))
      }

      return h('div', { class: 'rg-results-container' }, [
        h('ul', { class: 'rg-results' }, child)
      ])
    }
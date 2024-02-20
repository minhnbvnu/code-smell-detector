function generateTabs () {
      const tabs = levels.map(val => {
        const levelItem = LEVELS.find(value => value.key === val)
        const linkOption = {
          href: 'javascript:void(0)',
          onClick: () => { level.value = levelItem.key }
        }
        const link = h('a', linkOption, levelItem.title)
        const option = {
          key: levelItem.key,
          class: { active: levelItem.key === level.value }
        }
        return h('li', option, link)
      })
      return h('div', { class: 'rg-level-tabs' }, h('ul', tabs))
    }
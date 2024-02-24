function generateDropdownTriggerButton (slots, useContent, clear) {
    const lang = useLanguage(props.language)
    const content = useContent()
    const elements = []

    if (slots && 'default' in slots) { // scoped slot
      elements.push(slots.default({ region: content?.value?.region, visible }))
    } else {
      const buttonElements = [
        h('span', content?.value?.regionText || lang.pleaseSelect)
      ]

      if (content?.value?.regionText) { // 清除图标
        const clearOption = {
          class: 'rg-clear-btn',
          title: lang.clear,
          onClick: e => {
            e.stopPropagation()
            clear && clear()
          }
        }
        buttonElements.push(h('span', clearOption, h(IconX)))
      } else { // 下拉图标
        buttonElements.push(h('span', { class: 'rg-caret-down' }))
      }

      const btnOption = {
        class: {
          'rg-default-btn': true,
          'rg-opened': visible.value
        },
        type: 'button'
      }
      elements.push(h('button', btnOption, buttonElements))
    }

    return h('div', { class: 'rg-trigger-container' }, elements)
  }
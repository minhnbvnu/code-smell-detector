function renderBtn(h, data, { props, listeners }) {
  const expandHandler = listeners['on-expand']

  let cls = ['org-tree-node-btn']

  if (data[props.props.expand]) {
    cls.push('expanded')
  }

  return h('span', {
    domProps: {
      className: cls.join(' ')
    },
    on: {
      click: (e) => expandHandler && expandHandler(e, data)
    }
  })
}
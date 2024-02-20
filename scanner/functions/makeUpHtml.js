function makeUpHtml(conf) {
  const htmlList = []
  const columnList = []
  confGlobal = conf
  someSpanIsNot24 = conf.fields.some(item => item.span !== 24)
  conf.fields.forEach(el => {
    htmlList.push(layouts[el.layout](el))
    columnList.push(`<el-table-column label="${el.label}" prop="${el.fieldName}" align="center" />`)
  })
  const htmlStr = htmlList.join('\n')
  const columnStr = columnList.join('\n')

  let temp = buildFormTemplate(conf, htmlStr)
  let table = buildTable(columnStr)
  temp = dialogWrapper(temp, table)
  confGlobal = null
  return temp
}
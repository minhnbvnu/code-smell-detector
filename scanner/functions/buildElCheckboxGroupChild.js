function buildElCheckboxGroupChild(conf) {
  const children = []
  if (conf.options && conf.options.length) {
    const tag = conf.optionType === 'button' ? 'el-checkbox-button' : 'el-checkbox'
    const border = conf.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${conf.fieldName}Options" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}
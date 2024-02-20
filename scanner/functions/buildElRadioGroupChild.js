function buildElRadioGroupChild(conf) {
  const children = []
  if (conf.options && conf.options.length) {
    const tag = conf.optionType === 'button' ? 'el-radio-button' : 'el-radio'
    const border = conf.border ? 'border' : ''
    children.push(`<${tag} v-for="(item, index) in ${conf.fieldName}Options" :key="index" :label="item.value" :disabled="item.disabled" ${border}>{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}
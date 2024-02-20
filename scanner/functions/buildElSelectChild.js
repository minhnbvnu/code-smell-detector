function buildElSelectChild(conf) {
  const children = []
  if (conf.options && conf.options.length) {
    children.push(`<el-option v-for="(item, index) in ${conf.fieldName}Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>`)
  }
  return children.join('\n')
}
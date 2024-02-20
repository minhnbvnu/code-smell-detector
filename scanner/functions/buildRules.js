function buildRules(conf, ruleList) {
  if (conf.fieldName === undefined) return
  const rules = []
  if (trigger[conf.tag]) {
    if (conf.isRequired) {
      const type = isArray(conf.defaultValue) ? 'type: \'array\',' : ''
      let message = isArray(conf.defaultValue) ? `请至少选择一个${conf.fieldName}` : conf.placeholder
      if (message === undefined) message = `${conf.label}不能为空`
      rules.push(`{ required: true, ${type} message: '${message}', trigger: '${trigger[conf.tag]}' }`)
    }
    if (conf.regList && isArray(conf.regList)) {
      conf.regList.forEach(item => {
        if (item.pattern) {
          rules.push(`{ pattern: ${eval(item.pattern)}, message: '${item.message}', trigger: '${trigger[conf.tag]}' }`)
        }
      })
    }
    ruleList.push(`${conf.fieldName}: [${rules.join(',')}],`)
  }
}
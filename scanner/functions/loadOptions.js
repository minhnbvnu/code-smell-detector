function loadOptions(rule) {
  if (Array.isArray(rule.meta.defaultSetup)) {
    const optionsTable = [['Index', 'Description', 'Default Value']]
    rule.meta.docs.options.forEach((option, index) => {
      optionsTable.push([index, option.description, option.default])
    })
    return `This rule accepts an array of options:

${table(optionsTable)}
`
  } else if (typeof rule.meta.defaultSetup === 'string') {
    return `This rule accepts a string option of rule severity. Must be one of ${ruleSeverityEnum}. Default to ${rule.meta.defaultSetup}.`
  } else {
    throw new Error(`Unhandled type of rule.meta.defaultSetup from rule ${rule.ruleId}`)
  }
}
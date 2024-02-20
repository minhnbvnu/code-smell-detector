function remapConfigSettings() {
  if (process.config && process.config.variables) {
    const variables = process.config.variables
    Object.keys(variables).forEach((key) => {
      if (remapping[key]) {
        let value = variables[key]

        if (value === true || value === 1) {
          value = 'yes'
        }
        if (value === false || value === 0) {
          value = 'no'
        }

        addSetting(remapping[key], value)
      }
    })

    maybeAddMissingProcessVars()
  }
}
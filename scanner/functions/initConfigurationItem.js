function initConfigurationItem(config, path, value) {
  const nestedKeys = path.split('.')

  let nestedSetting = null
  nestedKeys.forEach((settingName, index) => {
    if (index === 0) {
      const configValue = config[settingName] || {}
      nestedSetting = config[settingName] = configValue
      return
    }

    if (index === nestedKeys.length - 1) {
      nestedSetting[settingName] = value
      return
    }

    const configValue = nestedSetting[settingName] || {}
    nestedSetting = nestedSetting[settingName] = configValue
  })
}
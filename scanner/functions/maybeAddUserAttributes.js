function maybeAddUserAttributes(userAttributes, exception, config) {
  const customAttributes = exception.customAttributes
  if (!config.high_security && config.api.custom_attributes_enabled && customAttributes) {
    for (const key in customAttributes) {
      if (props.hasOwn(customAttributes, key)) {
        const dest = config.attributeFilter.filterTransaction(DESTINATIONS.ERROR_EVENT, key)
        if (dest & DESTINATIONS.ERROR_EVENT) {
          userAttributes[key] = customAttributes[key]
        }
      }
    }
  }
}
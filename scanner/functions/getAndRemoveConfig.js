function getAndRemoveConfig(str = '') {
  const config = {}

  if (str) {
    str = str
      .replace(/^'/, '')
      .replace(/'$/, '')
      .replace(/(?:^|\s):([\w-]+)=?([\w-]+)?/g, (m, key, value) => {
        config[key] = (value && value.replace(/&quot;/g, '')) || true
        return ''
      })
      .trim()
  }

  return {str, config}
}
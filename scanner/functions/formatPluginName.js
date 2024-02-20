function formatPluginName (string) {
  return toTitleCase(string.toLowerCase().replace(commonPartRe, '').replace(/-/g, ' '))
}
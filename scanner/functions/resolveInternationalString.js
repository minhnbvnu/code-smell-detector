function resolveInternationalString(internationalString) {
  const anyLang = Object.keys(internationalString)[0];
  return (internationalString[navigator.language] || internationalString[anyLang])[0];
}
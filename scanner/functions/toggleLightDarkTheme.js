function toggleLightDarkTheme(theme) {
  var href = window.location.href
  if (theme === 'default') {
    theme = 'dark'
  } else {
    theme = 'default'
  }

  href = updateURLParameter(href, 'theme', theme)
  window.location.href = href
}
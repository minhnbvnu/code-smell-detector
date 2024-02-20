function changeLocation(href) {
  var href_old = window.location.href
  var url_old = new URL(href_old)
  var theme = url_old.searchParams.get('theme', '')
  if (theme) {
    href = updateURLParameter(href, 'theme', theme)
  }
  window.location.href = href
}
function makePopupTemplate(geoJSON) {
  var allOptions = geoJSON[0].opts
  var keys = []
  for (var i in allOptions) keys.push(i)

  var mustacheKeys = mustachify(keys)

  var template = {}
  template.name ="popup"
  template.template = templateString(mustacheKeys)
  return template
}
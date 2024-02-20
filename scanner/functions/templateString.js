function templateString(mustacheKeys) {
  var template = "<ul>"
  var counter = mustacheKeys.length
  mustacheKeys.forEach(function(key) {
    counter--
    if (counter === 0) template = template.concat(key, "</ul>")
    else template = template.concat(key)
  })
  return template
}
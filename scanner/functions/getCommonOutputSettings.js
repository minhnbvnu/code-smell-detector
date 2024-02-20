function getCommonOutputSettings(settings) {
  var range = getWidthRangeForConfig(settings);
  return {
    ai2html_version: scriptVersion,
    project_type: 'ai2html',
    min_width: range[0],
    max_width: range[1],
    tags: 'ai2html',
    type: 'embeddedinteractive'
  }
}
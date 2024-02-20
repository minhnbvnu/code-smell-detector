function groupByValue(list, grouper, groupName) {
  var grouped = {}
  groupName = groupName || 'items'
  var listLength = list.length;
  for (var i = 0; i < listLength; i++) {
    var key = list[i][grouper]
    if (typeof grouped[key] !== "object" || typeof grouped[key].push !== "function") {
      grouped[key] = []
    }
    grouped[key].push(list[i])
  }
  return Object.keys(grouped).map(function (group) {
    var formatted = {}
    formatted[grouper] = group
    formatted.count = grouped[group].length
    formatted[groupName] = grouped[group]
    return formatted
  })
}
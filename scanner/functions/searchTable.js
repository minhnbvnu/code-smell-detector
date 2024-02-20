function searchTable(opts, searchTerm) {
  var filteredList = []
  opts.data.forEach(function(object) {
    var stringObject = JSON.stringify(object).toLowerCase()
    if (stringObject.match(searchTerm.toLowerCase())) filteredList.push(object)
  })
  if (filteredList.length === 0) {
    $(".noMatches").css("visibility", "inherit")
    makeTable(opts, filteredList)
  }
  else {
    $(".noMatches").css("visibility", "hidden")
    makeTable(opts, filteredList)
  }
}
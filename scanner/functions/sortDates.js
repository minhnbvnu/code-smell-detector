function sortDates(data) {
  var today = new Date()

  // add formatted dates
  data.forEach(function(event) {
    event.startUTC = new Date(event.startdate)
    if (event.enddate) event.endUTC = new Date(event.enddate)
  })

  // sort the dates
  var sorted = data
  sorted.sort(function(a,b) {
    return a.startUTC - b.startUTC
  })

  return sorted
}
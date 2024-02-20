function upcomingEvents(data) {
  var today = new Date()
  var sorted = sortDates(data)

  // only upcoming events
  var freshies = []
  var todayBuffer = new Date()
  todayBuffer.setHours(today.getHours() - 24)

  sorted.forEach(function(event) {
    if (event.startUTC >= todayBuffer)
      freshies.push(event)
  })

  return freshies
}
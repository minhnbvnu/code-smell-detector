function generateCalendar (eventData) {
  var eventData = eventData.sort(function(a, b) { return (new Date(a.startdate)) - (new Date(b.startdate)) })
  generateAllTheMonths(eventData)
  eventData.forEach(function (event) {
    appendEvent(event)
  })

  // Highlight today
  $('#' + formattedDate(today)).removeClass('no-event').addClass('today')
  addMonthMenu()
}
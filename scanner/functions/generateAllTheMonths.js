function generateAllTheMonths( eventData ) {
  var dates = []
  var months = []

  eventData.forEach(function(event) {
    if (event.startdate) dates.push(event.startdate)
    if (event.enddate) dates.push(event.enddate)
  })

  dates.forEach(function (date) {
    date = new Date(date)
    if(months.indexOf(date.getFullYear().toString() + date.getMonth()) < 0) {
      months.push(date.getFullYear().toString() + date.getMonth())
      generateMonthTable(date)
    } else {
    }
  })
}
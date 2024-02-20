function appendEvent( event ) {
  var eventStartDate = new Date(event.startdate)
  var eventEndDate   = new Date(event.enddate)
  var eventElement   = $('<div class="event"><a target="_blank" rel="noreferrer noopener" href="' + event.website + '">' + event.name + '</a></div>')

  // Handle multi-days
  if ( eventEndDate.getDate() ) {
    var date         = eventStartDate
    var spacerNumber = $('#' + formattedDate(eventStartDate)).find('.event').length
    eventElement.addClass('multi-days')

    while ( eventEndDate > date ) {
      // If reached end of month, go to first day of the next month
      // Else go to the next day
      if (date == new Date(date.getFullYear(), date.getMonth() + 1, 0)) {
        date == new Date(date.getFullYear(), date.getMonth() + 1, 1)
      } else {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 )
      }

      // Add spacer to line up the event
      var dateElement = $('#' + formattedDate(date))
      var steps = dateElement.find('.event').length
      loopForTimes( spacerNumber - steps, function() {
        dateElement.append('<div class="event spacer">&nbsp;</div>')
      })

      dateElement.removeClass('no-event').append('<div class="event multi-days following-days" title="' + event.name + '"><a target="_blank" rel="noreferrer noopener" href="' + event.website + '" title="' + event.name + '">' + event.name + '</a></div>')
    }
  }

  $('#' + formattedDate(eventStartDate)).removeClass('no-event').append(eventElement)
}
function parse_events(data) {
  var eventData = data.sort(function(a, b) { return (new Date(a.startdate)) - (new Date(b.startdate)) })
  eventData.forEach(function (event) {
    eventObj = appendEvent(event)
    events.push(eventObj)
  });

  $(document).ready(function() {
  // page is now ready, initialize the calendar...
    $('#eventCalendar').fullCalendar({
      themeSystem: 'jquery-ui',
      header:{
        left:   '',
        center: 'title',
        right:  'today prevYear,prev,next,nextYear'
      },
      //height: 650,
      fixedWeekCount: false,
      eventLimit: true, // allow "more" link when too many events,
      events: events,
      eventColor: 'gray',
      eventClick: function(eventObj) {
        if (eventObj.url) {
          window.open(eventObj.url);
          return false; // prevents browser from following link in current tab.
        }
      },
      eventRender : function(event, element) {
    	   element[0].title = event.title;
    	}
    })
  });
}
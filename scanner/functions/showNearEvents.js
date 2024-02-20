function showNearEvents(data) {
  writeCount(data.length)
  makeMap(data)
  var list = upcomingEvents(data)
  if (list.length == 0) {
    $('#upcoming-workshops').addClass("empty")
  } else {
    var html = Sheetsee.ich.events({
        'rows': list
      })
    $('#upcoming-workshops').addClass("success")
    $('#upcoming-workshops>.success>ul').html(html)
  }
}
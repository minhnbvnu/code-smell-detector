function addMonthMenu() {
  $('#calendar-goes-here').prepend('<div id="cal-controls">')
  $('.month-table').each(function(_, table) {
    var month = $(table).data('month')
    $('#cal-controls').append('<a class="month-menuitem" data-target="' + month + '" href="#' + month + '">' + month + '</a>')
  })

  $(document).on('click', '.month-menuitem', function(e) {
    $('[data-month]').hide()
    $('[data-month="' + $(this).data('target') + '"]').show()
    $(this).addClass('active').siblings().removeClass('active')
    e.preventDefault()
  })

  // Get current month and click it
  var currentMonth = $('[data-target=' + (new Date()).getFullYear() + "-"  + monthNames[(new Date()).getMonth()] + ']')
  if( currentMonth.length ) {
    currentMonth.click()
  } else {
    $('[data-target]').first().click()
  }
}
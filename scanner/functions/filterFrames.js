function filterFrames () {
    $('.frame-preview').removeClass('is-hidden')
    var isSelected = $('#frames-filter').prop('checked')

    if (isSelected) {
      $('.frame-row.native-frame').addClass('force-show')
    } else {
      $('.frame-row.native-frame').removeClass('force-show')
    }
  }
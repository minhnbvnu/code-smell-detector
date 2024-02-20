function showCallout(msg, showUpTop) {
    var callout = $('<div class="bs-callout bs-callout-danger">\
       <h4>Attention!</h4>\
      <p>' + msg + '</p>\
    </div>')

    if (showUpTop) {
      callout.appendTo('.bs-docs-container')
    } else {
      callout.insertAfter('.bs-customize-download')
    }
  }
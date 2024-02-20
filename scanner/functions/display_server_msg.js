function display_server_msg(message, dialog) {
    if ($.isArray(message)) {
        message = message.join('<br>')
    }

    if (!dialog.find('.message').length) {
    dialog.find('form').append('<div class="message"></div>');
    }
    dialog.find('.message').css('display', 'table')
    .stop(true,false)
      //    .show().fadeTo(0,1)
    .effect('highlight', {}, 8000)
      //    .effect('fade', function() { this.html(""); }, 2000)
    .html(message);
}
function error_message_dialog(title, message) {
    if ($.isArray(message)) {
        message = message.join('<br>');
    }
    var msg = $('<span></span>').html(message);
    $('<div></div>').append(msg).dialog({
        buttons: {'OK':function() {$(this).dialog('close');}},
        title: title
    });
}
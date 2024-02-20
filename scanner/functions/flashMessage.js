function flashMessage(elem, message) {
    // If the given element doesn't have .message class, insert a following element
    // This might be better as a tooltip?
    elem = $(elem);
    var msgbox = elem.find(".message");
    if (! msgbox.length) {
    if (! elem.next(".message").length) {
        elem.after(" <span class='message'/>");
    }
    msgbox = elem.next(".message");
    }

    msgbox.stop(true,false)
    .show().fadeTo(0,1)
    .effect('highlight', {}, 8000)
    .effect('fade', function() { $(this).html(""); }, 2000)
    .html(message);
}
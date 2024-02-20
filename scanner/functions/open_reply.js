function open_reply(source, commentid) {
    $('div.reply').remove(); // Remove any other reply area.
    source.after('<div class="reply">'
                + '<input type="text" id="nickname" title="Optional nickname..." value="Optional nickname..." />'
                + '<textarea id="replymessage" class="replymessage" cols="80" rows="7"></textarea>'
                + '<br><button id="replybutton" onclick="send_comment(\'' + commentid + '\');return false;">Post comment</button>'
                + '<div id="replystatus">&nbsp;</div>'
                + '</div>');
    $('input#nickname').focus(function() {
        $(this).css('color', '#000');
        if ($(this).val() == $(this).attr('title')) {
            $(this).val('');
        }
    });
    $('textarea#replymessage').focus();
}
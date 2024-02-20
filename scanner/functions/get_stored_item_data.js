function get_stored_item_data(url) {
    var rid = readCookie('crits_rel_id');
    var rtype = readCookie('crits_rel_type');
    var cbc = $('#clipboard_container');
    var cbi = $('#clipboard_icon');
    var cbq = $('#selected_item_topbar');
    if (rid && rtype) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {id: rid, type: rtype},
        }).done(function(msg) {
            var idText = "Type: " + rtype + "<br />";
            idText += "ID: " + rid + "<br />";
            if (msg['OK']) {
                for (var item in msg.data) {
                    if (msg.data[item]) {
                        idText += item+ ': ' + msg.data[item] + '<br />';
                    }
                }
                cbi.removeClass('clipboard_icon_empty');
                cbi.addClass('clipboard_icon_full');
                cbi.attr('title', 'Click to see clipboard contents');
                cbq.html(idText);
                cbc.css('width', "35px");
                $('span#delete_stored_cookie').remove();
                cbc.append('<span id="delete_stored_cookie" class="ui-icon ui-icon-close ui-icon-delete-stored-cookie" title="Clear your clipboard"></span>');
                $('span#delete_stored_cookie').click(function() {
                    $('button.id_copy#' + readCookie('crits_rel_id')).css('background-color', '');
                    $('span#' + readCookie('crits_rel_id') + '.id_copy').css('background-color', '');
                    cbq.text("Your clipboard is empty.");
                    eraseCookie('crits_rel_id');
                    eraseCookie('crits_rel_type');
                    cbi.removeClass('clipboard_icon_full');
                    cbi.addClass('clipboard_icon_empty');
                    cbi.attr('title', 'Your clipboard is empty.');
                    $(this).remove();
                    cbc.css('width', 'auto');
                });
            } else {
                cbi.removeClass('clipboard_icon_full');
                cbi.addClass('clipboard_icon_empty');
                cbi.attr('title', 'Your clipboard is empty.');
            }
        });
    } else {
        cbi.removeClass('clipboard_icon_full');
        cbi.addClass('clipboard_icon_empty');
        cbi.attr('title', 'Your clipboard is empty.');
    }
}
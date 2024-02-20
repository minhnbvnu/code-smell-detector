function ajaxPost(e) {
    e.preventDefault();
    var elem = $(e.currentTarget).closest("form");

    var submit_url = elem.attr('action');
    if (submit_url === undefined) {
    return error_message_dialog("Internal JS Error",
                    "Elem did not have a action url <br/>");
    } else if (!elem.data('key')) {
    return error_message_dialog("Internal JS Error",
                    "Elem did not have json key <br/>");
    } else {
    var data;
    if (elem.attr('data')) {
        data = elem.serializeArray();
        data.push({'name':'key', 'value': elem.attr('data')});
        data = $.param(data);
    } else {
        data = elem.serialize();
    }

    $.ajax({
        type: "POST",
        data: data,
        url: submit_url,
            success: function(data) { ajaxPostSuccess(data,elem,e); }
        });

    }
}
function addEditSubmit(e) {
    e.preventDefault();

    var dialog = $(e.currentTarget).closest(".ui-dialog").find(".ui-dialog-content");
    if (!dialog.length) {
    dialog = $(e.currentTarget).closest("div"); // At least find a container mainly for
                            // -static versions
    }
    var form = dialog.find("form");

    var sel = form.find('#id_action_type');
    if (typeof sel !== "undefined") {
        sel.attr('disabled', false);
    }

    var type = form.attr('item-type');
    if (!type)
    log("Form (" + form.attr('id') + ") should have a defined item-type");

    var updateloc;
    if ($(dialog).data("crits")) {
    updateloc = $(dialog).data("crits").updateloc;
        delete $(dialog).data("crits").updateloc;
    }

    var submit_url = form.attr('action');
    if (submit_url === undefined) {
    return error_message_dialog("Internal JS Error",
                    "Form did not have a action url <br/>" +
                    "Dialog: " + dialog.attr("id"));
    } else {
    var data;
    if (form.attr('data')) {
        data = form.serializeArray();
        data.push({'name':'key', 'value': form.attr('data')});
        data = $.param(data);
    } else {
        data = form.serialize();
    }

    $.ajax({
        type: "POST",
            data: data,
            url: submit_url,
            success: function(data) { add_edit_post_success(data,dialog,updateloc,type,e); }
        });
    }
}
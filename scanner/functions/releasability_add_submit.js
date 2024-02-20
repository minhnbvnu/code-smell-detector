function releasability_add_submit(e) {
    var widget = $(e.currentTarget);
    var dialog;
    var name, action, date;

    if ($(this).hasClass("ui-dialog-content")) {
    dialog = $(this);
    name = dialog.find("form :input[name='source']").val();
    action = "add"; // this dialog is just used for adds, no edits
    } else {
    name = widget.attr('data-name');
    date = widget.attr('data-date');
    action = widget.attr('data-action');
    }

    // XXXX For the action types of remove, do we want to confirm
    // with the user first?
    var me = $('#releasability_list tbody');
    var data = {'type': type, 'id': id, 'name': name, 'action': action};
    if (date)
    data["date"] = date;

    $.ajax({
            type: "POST",
        url: widget.attr("action") || $('#form-releasability-add').attr('action'),
        data: data,
        async: false,
        datatype: 'json',
        success: function(result) {
                if (result.success) {
                    me.html(result.html);

            if (dialog)
            dialog.dialog("close");

            collapse2(); // XXXX Might be nice if this wasn't collapsed, we just
                 // changed it, left it on because the icon changes in the
                 // new div
                }
            }
        });
}
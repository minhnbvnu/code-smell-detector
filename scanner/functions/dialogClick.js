function dialogClick(e) {
    e.stopPropagation();
    e.preventDefault();

    var dialog = $(this).attr('dialog') || $(this).attr('name') || $(this).attr('id');
    //  var opts = dialogOptions[dialog];

    if (dialog === undefined) {
    return error_message_dialog("Internal JS Error",
                    "Selected widget did not provide a dialog name to open.<br/>" +
                    "<br/>Node: " + this.nodeName +
                    "<br/>Attributes looked at:" +
                    "<br/>Dialog: " + $(this).attr('dialog') +
                    "<br/>Name: " + $(this).attr('name') +
                    "<br/>ID: " + $(this).attr('id')
                    );
    }

    var persona = $(this).attr("persona");
    var $dialog = $('#dialog-' + dialog);

    if ($dialog.length) {
    // The dialog may not be open yet, so delay some setup until it is.
    var that = this;
    $dialog.on("dialogopen.dialogClick", function(e) {
        var form = $dialog.find("form");

        if (persona === "new") { // Clear the forms
            clear_form($dialog);
            set_date_field(form);
        }
        clear_server_msg(dialog);

        // Register the correct action for the form
        // XXX Might be nice to register the onsubmit function here as well, for those single
        // input forms that someone hits enter for example?
        if ($(that).attr("action") && form) {
            form.attr("action", $(that).attr("action"));
        }

        // Make sure the dialog has a message box for result messages
        if (!$dialog.find('.message').length) {
            form.append('<div class="message"></div>');
        }
        form.find('.message').hide().html('');
            // Only show Relationship Type dropdown if needed
        if (persona == "related") {
            $dialog.find('#relationship_type').parents('tr').show();
        }
        else {
            $dialog.find('#relationship_type').parents('tr').hide();
        }

        $dialog.off("dialogopen.dialogClick");
        });

    if ($dialog.data("ui-dialog")) { // If it has been initialized
        $dialog.dialog("open", e);
    } else {
        $dialog.dialog();
        $dialog.dialog("open", e);
    }
    }
}
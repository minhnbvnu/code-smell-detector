function display_shutdown_dialog() {
        var body = $('<div/>').append(
            $('<p/>').text(i18n.msg._("You have shut down Jupyter. You can now close this tab."))
        ).append(
            $('<p/>').text(i18n.msg._("To use Jupyter again, you will need to relaunch it."))
        );

        dialog.modal({
            title: i18n.msg._("Server stopped"),
            body: body
        })
    }
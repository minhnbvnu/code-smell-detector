function handle_forget_click (evt) {
        var btn = $(evt.target);
        var extension = btn.closest('.nbext-ext-row').data('extension');
        var msg_body = $('<div>')
            .append($('<p>').html(
                'Are you sure you want to remove the key <code>' + extension.require +
                '</code> from <code>load_extensions</code> in the config section ' +
                '<code>' + extension.Section + '</code>?'
            ).css('margin-bottom', '9px'))
            .append($('<p>').html(
                'Removing it will mean that it will no longer show up in the ' +
                'nbextensions configurator, so ' +
                '<strong>you won\'t be able to re-enable it from here.</strong>'
            ));

        dialog.modal({
            title: "Forget '" + extension.require + "'?",
            body: msg_body,
            buttons: {
                Forget : {
                    class: "btn-danger",
                    click: function() {
                        set_config_enabled(extension, null);
                        refresh_configurable_extensions_list();
                    }
                },
                Cancel : {}
            }
        });
    }
function selector_checkbox_callback (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var a = $(evt.currentTarget).closest('a');
        if (!a.closest('li').hasClass('disabled')) {
            var extension = a.data('extension');
            var state = !$(evt.currentTarget).hasClass('nbext-enabled');
            set_buttons_enabled(extension, state);
            set_config_enabled(extension, state);
            open_ext_ui(extension);
        }
    }
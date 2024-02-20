function handle_buttons_click (evt) {
        var btn = $(evt.target);
        var state = btn.is(':first-child');
        var extension = btn.closest('.nbext-ext-row').data('extension');
        set_buttons_enabled(extension, state);
        set_config_enabled(extension, state);
    }
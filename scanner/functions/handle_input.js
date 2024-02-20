function handle_input (evt) {
        var input = $(evt.target);

        // list elements should alter their parent's config
        if (input.closest('.nbext-list-wrap').length > 0) {
            input = input.closest('.nbext-list-wrap');
        }
        // hotkeys need to find the correct tag
        else if (input.hasClass('hotkey')) {
            input = input.closest('.input-group');
        }

        // get param name by cutting off prefix
        var input_data = input.data('nbext_input');
        var configval = get_input_value(input);
        console.log(log_prefix, input_data.configsection + '.' + input_data.configkey, '->', configval);
        conf_dot_update(configs[input_data.configsection], input_data.configkey, configval);
        return configval;
    }
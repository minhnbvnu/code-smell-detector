function set_input_value (input, new_value) {
        input = $(input);
        var input_data = input.data('nbext_input');
        switch (input_data.type) {
            case 'hotkey':
                input.find('.hotkey')
                    .html(quickhelp.humanize_sequence(new_value))
                    .data('pre-humanized', new_value);
                break;
            case 'list':
                var ul = input.children('ul');
                ul.empty();
                var list_element_param = input_data.list_element_param;
                for (var ii = 0; ii < new_value.length; ii++) {
                    var list_element_input = build_param_input(list_element_param);
                    set_input_value(list_element_input, new_value[ii]);
                    ul.append(wrap_list_input(list_element_input));
                }
                break;
            case 'checkbox':
                input.prop('checked', new_value ? true : false);
                break;
            case 'color':
                // for some reason, setting with 3-char color codes doesn't
                // work correctly, so expand them to 6-char
                input.val(new_value.replace(
                    /^\s*#([\da-f])([\da-f])([\da-f])\s*$/i,
                    '#$1$1$2$2$3$3'));
                break;
            default:
                input.val(new_value);
        }
    }
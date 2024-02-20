function get_input_value (input) {
        input = $(input);
        switch (input.data('nbext_input').type) {
            case 'hotkey':
                return input.find('.hotkey').data('pre-humanized');
            case 'list':
                var val = [];
                input.find('.nbext-list-element').children().not('a').each(
                    function () {
                        // "this" is the current child element of input in the loop
                        val.push(get_input_value(this));
                    }
                );
                return val;
            case 'checkbox':
                return input.prop('checked') ? true : false;
            default:
                return input.val();
        }
    }
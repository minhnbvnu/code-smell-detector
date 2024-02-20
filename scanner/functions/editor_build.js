function editor_build () {
        var editor = $('#kse-editor');
        if (editor.length > 0) {
            return editor;
        }

        editor = $('<div/>')
            .addClass('kse-editor')
            .attr('id', 'kse-editor')
            .data({
                'kse_sequence': [],
                'kse_info': {},
                'kse_mode': 'command',
                'kse_undefined_key': false
            });

        var form = $('<form/>')
            .addClass('form')
            .appendTo(editor);

        $('<div/>')
            .addClass('form-group')
            .appendTo(form);

        var form_group = $('<div/>')
            .addClass('form-group has-feedback')
            .appendTo(form);

        var input_group = $('<div/>')
            .addClass('input-group')
            .addClass('kse-input-group')
            .appendTo(form_group);

        // reset button
        var btn = $('<a/>')
            .addClass('btn btn-default')
            .addClass('kse-input-group-reset')
            .attr({
                'title': 'Restart',
                'type': 'button'
            })
            .append(
                $('<i/>')
                    .addClass('fa fa-repeat')
            )
            .on('click', function () {
                editor.data({
                    'kse_sequence': [],
                    'kse_undefined_key': false
                });
                editor_update_input_group(editor);
                $(this).blur();
                textcontrol.focus();
            });
        $('<div/>')
            .addClass('input-group-btn')
            .append(btn)
            .appendTo(input_group);

        // pretty-displayed shortcut
        $('<div/>')
            .addClass('input-group-addon')
            .addClass('kse-input-group-pretty')
            .addClass('kse-editor-to')
            .appendTo(input_group);

        var textcontrol = $('<input/>')
            .addClass('form-control')
            .addClass('kse-input-group-input')
            .attr({
                'type': 'text',
                'placeholder': 'click here to edit the shortcut'
            })
            .on('keydown', editor_handle_shortcut_keydown)
            .on('focus', function (evt) {
                $(this).attr('placeholder', 'press keys to add to the shortcut');
            })
            .on('blur', function (evt) {
                $(this).attr('placeholder', 'click here to edit the shortcut');
            })
            .appendTo(input_group);

        // feedback icon
        var form_fdbck = $('<i/>')
            .addClass('fa fa-lg');
        $('<span/>')
            .addClass('form-control-feedback')
            .append(form_fdbck)
            .appendTo(form_group);

        // help for input group
        $('<span/>')
            .addClass('help-block')
            .appendTo(form_group);

        return editor;
    }
function build_param_input (param) {
        var input_data = {
            configkey: param.name,
            configsection: param.section,
            list_element_param: param.list_element || {},
            type: (param.input_type || 'text').toLowerCase(),
        };
        var input;

        switch (input_data.type) {
            case 'hotkey':
                input = $('<div class="input-group"/>');
                input.append(
                    $('<span class="form-control form-control-static hotkey"/>')
                        .css(utils.platform === 'MasOS' ? {'letter-spacing': '1px'} : {})
                );
                input.append($('<div class="input-group-btn"/>').append(
                    $('<div class="btn-group"/>').append(
                        $('<a/>', {
                            type: 'button',
                            class: 'btn btn-primary',
                            text: 'Change'
                        }).on('click', function() {
                            var description = 'Change ' +
                                param.description +
                                ' from ' +
                                quickhelp.humanize_sequence(get_input_value(input)) +
                                ' to:';
                            var modal = kse_comp.KSE_modal({
                                'description': description,
                                'input': input,
                                'buttons': {
                                    'OK': {
                                        'class': 'btn-primary',
                                        'click': function () {
                                            var editor = $(this).find('#kse-editor');
                                            var new_value = (editor.data('kse_sequence') || []).join(',');
                                            var input = editor.data('kse_input');
                                            set_input_value(input, new_value);
                                            // trigger write to config
                                            input.find('.hotkey').change();
                                        }
                                    },
                                    'Cancel': {}
                                },
                            });
                            modal.modal('show');
                        })
                    )
                ));
                break;
            case 'list':
                input = $('<div/>', {'class' : 'nbext-list-wrap'});
                input.append(
                    $('<ul/>', {'class': 'list-unstyled'})
                        .sortable({
                            handle: '.handle',
                            containment: 'window',
                            placeholder: 'nbext-list-element-placeholder',
                            update: function(event, ui) {
                                ui.item.closest('.nbext-list-wrap').change();
                            }
                        })
                );

                // add a button to add list elements
                var add_button = $('<a/>')
                    .addClass('btn btn-default input-group-btn')
                    .text(' new item')
                    .prepend('<i class="fa fa-plus"/>')
                    .on('click', function () {
                        $(this).parent().siblings('ul').append(
                            wrap_list_input(
                                build_param_input(input_data.list_element_param)
                            )
                        ).closest('.nbext-list-wrap').change();
                    });
                input.append($('<div class="input-group"/>').append(add_button));
                break;
            case 'textarea':
                input = $('<textarea/>');
                break;
            case 'number':
                input = $('<input/>', {'type': input_data.type});
                if (param.step !== undefined) input.attr('step', param.step);
                if (param.min !== undefined) input.attr('min', param.min);
                if (param.max !== undefined) input.attr('max', param.max);
                break;
            default:
                // detect html5 input tag support using scheme from
                // http://diveintohtml5.info/detect.html#input-types
                // If the browser supports the requested particular input type,
                // the type property will retain the value you set.
                // If the browser does not support the requested input type,
                // it will ignore the value you set
                // and the type property will still be "text".
                input = document.createElement('input');
                input.setAttribute('type', input_data.type);
                // wrap in jquery
                input = $(input);
        }
        var non_form_control_input_types = ['checkbox', 'list', 'hotkey'];
        if (non_form_control_input_types.indexOf(input_data.type) < 0) {
            input.addClass('form-control');
        }

        // add input settings to the element using jquery data api
        input.data('nbext_input', input_data);
        // bind handler
        input.on('change', handle_input);
        return input;
    }
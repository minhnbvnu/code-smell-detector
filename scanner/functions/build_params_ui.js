function build_params_ui (params) {
        // Assemble and add params
        var div_param_list = $('<div/>')
            .addClass('list-group');

        for (var pp in params) {
            var param = params[pp];
            var param_name = param.name;
            if (!param_name) {
                console.error(log_prefix, 'Unnamed parameter declared!');
                continue;
            }

            var param_div = $('<div/>')
                .addClass('form-group list-group-item')
                .appendTo(div_param_list);

            var param_id = param_id_prefix + param_name;

            // use param name / description as label
            $('<label/>')
                .attr('for', param_id)
                .html(
                    param.hasOwnProperty('description') ? param.description : param_name
                )
                .appendTo(param_div);

            // input to configure the param
            var input = build_param_input(param);
            input.attr('id', param_id);
            var prepend_input_types = ['checkbox'];
            if (prepend_input_types.indexOf(param.input_type) < 0) {
                param_div.append(input);
            }
            else {
                param_div.prepend(' ');
                param_div.prepend(input);
            }

            // set input value from config or default, if poss
            if (conf_dot_key_exists(configs[param.section], param_name)) {
                var configval = conf_dot_get(configs[param.section], param_name);
                console.log(log_prefix, 'param', param_name, 'init from config:', configval);
                set_input_value(input, configval);
            }
            else if (param.hasOwnProperty('default')) {
                set_input_value(input, param.default);
                console.log(log_prefix, 'param', param_name, 'init from default:', param.default);
            }
            else {
                console.log(log_prefix, 'param', param_name);
            }
        }
        return div_param_list;
    }
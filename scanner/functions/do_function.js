function do_function(func, name) {
        var old_funct      = funct,
            old_option     = option,
            old_scope      = scope;
        funct = {
            '(name)'     : name || '\'' + (anonname || '').replace(nx, sanitize) + '\'',
            '(line)'     : next_token.line,
            '(context)'  : old_funct,
            '(breakage)' : 0,
            '(loopage)'  : 0,
            '(scope)'    : scope,
            '(token)'    : func
        };
        option = Object.create(old_option);
        scope = Object.create(old_scope);
        functions.push(funct);
        func.name = name;
        if (name) {
            add_label(func, 'function', name);
        }
        func.writeable = false;
        func.first = funct['(params)'] = function_params();
        one_space();
        func.block = block(false);
        if (funct['(old_property_type)']) {
            property_type = funct['(old_property_type)'];
            delete funct['(old_property_type)'];
        }
        funct['(complexity)'] = complexity(func.block) + 1;
        if (option.confusion) {
            funct['(confusion)'] = true;
        }
        funct      = old_funct;
        option     = old_option;
        scope      = old_scope;
    }
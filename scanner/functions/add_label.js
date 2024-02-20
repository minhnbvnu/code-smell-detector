function add_label(token, kind, name) {

// Define the symbol in the current function in the current scope.

        name = name || token.string;

// Global variables cannot be created in the safe subset. If a global variable
// already exists, do nothing. If it is predefined, define it.

        if (funct === global_funct) {
            if (option.safe) {
                warn('adsafe_a', token, name);
            }
            if (typeof global_funct[name] !== 'string') {
                token.writeable = typeof predefined[name] === 'boolean' ?
                    predefined[name] : true;
                token.funct = funct;
                global_scope[name] = token;
            }
            if (kind === 'becoming') {
                kind = 'var';
            }

// Ordinary variables.

        } else {

// Warn if the variable already exists.

            if (typeof funct[name] === 'string') {
                if (funct[name] === 'undef') {
                    if (!option.undef) {
                        warn('used_before_a', token, name);
                    }
                    kind = 'var';
                } else {
                    warn('already_defined', token, name);
                }
            } else {

// Add the symbol to the current function.

                token.funct = funct;
                token.writeable = true;
                scope[name] = token;
            }
        }
        funct[name] = kind;
    }
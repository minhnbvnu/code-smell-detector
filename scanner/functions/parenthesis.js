function parenthesis(arg, opts) {
                if (Array.isArray(arg)) {
                    return stringify(arg, opts);
                } else {
                    return parse(arg, opts);
                }
            }
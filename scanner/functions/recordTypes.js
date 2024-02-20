function recordTypes(statementType, declarations, currentScope) {
                for (let i = 0; i < declarations.length; i++) {
                    if (declarations[i].init === null) {
                        if (options[statementType] && options[statementType].uninitialized === MODE_ALWAYS) {
                            currentScope.uninitialized = true;
                        }
                    }
                    else {
                        if (options[statementType] && options[statementType].initialized === MODE_ALWAYS) {
                            if (options.separateRequires && isRequire(declarations[i])) {
                                currentScope.required = true;
                            }
                            else {
                                currentScope.initialized = true;
                            }
                        }
                    }
                }
            }
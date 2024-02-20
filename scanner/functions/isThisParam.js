function isThisParam(variable) {
                return (variable.defs[0].type === scope_manager_1.DefinitionType.Parameter &&
                    variable.name === 'this');
            }
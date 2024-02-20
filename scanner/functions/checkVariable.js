function checkVariable(variable) {
                if (variable.defs[0].type === "Parameter") {
                    variable.references.forEach(checkReference);
                }
            }
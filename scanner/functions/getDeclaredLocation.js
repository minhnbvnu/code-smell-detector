function getDeclaredLocation(variable) {
                const identifier = variable.identifiers[0];
                if (identifier) {
                    return {
                        global: false,
                        line: identifier.loc.start.line,
                        column: identifier.loc.start.column + 1,
                    };
                }
                else {
                    return {
                        global: true,
                    };
                }
            }
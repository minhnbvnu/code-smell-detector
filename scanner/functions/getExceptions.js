function getExceptions() {
                const openers = [], closers = [];
                if (options.braceException) {
                    openers.push("{");
                    closers.push("}");
                }
                if (options.bracketException) {
                    openers.push("[");
                    closers.push("]");
                }
                if (options.parenException) {
                    openers.push("(");
                    closers.push(")");
                }
                if (options.empty) {
                    openers.push(")");
                    closers.push("(");
                }
                return {
                    openers,
                    closers
                };
            }
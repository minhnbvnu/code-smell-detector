function createConditionalFixer(descriptor, suggestion, shouldBeFixed) {
                if (shouldBeFixed) {
                    return {
                        ...descriptor,
                        fix: suggestion.fix
                    };
                }
                return {
                    ...descriptor,
                    suggest: [suggestion]
                };
            }
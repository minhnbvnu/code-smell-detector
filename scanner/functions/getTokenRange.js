function getTokenRange(property) {
                const sourceCode = context.getSourceCode();
                return [
                    sourceCode.getTokenBefore(property).range[0],
                    sourceCode.getTokenAfter(property).range[1],
                ];
            }
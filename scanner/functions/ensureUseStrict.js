function ensureUseStrict(statements) {
                const foundUseStrict = findUseStrictPrologue(statements);
                if (!foundUseStrict) {
                    return setTextRange(createNodeArray([createUseStrictPrologue(), ...statements]), statements);
                }
                return statements;
            }
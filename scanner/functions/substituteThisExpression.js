function substituteThisExpression(node) {
                if (enabledSubstitutions & 2 /* ClassStaticThisOrSuperReference */ && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data)) {
                    const { facts, classConstructor, classThis } = lexicalEnvironment.data;
                    if (facts & 1 /* ClassWasDecorated */ && legacyDecorators) {
                        return factory2.createParenthesizedExpression(factory2.createVoidZero());
                    }
                    const substituteThis = shouldSubstituteThisWithClassThis ? classThis != null ? classThis : classConstructor : classConstructor;
                    if (substituteThis) {
                        return setTextRange(setOriginalNode(factory2.cloneNode(substituteThis), node), node);
                    }
                }
                return node;
            }
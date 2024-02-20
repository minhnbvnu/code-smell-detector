function checkAmbientInitializer(node) {
                const initializer = node.initializer;
                if (initializer) {
                    const isInvalidInitializer = !(isStringOrNumberLiteralExpression(initializer) || isSimpleLiteralEnumReference(initializer) || initializer.kind === 110 /* TrueKeyword */ || initializer.kind === 95 /* FalseKeyword */ || isBigIntLiteralExpression(initializer));
                    const isConstOrReadonly = isDeclarationReadonly(node) || isVariableDeclaration(node) && isVarConst(node);
                    if (isConstOrReadonly && !node.type) {
                        if (isInvalidInitializer) {
                            return grammarErrorOnNode(initializer, Diagnostics.A_const_initializer_in_an_ambient_context_must_be_a_string_or_numeric_literal_or_literal_enum_reference);
                        }
                    }
                    else {
                        return grammarErrorOnNode(initializer, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                    }
                }
            }
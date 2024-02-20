function validateTypeAliases(type, isTopLevel = false) {
                if (type.node.type === utils_1.AST_NODE_TYPES.TSFunctionType) {
                    // callback
                    if (allowCallbacks === 'never') {
                        reportError(type.node, type.compositionType, isTopLevel, 'Callbacks');
                    }
                }
                else if (type.node.type === utils_1.AST_NODE_TYPES.TSConditionalType) {
                    // conditional type
                    if (allowConditionalTypes === 'never') {
                        reportError(type.node, type.compositionType, isTopLevel, 'Conditional types');
                    }
                }
                else if (type.node.type === utils_1.AST_NODE_TYPES.TSConstructorType) {
                    if (allowConstructors === 'never') {
                        reportError(type.node, type.compositionType, isTopLevel, 'Constructors');
                    }
                }
                else if (type.node.type === utils_1.AST_NODE_TYPES.TSTypeLiteral) {
                    // literal object type
                    checkAndReport(allowLiterals, isTopLevel, type, 'Literals');
                }
                else if (type.node.type === utils_1.AST_NODE_TYPES.TSMappedType) {
                    // mapped type
                    checkAndReport(allowMappedTypes, isTopLevel, type, 'Mapped types');
                }
                else if (isValidTupleType(type)) {
                    // tuple types
                    checkAndReport(allowTupleTypes, isTopLevel, type, 'Tuple Types');
                }
                else if (isValidGeneric(type)) {
                    if (allowGenerics === 'never') {
                        reportError(type.node, type.compositionType, isTopLevel, 'Generics');
                    }
                }
                else if (type.node.type.endsWith(utils_1.AST_TOKEN_TYPES.Keyword) ||
                    aliasTypes.has(type.node.type) ||
                    (type.node.type === utils_1.AST_NODE_TYPES.TSTypeOperator &&
                        (type.node.operator === 'keyof' ||
                            (type.node.operator === 'readonly' &&
                                type.node.typeAnnotation &&
                                aliasTypes.has(type.node.typeAnnotation.type))))) {
                    // alias / keyword
                    checkAndReport(allowAliases, isTopLevel, type, 'Aliases');
                }
                else {
                    // unhandled type - shouldn't happen
                    reportError(type.node, type.compositionType, isTopLevel, 'Unhandled');
                }
            }
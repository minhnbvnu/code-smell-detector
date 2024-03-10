function isInferrable(annotation, init) {
                switch (annotation.type) {
                    case utils_1.AST_NODE_TYPES.TSBigIntKeyword: {
                        // note that bigint cannot have + prefixed to it
                        const unwrappedInit = hasUnaryPrefix(init, '-')
                            ? init.argument
                            : init;
                        return (isFunctionCall(unwrappedInit, 'BigInt') ||
                            (unwrappedInit.type === utils_1.AST_NODE_TYPES.Literal &&
                                'bigint' in unwrappedInit));
                    }
                    case utils_1.AST_NODE_TYPES.TSBooleanKeyword:
                        return (hasUnaryPrefix(init, '!') ||
                            isFunctionCall(init, 'Boolean') ||
                            isLiteral(init, 'boolean'));
                    case utils_1.AST_NODE_TYPES.TSNumberKeyword: {
                        const unwrappedInit = hasUnaryPrefix(init, '+', '-')
                            ? init.argument
                            : init;
                        return (isIdentifier(unwrappedInit, 'Infinity', 'NaN') ||
                            isFunctionCall(unwrappedInit, 'Number') ||
                            isLiteral(unwrappedInit, 'number'));
                    }
                    case utils_1.AST_NODE_TYPES.TSNullKeyword:
                        return init.type === utils_1.AST_NODE_TYPES.Literal && init.value == null;
                    case utils_1.AST_NODE_TYPES.TSStringKeyword:
                        return (isFunctionCall(init, 'String') ||
                            isLiteral(init, 'string') ||
                            init.type === utils_1.AST_NODE_TYPES.TemplateLiteral);
                    case utils_1.AST_NODE_TYPES.TSSymbolKeyword:
                        return isFunctionCall(init, 'Symbol');
                    case utils_1.AST_NODE_TYPES.TSTypeReference: {
                        if (annotation.typeName.type === utils_1.AST_NODE_TYPES.Identifier &&
                            annotation.typeName.name === 'RegExp') {
                            const isRegExpLiteral = init.type === utils_1.AST_NODE_TYPES.Literal &&
                                init.value instanceof RegExp;
                            const isRegExpNewCall = init.type === utils_1.AST_NODE_TYPES.NewExpression &&
                                init.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                                init.callee.name === 'RegExp';
                            const isRegExpCall = isFunctionCall(init, 'RegExp');
                            return isRegExpLiteral || isRegExpCall || isRegExpNewCall;
                        }
                        return false;
                    }
                    case utils_1.AST_NODE_TYPES.TSUndefinedKeyword:
                        return (hasUnaryPrefix(init, 'void') || isIdentifier(init, 'undefined'));
                }
                return false;
            }
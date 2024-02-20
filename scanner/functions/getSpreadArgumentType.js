function getSpreadArgumentType(args, index, argCount, restType, context, checkMode) {
                if (index >= argCount - 1) {
                    const arg = args[argCount - 1];
                    if (isSpreadArgument(arg)) {
                        return getMutableArrayOrTupleType(arg.kind === 234 /* SyntheticExpression */ ? arg.type : checkExpressionWithContextualType(arg.expression, restType, context, checkMode));
                    }
                }
                const types = [];
                const flags = [];
                const names = [];
                const inConstContext = isConstTypeVariable(restType);
                for (let i = index; i < argCount; i++) {
                    const arg = args[i];
                    if (isSpreadArgument(arg)) {
                        const spreadType = arg.kind === 234 /* SyntheticExpression */ ? arg.type : checkExpression(arg.expression);
                        if (isArrayLikeType(spreadType)) {
                            types.push(spreadType);
                            flags.push(8 /* Variadic */);
                        }
                        else {
                            types.push(checkIteratedTypeOrElementType(33 /* Spread */, spreadType, undefinedType, arg.kind === 227 /* SpreadElement */ ? arg.expression : arg));
                            flags.push(4 /* Rest */);
                        }
                    }
                    else {
                        const contextualType = getIndexedAccessType(restType, getNumberLiteralType(i - index), 256 /* Contextual */);
                        const argType = checkExpressionWithContextualType(arg, contextualType, context, checkMode);
                        const hasPrimitiveContextualType = inConstContext || maybeTypeOfKind(contextualType, 134348796 /* Primitive */ | 4194304 /* Index */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */);
                        types.push(hasPrimitiveContextualType ? getRegularTypeOfLiteralType(argType) : getWidenedLiteralType(argType));
                        flags.push(1 /* Required */);
                    }
                    if (arg.kind === 234 /* SyntheticExpression */ && arg.tupleNameSource) {
                        names.push(arg.tupleNameSource);
                    }
                }
                return createTupleType(types, flags, inConstContext, length(names) === length(types) ? names : void 0);
            }
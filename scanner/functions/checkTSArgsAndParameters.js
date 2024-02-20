function checkTSArgsAndParameters(esParameters, typeParameters) {
                // Just check the last one. Must specify previous type parameters if the last one is specified.
                const i = esParameters.params.length - 1;
                const arg = esParameters.params[i];
                const param = typeParameters[i];
                if (!(param === null || param === void 0 ? void 0 : param.default)) {
                    return;
                }
                // TODO: would like checker.areTypesEquivalent. https://github.com/Microsoft/TypeScript/issues/13502
                const defaultType = checker.getTypeAtLocation(param.default);
                const argTsNode = parserServices.esTreeNodeToTSNodeMap.get(arg);
                const argType = checker.getTypeAtLocation(argTsNode);
                // this check should handle some of the most simple cases of like strings, numbers, etc
                if (defaultType !== argType) {
                    // For more complex types (like aliases to generic object types) - TS won't always create a
                    // global shared type object for the type - so we need to resort to manually comparing the
                    // reference type and the passed type arguments.
                    // Also - in case there are aliases - we need to resolve them before we do checks
                    const defaultTypeResolved = getTypeForComparison(defaultType);
                    const argTypeResolved = getTypeForComparison(argType);
                    if (
                    // ensure the resolved type AND all the parameters are the same
                    defaultTypeResolved.type !== argTypeResolved.type ||
                        defaultTypeResolved.typeArguments.length !==
                            argTypeResolved.typeArguments.length ||
                        defaultTypeResolved.typeArguments.some((t, i) => t !== argTypeResolved.typeArguments[i])) {
                        return;
                    }
                }
                context.report({
                    node: arg,
                    messageId: 'unnecessaryTypeParameter',
                    fix: fixer => fixer.removeRange(i === 0
                        ? esParameters.range
                        : [esParameters.params[i - 1].range[1], arg.range[1]]),
                });
            }
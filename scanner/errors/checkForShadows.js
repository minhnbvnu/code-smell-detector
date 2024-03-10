function checkForShadows(scope) {
                // ignore global augmentation
                if (isGlobalAugmentation(scope)) {
                    return;
                }
                const variables = scope.variables;
                for (const variable of variables) {
                    // ignore "arguments"
                    if (variable.identifiers.length === 0) {
                        continue;
                    }
                    // this params are pseudo-params that cannot be shadowed
                    if (isThisParam(variable)) {
                        continue;
                    }
                    // ignore variables of a class name in the class scope of ClassDeclaration
                    if (isDuplicatedClassNameVariable(variable)) {
                        continue;
                    }
                    // ignore variables of a class name in the class scope of ClassDeclaration
                    if (isDuplicatedEnumNameVariable(variable)) {
                        continue;
                    }
                    // ignore configured allowed names
                    if (isAllowed(variable)) {
                        continue;
                    }
                    // Gets shadowed variable.
                    const shadowed = scope.upper
                        ? utils_1.ASTUtils.findVariable(scope.upper, variable.name)
                        : null;
                    if (!shadowed) {
                        continue;
                    }
                    // ignore type value variable shadowing if configured
                    if (isTypeValueShadow(variable, shadowed)) {
                        continue;
                    }
                    // ignore function type parameter name shadowing if configured
                    if (isFunctionTypeParameterNameValueShadow(variable, shadowed)) {
                        continue;
                    }
                    // ignore static class method generic shadowing class generic
                    // this is impossible for the scope analyser to understand
                    // so we have to handle this manually in this rule
                    if (isGenericOfAStaticMethodShadow(variable, shadowed)) {
                        continue;
                    }
                    if (isExternalDeclarationMerging(scope, variable, shadowed)) {
                        continue;
                    }
                    const isESLintGlobal = 'writeable' in shadowed;
                    if ((shadowed.identifiers.length > 0 ||
                        (options.builtinGlobals && isESLintGlobal)) &&
                        !isOnInitializer(variable, shadowed) &&
                        !(options.ignoreOnInitialization &&
                            isInitPatternNode(variable, shadowed)) &&
                        !(options.hoist !== 'all' && isInTdz(variable, shadowed))) {
                        const location = getDeclaredLocation(shadowed);
                        context.report(Object.assign({ node: variable.identifiers[0] }, (location.global
                            ? {
                                messageId: 'noShadowGlobal',
                                data: {
                                    name: variable.name,
                                },
                            }
                            : {
                                messageId: 'noShadow',
                                data: {
                                    name: variable.name,
                                    shadowedLine: location.line,
                                    shadowedColumn: location.column,
                                },
                            })));
                    }
                }
            }
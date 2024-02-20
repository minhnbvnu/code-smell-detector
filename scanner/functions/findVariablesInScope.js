function findVariablesInScope(scope) {
                scope.references.forEach(reference => {
                    const variable = reference.resolved;
                    function report() {
                        context.report({
                            node: reference.identifier,
                            messageId: 'noUseBeforeDefine',
                            data: {
                                name: reference.identifier.name,
                            },
                        });
                    }
                    // Skips when the reference is:
                    // - initializations.
                    // - referring to an undefined variable.
                    // - referring to a global environment variable (there're no identifiers).
                    // - located preceded by the variable (except in initializers).
                    // - allowed by options.
                    if (reference.init) {
                        return;
                    }
                    if (!options.allowNamedExports && isNamedExports(reference)) {
                        if (!variable || !isDefinedBeforeUse(variable, reference)) {
                            report();
                        }
                        return;
                    }
                    if (!variable) {
                        return;
                    }
                    if (variable.identifiers.length === 0 ||
                        isDefinedBeforeUse(variable, reference) ||
                        !isForbidden(variable, reference) ||
                        isClassRefInClassDecorator(variable, reference) ||
                        reference.from.type === utils_1.TSESLint.Scope.ScopeType.functionType) {
                        return;
                    }
                    // Reports.
                    report();
                });
                scope.childScopes.forEach(findVariablesInScope);
            }
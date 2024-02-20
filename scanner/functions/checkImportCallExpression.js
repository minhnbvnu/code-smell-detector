function checkImportCallExpression(node) {
                checkGrammarImportCallExpression(node);
                if (node.arguments.length === 0) {
                    return createPromiseReturnType(node, anyType);
                }
                const specifier = node.arguments[0];
                const specifierType = checkExpressionCached(specifier);
                const optionsType = node.arguments.length > 1 ? checkExpressionCached(node.arguments[1]) : void 0;
                for (let i = 2; i < node.arguments.length; ++i) {
                    checkExpressionCached(node.arguments[i]);
                }
                if (specifierType.flags & 32768 /* Undefined */ || specifierType.flags & 65536 /* Null */ || !isTypeAssignableTo(specifierType, stringType)) {
                    error(specifier, Diagnostics.Dynamic_import_s_specifier_must_be_of_type_string_but_here_has_type_0, typeToString(specifierType));
                }
                if (optionsType) {
                    const importCallOptionsType = getGlobalImportCallOptionsType(
                    /*reportErrors*/
                    true);
                    if (importCallOptionsType !== emptyObjectType) {
                        checkTypeAssignableTo(optionsType, getNullableType(importCallOptionsType, 32768 /* Undefined */), node.arguments[1]);
                    }
                }
                const moduleSymbol = resolveExternalModuleName(node, specifier);
                if (moduleSymbol) {
                    const esModuleSymbol = resolveESModuleSymbol(moduleSymbol, specifier, 
                    /*dontRecursivelyResolve*/
                    true, 
                    /*suppressUsageError*/
                    false);
                    if (esModuleSymbol) {
                        return createPromiseReturnType(node, getTypeWithSyntheticDefaultOnly(getTypeOfSymbol(esModuleSymbol), esModuleSymbol, moduleSymbol, specifier) || getTypeWithSyntheticDefaultImportType(getTypeOfSymbol(esModuleSymbol), esModuleSymbol, moduleSymbol, specifier));
                    }
                }
                return createPromiseReturnType(node, anyType);
            }
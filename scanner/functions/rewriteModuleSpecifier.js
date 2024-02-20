function rewriteModuleSpecifier(parent2, input) {
                if (!input)
                    return void 0;
                resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || parent2.kind !== 264 /* ModuleDeclaration */ && parent2.kind !== 202 /* ImportType */;
                if (isStringLiteralLike(input)) {
                    if (isBundledEmit) {
                        const newName = getExternalModuleNameFromDeclaration(context.getEmitHost(), resolver, parent2);
                        if (newName) {
                            return factory2.createStringLiteral(newName);
                        }
                    }
                    else {
                        const symbol = resolver.getSymbolOfExternalModuleSpecifier(input);
                        if (symbol) {
                            (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
                        }
                    }
                }
                return input;
            }
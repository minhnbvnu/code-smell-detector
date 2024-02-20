function visitImportCallExpression(node) {
                const externalModuleName = getExternalModuleNameLiteral(factory2, node, currentSourceFile, host, resolver, compilerOptions);
                const firstArgument = visitNode(firstOrUndefined(node.arguments), visitor, isExpression);
                const argument = externalModuleName && (!firstArgument || !isStringLiteral(firstArgument) || firstArgument.text !== externalModuleName.text) ? externalModuleName : firstArgument;
                return factory2.createCallExpression(factory2.createPropertyAccessExpression(contextObject, factory2.createIdentifier("import")), 
                /*typeArguments*/
                void 0, argument ? [argument] : []);
            }
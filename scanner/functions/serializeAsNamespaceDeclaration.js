function serializeAsNamespaceDeclaration(props, localName, modifierFlags, suppressNewPrivateContext) {
                        if (length(props)) {
                            const localVsRemoteMap = arrayToMultiMap(props, (p) => !length(p.declarations) || some(p.declarations, (d) => getSourceFileOfNode(d) === getSourceFileOfNode(context.enclosingDeclaration)) ? "local" : "remote");
                            const localProps = localVsRemoteMap.get("local") || emptyArray;
                            let fakespace = parseNodeFactory.createModuleDeclaration(
                            /*modifiers*/
                            void 0, factory.createIdentifier(localName), factory.createModuleBlock([]), 16 /* Namespace */);
                            setParent(fakespace, enclosingDeclaration);
                            fakespace.locals = createSymbolTable(props);
                            fakespace.symbol = props[0].parent;
                            const oldResults = results;
                            results = [];
                            const oldAddingDeclare = addingDeclare;
                            addingDeclare = false;
                            const subcontext = { ...context, enclosingDeclaration: fakespace };
                            const oldContext = context;
                            context = subcontext;
                            visitSymbolTable(createSymbolTable(localProps), suppressNewPrivateContext, 
                            /*propertyAsAlias*/
                            true);
                            context = oldContext;
                            addingDeclare = oldAddingDeclare;
                            const declarations = results;
                            results = oldResults;
                            const defaultReplaced = map(declarations, (d) => isExportAssignment(d) && !d.isExportEquals && isIdentifier(d.expression) ? factory.createExportDeclaration(
                            /*modifiers*/
                            void 0, 
                            /*isTypeOnly*/
                            false, factory.createNamedExports([factory.createExportSpecifier(
                                /*isTypeOnly*/
                                false, d.expression, factory.createIdentifier("default" /* Default */))])) : d);
                            const exportModifierStripped = every(defaultReplaced, (d) => hasSyntacticModifier(d, 1 /* Export */)) ? map(defaultReplaced, removeExportModifier) : defaultReplaced;
                            fakespace = factory.updateModuleDeclaration(fakespace, fakespace.modifiers, fakespace.name, factory.createModuleBlock(exportModifierStripped));
                            addResult(fakespace, modifierFlags);
                        }
                    }
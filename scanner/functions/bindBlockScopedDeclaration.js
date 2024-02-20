function bindBlockScopedDeclaration(node, symbolFlags, symbolExcludes) {
                switch (blockScopeContainer.kind) {
                    case 264 /* ModuleDeclaration */:
                        declareModuleMember(node, symbolFlags, symbolExcludes);
                        break;
                    case 308 /* SourceFile */:
                        if (isExternalOrCommonJsModule(container)) {
                            declareModuleMember(node, symbolFlags, symbolExcludes);
                            break;
                        }
                    default:
                        Debug.assertNode(blockScopeContainer, canHaveLocals);
                        if (!blockScopeContainer.locals) {
                            blockScopeContainer.locals = createSymbolTable();
                            addToContainerChain(blockScopeContainer);
                        }
                        declareSymbol(blockScopeContainer.locals, 
                        /*parent*/
                        void 0, node, symbolFlags, symbolExcludes);
                }
            }